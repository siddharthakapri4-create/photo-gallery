import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '../context/GalleryContext';
import { CATEGORIES, ORIENTATIONS } from '../data/photosData';
import { PlusCircle, Image as ImageIcon, Sparkles, ArrowLeft, Camera, Tag } from 'lucide-react';

export const Upload = () => {
  const navigate = useNavigate();
  const { addPhoto } = useGallery();

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    category: 'Fine Art',
    orientation: 'landscape',
    imageUrl: '',
    description: '',
    camera: 'Sony Alpha a7 IV',
    lens: 'FE 24-70mm f/2.8 GM',
    iso: '100',
    focalLength: '35mm',
    aperture: 'f/2.8',
    shutterSpeed: '1/250s',
    dimensions: '3840 x 2160',
    tags: 'fine art, modern, creative'
  });

  const [previewError, setPreviewError] = useState(false);

  const samplePresets = [
    { label: 'Preset Artwork 1 (Futuristic Light)', url: '/lumina_art_1.jpg' },
    { label: 'Preset Artwork 2 (Modern Architecture)', url: '/lumina_art_2.jpg' },
    { label: 'Unsplash Mountain Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Unsplash Abstract Neon', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') setPreviewError(false);
  };

  const handleSelectPreset = (url) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
    setPreviewError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.artist.trim() || !formData.imageUrl.trim()) {
      alert('Please fill in Title, Artist name, and Image URL.');
      return;
    }

    addPhoto(formData);
    navigate('/');
  };

  return (
    <div className="container py-8">
      <button onClick={() => navigate(-1)} className="btn-secondary mb-6 inline-flex">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="glass-panel upload-form-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <PlusCircle size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Publish New <span className="gradient-text">Artwork</span></h1>
            <p className="text-xs text-slate-400">Add custom photography or digital art directly to the React application state.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          {/* Image URL & Preset Selection */}
          <div className="form-group full-width">
            <label className="form-label flex items-center justify-between">
              <span>Image Source URL *</span>
              <span className="text-xs text-indigo-400 font-normal">Enter image URL or select preset below</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://images.unsplash.com/... or /lumina_art_1.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              required
            />

            {/* Quick Presets Buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              {samplePresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleSelectPreset(preset.url)}
                  className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 cursor-pointer"
                >
                  + {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="form-group full-width">
            <label className="form-label">Live Image Preview</label>
            <div className="image-preview-container">
              {formData.imageUrl && !previewError ? (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="preview-img"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <ImageIcon size={32} />
                  <span className="text-xs">
                    {previewError ? 'Unable to load image from provided URL' : 'Enter a valid image URL to view live preview'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Artwork Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Neon Reflection at Midnight"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Artist */}
          <div className="form-group">
            <label className="form-label">Artist Name *</label>
            <input
              type="text"
              name="artist"
              placeholder="e.g. Maya Lin"
              value={formData.artist}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="form-select">
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Orientation */}
          <div className="form-group">
            <label className="form-label">Aspect Ratio / Orientation</label>
            <select name="orientation" value={formData.orientation} onChange={handleChange} className="form-select">
              {ORIENTATIONS.filter((o) => o.value !== 'all').map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="form-group full-width">
            <label className="form-label">Tags / Keywords (comma separated)</label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. neon, urban, rain, twilight"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Write a brief backstory or artistic concept for this photo..."
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          {/* Submit Button */}
          <div className="form-group full-width mt-4">
            <button type="submit" className="btn-primary py-3">
              <Sparkles size={18} />
              <span>Publish Photo to Gallery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
