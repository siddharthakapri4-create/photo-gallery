import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGallery } from '../context/GalleryContext';
import {
  LayoutDashboard,
  Image,
  BarChart2,
  Settings,
  LogOut,
  Star,
  Download,
  Eye,
  Trash2,
  TrendingUp,
  Camera,
  Users,
  CheckCircle,
  XCircle,
  Search,
  Sun,
  Moon,
  Upload,
} from 'lucide-react';

// ─── Helpers ────────────────────────────────────────────────────────────────

const card = {
  background: 'var(--surface-card)',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-md)',
  padding: '24px',
};

const statCard = (accentColor) => ({
  ...card,
  borderTop: `3px solid ${accentColor}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: 0,
  flex: '1 1 160px',
});

const sectionTitle = {
  fontSize: '18px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

// ─── Sub-Sections ────────────────────────────────────────────────────────────

const OverviewSection = ({ photos, favorites, navigate }) => {
  const totalDownloads = photos.reduce((sum, p) => sum + (p.downloads || 0), 0);
  const featuredCount = photos.filter((p) => p.featured).length;
  const recentPhotos = [...photos]
    .filter((p) => p.id?.startsWith('custom-') || p.createdAt)
    .sort((a, b) => {
      if (a.id?.startsWith('custom-') && b.id?.startsWith('custom-')) {
        return Number(b.id.replace('custom-', '')) - Number(a.id.replace('custom-', ''));
      }
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    })
    .slice(0, 5);

  const stats = [
    { label: 'Total Photos', value: photos.length, icon: <Image size={22} />, color: 'var(--accent-primary)' },
    { label: 'Total Favorites', value: favorites.length, icon: <Star size={22} />, color: 'var(--accent-secondary)' },
    { label: 'Featured Photos', value: featuredCount, icon: <CheckCircle size={22} />, color: 'var(--accent-emerald)' },
    { label: 'Total Downloads', value: totalDownloads.toLocaleString(), icon: <Download size={22} />, color: 'var(--accent-cyan)' },
  ];

  return (
    <div>
      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {stats.map((s) => (
          <div key={s.label} style={statCard(s.color)}>
            <div style={{ color: s.color, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {s.icon}
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {s.label}
              </span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ ...card, marginBottom: '24px' }}>
        <h3 style={sectionTitle}><TrendingUp size={18} color="var(--accent-primary)" /> Recent Uploads</h3>
        {recentPhotos.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No custom uploads yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentPhotos.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '10px 14px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {(p.title || 'U').substring(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>by {p.artist} · {p.category}</div>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={11} /> {p.likes || 0}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Download size={11} /> {p.downloads || 0}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={card}>
        <h3 style={sectionTitle}><Camera size={18} color="var(--accent-primary)" /> Quick Actions</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/upload')}
            style={{
              padding: '10px 20px',
              background: 'var(--accent-gradient)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontFamily: 'var(--font-main)',
            }}
          >
            <Upload size={15} /> Upload Photo
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              background: 'var(--surface-glass)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontFamily: 'var(--font-main)',
            }}
          >
            <Eye size={15} /> View Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Photos Section ────────────────────────────────────────────────────────

const PhotosSection = ({ photos, deletePhoto }) => {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const categories = ['All', ...new Set(photos.map((p) => p.category).filter(Boolean))];

  const filtered = photos.filter((p) => {
    const matchSearch =
      (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.artist || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search by title or artist…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'var(--font-main)',
            }}
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          style={{
            padding: '9px 14px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-main)',
          }}
        >
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          {filtered.length} of {photos.length} photos
        </span>
      </div>

      {/* Table */}
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '48px 1fr 140px 120px 70px 80px 80px 44px',
            gap: '0',
            padding: '10px 16px',
            background: 'var(--bg-tertiary)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          <div></div>
          <div>Title</div>
          <div>Artist</div>
          <div>Category</div>
          <div style={{ textAlign: 'right' }}>Likes</div>
          <div style={{ textAlign: 'right' }}>DLs</div>
          <div style={{ textAlign: 'center' }}>Featured</div>
          <div></div>
        </div>

        {/* Rows */}
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <p style={{ padding: '24px', color: 'var(--text-muted)', textAlign: 'center', fontSize: '14px' }}>No photos found.</p>
          ) : (
            filtered.map((p, idx) => (
              <div
                key={p.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr 140px 120px 70px 80px 80px 44px',
                  gap: '0',
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--border-color)',
                  alignItems: 'center',
                  background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  transition: 'background 0.15s',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    background: 'var(--accent-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {(p.title || 'P').substring(0, 2).toUpperCase()}
                </div>
                {/* Title */}
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                  {p.title}
                </div>
                {/* Artist */}
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                  {p.artist}
                </div>
                {/* Category */}
                <div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(99,102,241,0.15)',
                    color: 'var(--accent-primary)',
                  }}>
                    {p.category}
                  </span>
                </div>
                {/* Likes */}
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'right' }}>{p.likes || 0}</div>
                {/* Downloads */}
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'right' }}>{p.downloads || 0}</div>
                {/* Featured */}
                <div style={{ textAlign: 'center' }}>
                  {p.featured
                    ? <CheckCircle size={15} color="var(--accent-emerald)" />
                    : <XCircle size={15} color="var(--text-muted)" />}
                </div>
                {/* Delete */}
                <div>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${p.title}"?`)) deletePhoto(p.id);
                    }}
                    title="Delete photo"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Analytics Section ────────────────────────────────────────────────────

const AnalyticsSection = ({ photos }) => {
  // Category breakdown
  const catMap = {};
  photos.forEach((p) => {
    if (p.category) catMap[p.category] = (catMap[p.category] || 0) + 1;
  });
  const catEntries = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const maxCat = catEntries[0]?.[1] || 1;

  // Top artists
  const artistMap = {};
  photos.forEach((p) => {
    if (p.artist) artistMap[p.artist] = (artistMap[p.artist] || 0) + 1;
  });
  const topArtists = Object.entries(artistMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Engagement
  const avgLikes = photos.length ? (photos.reduce((s, p) => s + (p.likes || 0), 0) / photos.length).toFixed(1) : 0;
  const avgDownloads = photos.length ? (photos.reduce((s, p) => s + (p.downloads || 0), 0) / photos.length).toFixed(1) : 0;

  const accentColors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-cyan)', 'var(--accent-emerald)', 'var(--accent-amber)'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Category Breakdown */}
      <div style={card}>
        <h3 style={sectionTitle}><BarChart2 size={18} color="var(--accent-primary)" /> Category Breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {catEntries.map(([cat, count], i) => (
            <div key={cat}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{cat}</span>
                <span style={{ color: 'var(--text-muted)' }}>{count} photo{count !== 1 ? 's' : ''}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${(count / maxCat) * 100}%`,
                    background: accentColors[i % accentColors.length],
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* Top Artists */}
        <div style={{ ...card, flex: '1 1 240px' }}>
          <h3 style={sectionTitle}><Users size={18} color="var(--accent-secondary)" /> Top Artists</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topArtists.map(([artist, count], i) => (
              <div key={artist} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: accentColors[i % accentColors.length],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {artist.substring(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{artist}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{count} photo{count !== 1 ? 's' : ''}</div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: accentColors[i % accentColors.length] }}>#{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Stats */}
        <div style={{ ...card, flex: '1 1 200px' }}>
          <h3 style={sectionTitle}><TrendingUp size={18} color="var(--accent-emerald)" /> Engagement</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Avg. Likes', value: avgLikes, icon: <Star size={18} />, color: 'var(--accent-secondary)' },
              { label: 'Avg. Downloads', value: avgDownloads, icon: <Download size={18} />, color: 'var(--accent-cyan)' },
              { label: 'Total Photos', value: photos.length, icon: <Image size={18} />, color: 'var(--accent-primary)' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: 'var(--radius-sm)',
                  background: `${item.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{item.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Settings Section ────────────────────────────────────────────────────

const SettingsSection = ({ user, photos, theme, toggleTheme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {/* Admin Profile */}
    <div style={card}>
      <h3 style={sectionTitle}><Users size={18} color="var(--accent-primary)" /> Admin Profile</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          {user?.avatar || 'AU'}
        </div>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{user?.name}</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{user?.email}</div>
          <span style={{
            fontSize: '12px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(99,102,241,0.15)',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(99,102,241,0.25)',
          }}>
            {user?.role}
          </span>
        </div>
      </div>
    </div>

    {/* Theme Toggle */}
    <div style={card}>
      <h3 style={sectionTitle}>{theme === 'dark' ? <Moon size={18} color="var(--accent-primary)" /> : <Sun size={18} color="var(--accent-amber)" />} Appearance</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Switch between dark and light themes
          </div>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: 'var(--font-main)',
          }}
        >
          {theme === 'dark' ? <><Sun size={15} /> Switch to Light</> : <><Moon size={15} /> Switch to Dark</>}
        </button>
      </div>
    </div>

    {/* Gallery Info */}
    <div style={card}>
      <h3 style={sectionTitle}><Image size={18} color="var(--accent-emerald)" /> Gallery Settings</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Total Photos', value: photos.length },
          { label: 'Categories', value: new Set(photos.map((p) => p.category).filter(Boolean)).size },
          { label: 'Featured', value: photos.filter((p) => p.featured).length },
          { label: 'Custom Uploads', value: photos.filter((p) => p.id?.startsWith('custom-')).length },
        ].map((item) => (
          <div key={item.label} style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent-primary)' }}>{item.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────

export const AdminDashboard = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { photos, favorites, deletePhoto, theme, toggleTheme } = useGallery();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  if (!isLoggedIn) {
    navigate('/login', { replace: true });
    return null;
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'photos', label: 'Photos', icon: <Image size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const sectionTitles = {
    overview: 'Dashboard Overview',
    photos: 'Photo Management',
    analytics: 'Analytics',
    settings: 'Settings',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* ── Sidebar ── */}
      <aside
        style={{
          width: '240px',
          flexShrink: 0,
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        {/* Sidebar Brand */}
        <div
          style={{
            padding: '24px 20px 20px',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'var(--accent-gradient)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              <Camera size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>LuminaGallery</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: '8px' }}>
            Navigation
          </div>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 12px',
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                  borderRadius: 'var(--radius-sm)',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '14px',
                  textAlign: 'left',
                  marginBottom: '4px',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-main)',
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {user?.avatar || 'AU'}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '9px 12px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 'var(--radius-sm)',
              color: '#f87171',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px',
              fontFamily: 'var(--font-main)',
            }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
        {/* Top Bar */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {sectionTitles[activeSection]}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Welcome back, {user?.name}
            </p>
          </div>
          <NavLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: 'var(--surface-glass)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <Eye size={14} /> View Site
          </NavLink>
        </div>

        {/* Section Content */}
        <div style={{ padding: '28px' }}>
          {activeSection === 'overview' && (
            <OverviewSection photos={photos} favorites={favorites} navigate={navigate} />
          )}
          {activeSection === 'photos' && (
            <PhotosSection photos={photos} deletePhoto={deletePhoto} />
          )}
          {activeSection === 'analytics' && (
            <AnalyticsSection photos={photos} />
          )}
          {activeSection === 'settings' && (
            <SettingsSection user={user} photos={photos} theme={theme} toggleTheme={toggleTheme} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
