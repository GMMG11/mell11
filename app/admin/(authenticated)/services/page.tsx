'use client';

import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/admin-auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Select from '@/components/Select';
import Button from '@/components/Button';

interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
  isFeatured: boolean;
}

const categoryOptions = [
  { value: 'SKIN_AND_FACIALS', label: 'Skin & Facials' },
  { value: 'ADVANCED_TREATMENTS', label: 'Advanced Treatments' },
  { value: 'BROWS_LASHES_MAKEUP', label: 'Brows, Lashes & Makeup' },
  { value: 'HAIR_AND_COLOR', label: 'Hair & Color' },
  { value: 'TEETH_WHITENING', label: 'Teeth Whitening' },
  { value: 'VIP_MEMBERSHIPS', label: 'VIP Memberships' },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    fetchWithAuth('/api/admin/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading services:', error);
        setLoading(false);
      });
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      await fetchWithAuth(`/api/admin/services/${editingService.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      loadServices();
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service');
    }
  };

  const toggleServiceActive = async (serviceId: string, currentStatus: boolean) => {
    try {
      await fetchWithAuth(`/api/admin/services/${serviceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      loadServices();
    } catch (error) {
      console.error('Error toggling service:', error);
      alert('Failed to toggle service');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl mb-8 text-nearBlack">Services Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-softLine">
          <thead className="bg-cream">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-softLine">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-cream transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-nearBlack">{service.name}</div>
                  {service.isFeatured && (
                    <span className="text-xs text-accent">Featured</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {categoryOptions.find((c) => c.value === service.category)?.label}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{service.duration} min</td>
                <td className="px-6 py-4 text-sm text-gray-900">${service.price}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleServiceActive(service.id, service.isActive)}
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {service.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => setEditingService(service)}
                    className="text-accent hover:text-hover transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-softLine">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-nearBlack">Edit Service</h2>
                <button
                  onClick={() => setEditingService(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateService} className="p-6 space-y-4">
              <Input
                label="Service Name"
                name="name"
                value={editingService.name}
                onChange={(e) =>
                  setEditingService({ ...editingService, name: e.target.value })
                }
                required
              />

              <Select
                label="Category"
                name="category"
                value={editingService.category}
                onChange={(e) =>
                  setEditingService({ ...editingService, category: e.target.value })
                }
                options={categoryOptions}
                required
              />

              <Textarea
                label="Description"
                name="description"
                value={editingService.description}
                onChange={(e) =>
                  setEditingService({ ...editingService, description: e.target.value })
                }
                required
                rows={4}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Duration (minutes)"
                  name="duration"
                  type="number"
                  value={editingService.duration.toString()}
                  onChange={(e) =>
                    setEditingService({ ...editingService, duration: parseInt(e.target.value) })
                  }
                  required
                />

                <Input
                  label="Price ($)"
                  name="price"
                  type="number"
                  step="0.01"
                  value={editingService.price.toString()}
                  onChange={(e) =>
                    setEditingService({ ...editingService, price: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingService.isActive}
                    onChange={(e) =>
                      setEditingService({ ...editingService, isActive: e.target.checked })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Active (bookable)</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingService.isFeatured}
                    onChange={(e) =>
                      setEditingService({ ...editingService, isFeatured: e.target.checked })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Featured on homepage</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={() => setEditingService(null)} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
