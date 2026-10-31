import React, { useMemo } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Hero } from '../components/Hero';
import { FilterBar } from '../components/FilterBar';
import { PhotoCard } from '../components/PhotoCard';
import { LightboxModal } from '../components/LightboxModal';
import { ImageOff, Sparkles } from 'lucide-react';

export const Home = () => {
  const {
    photos,
    searchQuery,
    selectedCategory,
    selectedOrientation,
    sortBy,
    viewMode
  } = useGallery();

  // JavaScript Array Filtering & Sorting using useMemo hook for optimum performance
  const filteredPhotos = useMemo(() => {
    return photos
      .filter((photo) => {
        // 1. Category Filter
        if (selectedCategory !== 'All' && photo.category !== selectedCategory) {
          return false;
        }

        // 2. Orientation Filter
        if (selectedOrientation !== 'all' && photo.orientation !== selectedOrientation) {
          return false;
        }

        // 3. Real-time Search Query (Title, Artist, Tags)
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase().trim();
          const matchesTitle = photo.title.toLowerCase().includes(query);
          const matchesArtist = photo.artist.toLowerCase().includes(query);
          const matchesTags = photo.tags.some((t) => t.toLowerCase().includes(query));
          return matchesTitle || matchesArtist || matchesTags;
        }

        return true;
      })
      .sort((a, b) => {
        // Dynamic Sorting Array Operation
        if (sortBy === 'popular') return (b.likes || 0) - (a.likes || 0);
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [photos, searchQuery, selectedCategory, selectedOrientation, sortBy]);

  return (
    <div className="home-page">
      {/* Hero Showcase Header */}
      <Hero />

      {/* Gallery Section */}
      <section className="container">
        {/* Toolbar with Filter & Search controls */}
        <FilterBar />

        {/* Dynamic Gallery Grid rendering array via .map() */}
        {filteredPhotos.length > 0 ? (
          <div className={`gallery-grid ${viewMode === 'masonry' ? 'masonry' : ''}`}>
            {filteredPhotos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ) : (
          /* Empty State Feedback UI */
          <div className="empty-state glass-panel my-8">
            <div className="empty-icon">
              <ImageOff size={32} />
            </div>
            <h3 className="text-xl font-bold">No Artworks Found</h3>
            <p className="text-slate-400 max-w-md">
              We couldn't find any photos matching your current search query "{searchQuery}" or selected category filters.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal Viewer */}
      <LightboxModal filteredPhotos={filteredPhotos} />
    </div>
  );
};
