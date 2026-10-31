import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { Sparkles, Image as ImageIcon, Heart, Layers } from 'lucide-react';

export const Hero = () => {
  const { photos, favorites } = useGallery();

  // JavaScript Array Operations (.reduce & Set) for dynamic metrics calculation
  const totalLikes = photos.reduce((acc, curr) => acc + (curr.likes || 0), 0);
  const categoriesCount = new Set(photos.map((p) => p.category)).size;

  return (
    <section className="hero-section">
      <div className="hero-glow"></div>
      <div className="container hero-content">
        <div className="hero-pill">
          <Sparkles size={16} />
          <span>Interactive React JS Gallery</span>
        </div>

        <h1 className="hero-title">
          Explore Fine Art & <span className="gradient-text">Photography</span>
        </h1>

        <p className="hero-description">
          A modern exhibition powered by React state hooks, dynamic array operations (<code className="font-mono text-indigo-400">.map()</code> & <code className="font-mono text-pink-400">.filter()</code>), client-side routing, and responsive glassmorphism UI.
        </p>

        {/* Dynamic Metric Stat Counters */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number flex items-center gap-1">
              <ImageIcon className="text-indigo-500" size={20} />
              {photos.length}
            </div>
            <div className="stat-label">Artworks</div>
          </div>

          <div className="stat-item">
            <div className="stat-number flex items-center gap-1">
              <Layers className="text-cyan-500" size={20} />
              {categoriesCount}
            </div>
            <div className="stat-label">Categories</div>
          </div>

          <div className="stat-item">
            <div className="stat-number flex items-center gap-1">
              <Heart className="text-pink-500" size={20} />
              {favorites.length}
            </div>
            <div className="stat-label">Saved Favorites</div>
          </div>

          <div className="stat-item">
            <div className="stat-number flex items-center gap-1">
              <Sparkles className="text-amber-500" size={20} />
              {totalLikes.toLocaleString()}
            </div>
            <div className="stat-label">Community Appreciation</div>
          </div>
        </div>
      </div>
    </section>
  );
};
