import React, { useEffect } from 'react';
import { useGallery } from '../context/GalleryContext';
import { X, ChevronLeft, ChevronRight, Heart, Download, Camera, Aperture, Sliders, Maximize, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LightboxModal = ({ filteredPhotos }) => {
  const navigate = useNavigate();
  const { activeLightboxId, setActiveLightboxId, favorites, toggleFavorite, showToast } = useGallery();

  const currentIndex = filteredPhotos.findIndex((p) => p.id === activeLightboxId);
  const photo = filteredPhotos[currentIndex] || filteredPhotos.find((p) => p.id === activeLightboxId);

  // Keyboard navigation support with useEffect
  useEffect(() => {
    if (!activeLightboxId) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxId(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxId, currentIndex, filteredPhotos]);

  if (!activeLightboxId || !photo) return null;

  const isFavorite = favorites.includes(photo.id);

  const handlePrev = () => {
    if (filteredPhotos.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActiveLightboxId(filteredPhotos[prevIdx].id);
  };

  const handleNext = () => {
    if (filteredPhotos.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredPhotos.length;
    setActiveLightboxId(filteredPhotos[nextIdx].id);
  };

  const handleDownload = () => {
    showToast(`Downloading "${photo.title}" high-resolution file...`, 'success');
    const link = document.createElement('a');
    link.href = photo.imageUrl;
    link.download = `${photo.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoToPage = () => {
    setActiveLightboxId(null);
    navigate(`/photo/${photo.id}`);
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveLightboxId(null)}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="icon-btn modal-close-btn"
          onClick={() => setActiveLightboxId(null)}
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>

        {/* Left: Image Container */}
        <div className="modal-image-container">
          <img src={photo.imageUrl} alt={photo.title} className="modal-img" />

          {/* Nav Controls */}
          {filteredPhotos.length > 1 && (
            <>
              <button className="modal-nav-btn prev" onClick={handlePrev} aria-label="Previous Photo">
                <ChevronLeft size={24} />
              </button>
              <button className="modal-nav-btn next" onClick={handleNext} aria-label="Next Photo">
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Right: Details & EXIF Sidebar */}
        <div className="modal-details-sidebar">
          <div>
            <div className="modal-header-info">
              <span className="category-tag mb-2 inline-block">{photo.category}</span>
              <h2>{photo.title}</h2>
              <div className="modal-artist-row">
                <div className="artist-avatar">{photo.artistAvatar || 'AV'}</div>
                <div>
                  <div className="font-semibold text-sm">{photo.artist}</div>
                  <div className="text-xs text-slate-400">Published {photo.createdAt}</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-4">{photo.description}</p>

            {/* EXIF Data Grid */}
            <div className="exif-grid">
              <div className="exif-item">
                <div className="exif-label flex items-center gap-1">
                  <Camera size={12} /> Camera
                </div>
                <div className="exif-value">{photo.camera}</div>
              </div>
              <div className="exif-item">
                <div className="exif-label flex items-center gap-1">
                  <Aperture size={12} /> Lens & Focal
                </div>
                <div className="exif-value">{photo.focalLength} ({photo.aperture})</div>
              </div>
              <div className="exif-item">
                <div className="exif-label flex items-center gap-1">
                  <Sliders size={12} /> ISO / Shutter
                </div>
                <div className="exif-value">ISO {photo.iso} • {photo.shutterSpeed}</div>
              </div>
              <div className="exif-item">
                <div className="exif-label flex items-center gap-1">
                  <Maximize size={12} /> Resolution
                </div>
                <div className="exif-value">{photo.dimensions}</div>
              </div>
            </div>

            {/* Tags Cloud (Array .map operation) */}
            <div className="tags-cloud">
              {photo.tags.map((tag) => (
                <span key={tag} className="tag-badge">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="modal-actions">
            <button 
              className={`btn-secondary ${isFavorite ? 'border-pink-500 text-pink-500' : ''}`}
              onClick={() => toggleFavorite(photo.id)}
            >
              <Heart size={18} className={isFavorite ? 'fill-pink-500 text-pink-500' : ''} />
              <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button className="btn-secondary" onClick={handleGoToPage}>
              <ExternalLink size={18} />
              <span>Details</span>
            </button>

            <button className="btn-primary" onClick={handleDownload}>
              <Download size={18} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
