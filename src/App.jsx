import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GalleryProvider } from './context/GalleryContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { PhotoDetail } from './pages/PhotoDetail';
import { Favorites } from './pages/Favorites';
import { Upload } from './pages/Upload';
import { AboutConcepts } from './pages/AboutConcepts';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';

export function App() {
  return (
    <AuthProvider>
      <GalleryProvider>
        <Router>
          <div className="app-container">
            {/* Main Top Navigation */}
            <Navbar />

            {/* Page Routing */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photo/:id" element={<PhotoDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/about" element={<AboutConcepts />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            {/* Toast Notification Container */}
            <Toast />

            {/* Global Sleek Footer */}
            <footer className="py-8 border-t border-slate-800 text-center text-sm text-slate-500 bg-slate-950/80">
              <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  © 2026 <strong className="text-slate-300 font-semibold">Lumina Gallery</strong>. Built with React JS, React Router &amp; Tailwind/CSS Variables.
                </div>
                <div className="flex gap-6 text-xs text-slate-400">
                  <a href="#top" className="hover:text-indigo-400">Back to Top</a>
                  <span>•</span>
                  <span>Vite + React 18</span>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </GalleryProvider>
    </AuthProvider>
  );
}

export default App;
