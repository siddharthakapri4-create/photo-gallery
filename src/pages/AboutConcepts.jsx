import React from 'react';
import { BookOpen, Code, Layers, Sparkles, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutConcepts = () => {
  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold mb-3">
          <BookOpen size={14} /> React JS Architecture & Concepts
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Building Lumina with <span className="gradient-text">React JS</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          An interactive technical guide breaking down project setup, JSX rules, reusable functional components, JavaScript array operations (<code className="font-mono text-indigo-400">map</code> & <code className="font-mono text-pink-400">filter</code>), and state hooks.
        </p>
      </div>

      <div className="concepts-container">
        {/* Section 1: HTML to JSX Conversion Rules */}
        <div className="glass-panel concept-card">
          <h3>
            <Code className="text-indigo-400" size={20} />
            1. JSX Syntax & HTML-to-JSX Conversion Rules
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            JSX (JavaScript XML) allows us to write HTML-like elements inside JavaScript files. However, because JSX compiles down to standard JavaScript function calls, several HTML attributes are converted into camelCase property names:
          </p>

          <table className="comparison-table text-sm">
            <thead>
              <tr>
                <th>Standard HTML Attribute</th>
                <th>React JSX Syntax</th>
                <th>Key Reason & Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code className="font-mono">class="..."</code></td>
                <td><code className="font-mono text-indigo-400">className="..."</code></td>
                <td><code className="font-mono">class</code> is a reserved keyword in ES6 JavaScript classes.</td>
              </tr>
              <tr>
                <td><code className="font-mono">for="..."</code></td>
                <td><code className="font-mono text-indigo-400">htmlFor="..."</code></td>
                <td><code className="font-mono">for</code> is a reserved keyword for JavaScript loops.</td>
              </tr>
              <tr>
                <td><code className="font-mono">&lt;img src="..."&gt;</code></td>
                <td><code className="font-mono text-pink-400">&lt;img src="..." /&gt;</code></td>
                <td>All void HTML tags must be explicitly self-closed in JSX.</td>
              </tr>
              <tr>
                <td><code className="font-mono">onclick="..."</code></td>
                <td><code className="font-mono text-indigo-400">onClick=&#123;handleClick&#125;</code></td>
                <td>Event handlers use camelCase naming and pass JavaScript functions.</td>
              </tr>
              <tr>
                <td><code className="font-mono">style="color:red;"</code></td>
                <td><code className="font-mono text-pink-400">style=&#123;&#123; color: 'red' &#125;&#125;</code></td>
                <td>Inline styles are passed as JavaScript objects with camelCase keys.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: Reusable Functional Components */}
        <div className="glass-panel concept-card">
          <h3>
            <Layers className="text-pink-400" size={20} />
            2. Reusable Functional Components Architecture
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            Lumina Gallery is structured into isolated, reusable functional components that receive data via <code className="font-mono text-indigo-400">props</code> and encapsulate local behaviors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="font-bold text-indigo-400 mb-1">&lt;PhotoCard /&gt;</div>
              <div className="text-xs text-slate-400">
                Encapsulates hover animations, category tag rendering, heart favorite toggle, zoom activation, and artist details.
              </div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="font-bold text-pink-400 mb-1">&lt;FilterBar /&gt;</div>
              <div className="text-xs text-slate-400">
                Handles search query input, category selector pills, orientation filter, and view mode toggle buttons.
              </div>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="font-bold text-cyan-400 mb-1">&lt;LightboxModal /&gt;</div>
              <div className="text-xs text-slate-400">
                Fullscreen overlay providing photo zoom, technical EXIF stats, download links, and keyboard shortcut listeners.
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Array Operations (map, filter, reduce, sort) */}
        <div className="glass-panel concept-card">
          <h3>
            <Cpu className="text-cyan-400" size={20} />
            3. Dynamic Content Rendering via Array Operations (<code className="font-mono">map</code> & <code className="font-mono">filter</code>)
          </h3>
          <p className="text-slate-300 text-sm mb-2">
            In React, arrays of objects are dynamically transformed into UI elements using native JavaScript array methods:
          </p>

          <div className="code-block">
{`// 1. Array .filter() operation: Filter photos by Search Query & Category
const filteredPhotos = photos.filter((photo) => {
  const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
  const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
});

// 2. Array .map() operation: Transforming objects array into JSX elements grid
return (
  <div className="gallery-grid">
    {filteredPhotos.map((photo) => (
      <PhotoCard key={photo.id} photo={photo} />
    ))}
  </div>
);`}
          </div>
        </div>

        {/* Section 4: State Management with React Hooks */}
        <div className="glass-panel concept-card">
          <h3>
            <Sparkles className="text-amber-400" size={20} />
            4. State Management & React Hooks Overview
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
              <div>
                <strong className="text-white">useState:</strong> Tracks dynamic interactive states like search queries, category filters, active lightbox IDs, theme, and user favorites.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
              <div>
                <strong className="text-white">useEffect:</strong> Handles side-effects such as persisting favorites and dark/light mode preference into browser <code className="font-mono text-indigo-400">localStorage</code>, and setting up window keyboard event listeners for Esc / Arrow keys.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
              <div>
                <strong className="text-white">useMemo:</strong> Optimizes computational performance by memoizing filtered and sorted photo arrays so re-render calculations execute only when input dependencies change.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
              <div>
                <strong className="text-white">useContext (GalleryContext):</strong> Provides global state access across the entire component tree, allowing any component to toggle favorites, trigger notifications, or navigate seamlessly.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
