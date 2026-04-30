import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';

// La página principal se carga de inmediato
import Home from './pages/Home';

// Las demás páginas se cargan "perezosamente" (Code Splitting)
const Servicios = lazy(() => import('./pages/Servicios'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Proyectos = lazy(() => import('./pages/Proyectos'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Proceso = lazy(() => import('./pages/Proceso'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

export default function App() {
  return (
    <HelmetProvider>
      <Router>
      <ScrollToTop />
      <Analytics />
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div className="live-dot-pulse"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/servicios/:slug" element={<ServiceDetail />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/proyectos/:slug" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/como-trabajamos" element={<Proceso />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
    </HelmetProvider>
  );
}
