import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload } from 'lucide-react';

interface AdminGalleryProps {
  onUpload?: (file: File) => Promise<string>;
  onDelete?: (id: string) => Promise<void>;
  images?: Array<{ id: string; title: string; imageUrl: string; category: string }>;
}

export function AdminGallery({ onUpload, onDelete, images = [] }: AdminGalleryProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title) return;

    setIsLoading(true);
    try {
      if (onUpload) {
        await onUpload(selectedFile);
      }
      setSelectedFile(null);
      setPreview('');
      setTitle('');
      setCategory('general');
      setShowUpload(false);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-poppins font-bold text-gray-900">Gallery</h1>
        <motion.button
          onClick={() => setShowUpload(!showUpload)}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Plus size={20} />
          Upload Image
        </motion.button>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <motion.div
          className="card p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleUpload} className="space-y-4">
            {/* File Input */}
            <div
              className="border-2 border-dashed border-primary-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 mx-auto mb-4 rounded-lg"
                />
              ) : (
                <div>
                  <Upload size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Click to select image</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Image title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="general">General</option>
                <option value="events">Events</option>
                <option value="ministries">Ministries</option>
                <option value="sermons">Sermons</option>
                <option value="prayers">Prayers</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="submit"
                disabled={isLoading || !selectedFile}
                className="btn-primary disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </motion.button>
              <button
                type="button"
                onClick={() => {
                  setShowUpload(false);
                  setSelectedFile(null);
                  setPreview('');
                  setTitle('');
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <motion.div key={image.id} className="relative group">
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <motion.button
                onClick={() => onDelete && onDelete(image.id)}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                whileHover={{ scale: 1.1 }}
              >
                <Trash2 size={20} />
              </motion.button>
            </div>
            <p className="text-sm text-gray-600 mt-2">{image.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
