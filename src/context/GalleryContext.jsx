import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPhotos } from '../data/photosData';

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  // 1. Photos State (Initial + LocalStorage Custom Uploads)
  const [photos, setPhotos] = useState(() => {
    try {
      const savedUserPhotos = localStorage.getItem('lumina_user_photos');
      const parsedUserPhotos = savedUserPhotos ? JSON.parse(savedUserPhotos) : [];
      return [...parsedUserPhotos, ...initialPhotos];
    } catch (e) {
      console.error('Error loading custom photos:', e);
      return initialPhotos;
    }
  });

  // 2. Favorites State (Persisted in LocalStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem('lumina_favorites');
      return savedFavs ? JSON.parse(savedFavs) : ['art-1', 'land-1'];
    } catch (e) {
      console.error('Error loading favorites:', e);
      return ['art-1', 'land-1'];
    }
  });

  // 3. Toolbar & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOrientation, setSelectedOrientation] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'masonry'

  // 4. UI Theme & Modal States
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lumina_theme') || 'dark';
  });

  const [activeLightboxId, setActiveLightboxId] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync Favorites to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumina_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
  }, [favorites]);

  // Sync Theme to Document Root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lumina_theme', theme);
  }, [theme]);

  // Helper: Show Toast Notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Action: Toggle Favorite status
  const toggleFavorite = (photoId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(photoId);
      const updated = isFav ? prev.filter((id) => id !== photoId) : [...prev, photoId];
      
      const photo = photos.find((p) => p.id === photoId);
      const title = photo ? photo.title : 'Photo';
      showToast(isFav ? `Removed "${title}" from Favorites` : `Added "${title}" to Favorites`, isFav ? 'info' : 'success');
      
      return updated;
    });
  };

  // Action: Add New Custom Photo
  const addPhoto = (newPhotoData) => {
    const photoWithDefaults = {
      id: `custom-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 1,
      downloads: 0,
      featured: false,
      artistAvatar: newPhotoData.artist ? newPhotoData.artist.substring(0, 2).toUpperCase() : 'ME',
      camera: newPhotoData.camera || 'Digital Camera',
      lens: newPhotoData.lens || 'Standard Lens',
      iso: newPhotoData.iso || '100',
      focalLength: newPhotoData.focalLength || '50mm',
      aperture: newPhotoData.aperture || 'f/2.8',
      shutterSpeed: newPhotoData.shutterSpeed || '1/250s',
      dimensions: newPhotoData.dimensions || '3840 x 2160',
      tags: typeof newPhotoData.tags === 'string' ? newPhotoData.tags.split(',').map(t => t.trim()) : (newPhotoData.tags || ['custom']),
      ...newPhotoData
    };

    setPhotos((prev) => {
      const updatedPhotos = [photoWithDefaults, ...prev];
      // Save user photos to local storage
      const userPhotos = updatedPhotos.filter((p) => p.id.startsWith('custom-'));
      localStorage.setItem('lumina_user_photos', JSON.stringify(userPhotos));
      return updatedPhotos;
    });

    showToast(`Artwork "${newPhotoData.title}" published successfully!`, 'success');
  };

  // Action: Delete Custom Photo
  const deletePhoto = (photoId) => {
    setPhotos((prev) => {
      const updatedPhotos = prev.filter((p) => p.id !== photoId);
      const userPhotos = updatedPhotos.filter((p) => p.id.startsWith('custom-'));
      localStorage.setItem('lumina_user_photos', JSON.stringify(userPhotos));
      return updatedPhotos;
    });
    setFavorites((prev) => prev.filter((id) => id !== photoId));
    showToast('Artwork deleted from gallery', 'info');
  };

  // Action: Theme Toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = {
    photos,
    favorites,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedOrientation,
    setSelectedOrientation,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    theme,
    toggleTheme,
    activeLightboxId,
    setActiveLightboxId,
    toast,
    showToast,
    toggleFavorite,
    addPhoto,
    deletePhoto
  };

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
