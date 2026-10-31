import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGallery } from '../context/GalleryContext';
import { useAuth } from '../context/AuthContext';
import { Camera, Heart, PlusCircle, Sun, Moon, BookOpen, LogIn, LayoutDashboard, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { favorites, theme, toggleTheme } = useGallery();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        {/* Brand Logo */}
        <NavLink to="/" className="brand-logo">
          <div className="brand-icon-wrapper">
            <Camera size={22} />
          </div>
          <span>Lumina<span className="gradient-text">Gallery</span></span>
        </NavLink>

        {/* Center Nav Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                <Camera size={18} />
                <span>Gallery</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Heart size={18} />
                <span>Favorites</span>
                {favorites.length > 0 && <span className="nav-badge">{favorites.length}</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/upload" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <PlusCircle size={18} />
                <span>Add Photo</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <BookOpen size={18} />
                <span>React Guide</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isLoggedIn ? (
            <>
              {/* User Avatar */}
              <div
                title={user?.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-glow)',
                  cursor: 'default',
                }}
              >
                {user?.avatar || 'AU'}
              </div>

              {/* Dashboard Link */}
              <NavLink
                to="/admin"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title="Admin Dashboard"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>

              {/* Logout Button */}
              <button
                className="icon-btn"
                onClick={handleLogout}
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            /* Login Link */
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              title="Admin Login"
            >
              <LogIn size={18} />
              <span>Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};
