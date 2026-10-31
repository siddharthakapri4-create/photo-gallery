import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGallery } from '../context/GalleryContext';
import { PhotoCard } from '../components/PhotoCard';
import { ArrowLeft, Heart, Download, Camera, Aperture, Sliders, Maximize, Calendar, User, Tag } from 'lucide-react';

export const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { photos, favorites, toggleFavorite, showToast } = useGallery();

  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Artwork Not Found</h2>
        <p className="text-slate-400 mb-6">The photo you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/')} className="btn-primary inline-flex">
          <ArrowLeft size={18} /> Back to Gallery
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(photo.id);

  // Array Operation: Filter related photos from the same category (excluding current item)
  const relatedPhotos = photos
    .filter((p) => p.category === photo.category && p.id !== photo.id)
    .slice(0, 3);

  const handleDownload = () => {
    showToast(`Downloading "${photo.title}" high-resolution file...`, 'success');
    const link = document.createElement('a');
    link.href = photo.imageUrl;
    link.download = `${photo.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container py-8">
      {/* Back Button Navigation */}
      <button onClick={() => navigate(-1)} className="btn-secondary mb-6 inline-flex">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="glass-panel p-6 md:p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Large Artwork Image Display */}
          <div className="lg:col-span-7 bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center min-h-[400px]">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-auto max-h-[75vh] object-contain"
            />
          </div>

          {/* Metadata & Actions Column */}
          <div className="lg:col-span-5 flex flex-direction-column justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="category-tag">{photo.category}</span>
                <span className="text-xs font-mono text-slate-400">ID: {photo.id}</span>
              </div>

              <h1 className="text-3xl font-extrabold mb-3 leading-tight">{photo.title}</h1>

              {/* Artist Row */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="artist-avatar w-10 h-10 text-sm font-bold">{photo.artistAvatar || 'AV'}</div>
                <div>
                  <div className="font-bold text-slate-200">{photo.artist}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Calendar size={12} /> Published {photo.createdAt}
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {photo.description}
              </p>

              {/* Camera EXIF Specifications */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1">
                  <Camera size={14} className="text-indigo-400" /> Technical EXIF Metadata
                </h4>
                <div className="exif-grid">
                  <div className="exif-item">
                    <div className="exif-label">Camera Model</div>
                    <div className="exif-value">{photo.camera}</div>
                  </div>
                  <div className="exif-item">
                    <div className="exif-label">Lens Specification</div>
                    <div className="exif-value">{photo.lens}</div>
                  </div>
                  <div className="exif-item">
                    <div className="exif-label">Exposure / ISO</div>
                    <div className="exif-value">{photo.aperture} • {photo.shutterSpeed} • ISO {photo.iso}</div>
                  </div>
                  <div className="exif-item">
                    <div className="exif-label">Resolution</div>
                    <div className="exif-value">{photo.dimensions}</div>
                  </div>
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Tag size={14} className="text-pink-400" /> Keywords & Tags
                </h4>
                <div className="tags-cloud">
                  {photo.tags.map((tag) => (
                    <span key={tag} className="tag-badge">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex gap-4 pt-4 border-t border-slate-800">
              <button
                className={`btn-secondary flex-1 ${isFavorite ? 'border-pink-500 text-pink-500' : ''}`}
                onClick={() => toggleFavorite(photo.id)}
              >
                <Heart size={18} className={isFavorite ? 'fill-pink-500 text-pink-500' : ''} />
                <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
              </button>

              <button className="btn-primary flex-1" onClick={handleDownload}>
                <Download size={18} />
                <span>Download Photo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Artworks Section (Using .filter() & .map()) */}
      {relatedPhotos.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">More from <span className="gradient-text">{photo.category}</span></h3>
            <Link to="/" className="text-sm font-semibold text-indigo-400 hover:underline">View All Gallery</Link>
          </div>

          <div className="gallery-grid">
            {relatedPhotos.map((item) => (
              <PhotoCard key={item.id} photo={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
