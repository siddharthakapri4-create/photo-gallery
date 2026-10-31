import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '../context/GalleryContext';
import { PhotoCard } from '../components/PhotoCard';
import { LightboxModal } from '../components/LightboxModal';
import { Heart, ArrowLeft, Trash2, Camera } from 'lucide-react';

export const Favorites = () => {
  const navigate = useNavigate();
  const { photos, favorites, viewMode } = useGallery();

  // Dynamic Array Operation: Filter photos that match favorited IDs
  const favoritedPhotos = photos.filter((photo) => favorites.includes(photo.id));

  return (
    <div className="container py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-full text-xs font-bold mb-2">
            <Heart size={14} className="fill-pink-500" /> Saved Collection
          </div>
          <h1 className="text-3xl font-extrabold">My Favorite <span className="gradient-text">Artworks</span></h1>
          <p className="text-slate-400 text-sm mt-1">
            You have saved {favoritedPhotos.length} {favoritedPhotos.length === 1 ? 'artwork' : 'artworks'} to your personal collection.
          </p>
        </div>

        <button onClick={() => navigate('/')} className="btn-secondary inline-flex self-start md:self-auto">
          <ArrowLeft size={18} /> Back to Full Gallery
        </button>
      </div>

      {/* Favorited Photos Grid */}
      {favoritedPhotos.length > 0 ? (
        <div className={`gallery-grid ${viewMode === 'masonry' ? 'masonry' : ''}`}>
          {favoritedPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      ) : (
        /* Empty Favorites State UI */
        <div className="empty-state glass-panel my-12">
          <div className="empty-icon bg-pink-500/10 text-pink-500">
            <Heart size={36} />
          </div>
          <h2 className="text-2xl font-bold">No Favorites Saved Yet</h2>
          <p className="text-slate-400 max-w-md">
            Click the heart icon on any artwork card or detail modal in the gallery to add photos to your personal saved collection.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary inline-flex mt-4">
            <Camera size={18} /> Explore Gallery Now
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <LightboxModal filteredPhotos={favoritedPhotos} />
    </div>
  );
};
