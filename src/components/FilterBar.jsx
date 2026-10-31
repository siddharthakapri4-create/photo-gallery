import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { CATEGORIES, ORIENTATIONS, SORT_OPTIONS } from '../data/photosData';
import { Search, LayoutGrid, Columns, SlidersHorizontal, X } from 'lucide-react';

export const FilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedOrientation,
    setSelectedOrientation,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode
  } = useGallery();

  return (
    <div className="toolbar-container">
      <div className="glass-panel toolbar-card">
        {/* Row 1: Search & Filter Selectors */}
        <div className="search-row">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search by title, artist, or tags (e.g. surreal, mountains, macro)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-transparent border-none cursor-pointer"
                aria-label="Clear Search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Orientation Filter */}
          <select
            value={selectedOrientation}
            onChange={(e) => setSelectedOrientation(e.target.value)}
            className="filter-select"
            aria-label="Filter by orientation"
          >
            {ORIENTATIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
            aria-label="Sort by"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Row 2: Category Pills & View Mode Toggle */}
        <div className="categories-row">
          <div className="category-pills">
            {/* JavaScript .map() operation to generate dynamic UI buttons */}
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Layout Grid vs Masonry Toggle */}
          <div className="layout-toggle-group">
            <button
              onClick={() => setViewMode('grid')}
              className={`layout-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Standard Grid View"
            >
              <LayoutGrid size={16} />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`layout-btn ${viewMode === 'masonry' ? 'active' : ''}`}
              title="Masonry Layout View"
            >
              <Columns size={16} />
              <span>Masonry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
