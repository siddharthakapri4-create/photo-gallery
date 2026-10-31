import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '../context/GalleryContext';
import { Heart, Maximize2, Download, Trash2 } from 'lucide-react';

export const PhotoCard = ({ photo }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, setActiveLightboxId, deletePhoto } = useGallery();

  const isFavorite = favorites.includes(photo.id);
  const isCustom = photo.id.startsWith('custom-');

  const handleCardClick = (e) => {
    // Open lightbox if clicked directly on wrapper
    e.stopPropagation();
    setActiveLightboxId(photo.id);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(photo.id);
  };

  const handleDetailNavigate = (e) => {
    e.stopPropagation();
    navigate(`/photo/${photo.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${photo.title}" from your gallery?`)) {
      deletePhoto(photo.id);
    }
  };

  return (
    <div className={`photo-card ${photo.orientation || 'landscape'}`}>
      {/* Image Thumbnail Container */}
      <div className="card-image-wrapper" onClick={handleCardClick}>
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="card-image"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="card-overlay">
          <div className="overlay-top">
            <span className="category-tag">{photo.category}</span>
            <div className="flex items-center gap-2">
              {isCustom && (
                <button
                  onClick={handleDelete}
                  className="fav-btn"
                  style={{ background: 'rgba(239, 68, 68, 0.4)' }}
                  title="Delete Custom Photo"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                onClick={handleFavoriteClick}
                className={`fav-btn ${isFavorite ? 'active' : ''}`}
                title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                aria-label="Toggle Favorite"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>

          <div className="overlay-bottom">
            <div className="overlay-info">
              <h3 className="card-title">{photo.title}</h3>
              <p className="card-artist">by {photo.artist}</p>
            </div>

            <button
              onClick={handleDetailNavigate}
              className="fav-btn"
              title="View Detail Page"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="card-footer">
        <div className="flex items-center gap-2">
          <div className="artist-avatar">{photo.artistAvatar || 'AV'}</div>
          <span className="text-xs font-semibold text-slate-300">{photo.artist}</span>
        </div>

        <div className="card-stats">
          <div className="stat-group" title="Likes">
            <Heart size={14} className={isFavorite ? 'text-pink-500 fill-pink-500' : 'text-slate-400'} />
            <span>{photo.likes + (isFavorite ? 1 : 0)}</span>
          </div>
          <div className="stat-group" title="Downloads">
            <Download size={14} />
            <span>{photo.downloads || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
