const { google } = require('googleapis');
const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');

// Load environment variables
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
);

// Generate the url that will be used for authorization
const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/gmail.send',
  ],
  prompt: 'consent', // Force to get refresh token
});

async function getToken() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        if (req.url.indexOf('/oauth2callback') > -1) {
          const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
          const code = qs.get('code');

          res.end('Authentication successful! Please return to the console.');
          server.destroy();

          const { tokens } = await oauth2Client.getToken(code);

          console.log('\n✅ Success! Add these to your .env file:\n');
          console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
          console.log(`GOOGLE_ACCESS_TOKEN=${tokens.access_token}\n`);
          console.log('Note: The access token will expire, but the refresh token is permanent.\n');

          resolve(tokens);
        }
      } catch (e) {
        reject(e);
      }
    }).listen(3000, () => {
      console.log('\n🔐 Google Calendar OAuth Setup\n');
      console.log('Opening browser for authentication...\n');
      open(authorizeUrl, { wait: false }).then(cp => cp.unref());
    });

    destroyer(server);
  });
}

getToken()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
