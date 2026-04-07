import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  platform: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  googleMeetUrl?: string;
  zoomUrl?: string;
  scheduledAt?: string;
}

interface AdminLiveServicesProps {
  onAdd?: (data: FormData) => Promise<void>;
  onEdit?: (id: string, data: FormData) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  services?: Array<FormData & { id: string }>;
}

export function AdminLiveServices({
  onAdd,
  onEdit,
  onDelete,
  services = [],
}: AdminLiveServicesProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    platform: 'youtube',
    scheduledAt: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId && onEdit) {
        await onEdit(editingId, formData);
      } else if (onAdd) {
        await onAdd(formData);
      }

      setFormData({
        title: '',
        description: '',
        platform: 'youtube',
        scheduledAt: '',
      });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-poppins font-bold text-gray-900">Live Services</h1>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Plus size={20} />
          New Service
        </motion.button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          className="card p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                  <option value="googlemeet">Google Meet</option>
                  <option value="zoom">Zoom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={formData[`${formData.platform}Url` as keyof FormData] || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [`${formData.platform}Url`]: e.target.value,
                    } as any)
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Time
              </label>
              <input
                type="datetime-local"
                value={formData.scheduledAt || ''}
                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <motion.button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </motion.button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ title: '', description: '', platform: 'youtube' });
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div key={service.id} className="card p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

            <div className="flex gap-2">
              <motion.button
                onClick={() => {
                  setFormData(service);
                  setEditingId(service.id);
                  setShowForm(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                whileHover={{ scale: 1.02 }}
              >
                <Edit2 size={16} />
                Edit
              </motion.button>

              <motion.button
                onClick={() => onDelete && onDelete(service.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                whileHover={{ scale: 1.02 }}
              >
                <Trash2 size={16} />
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
