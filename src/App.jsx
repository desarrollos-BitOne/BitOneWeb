import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Nosotros from './pages/Nosotros';
import Proyectos from './pages/Proyectos';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Proceso from './pages/Proceso';
import ProjectDetail from './pages/ProjectDetail';
import ServiceDetail from './pages/ServiceDetail';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';
import logoSolo from './assets/LogoSoloMonocromatico.png';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
      <ScrollToTop />
      <Analytics />
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <img 
          src={logoSolo} 
          alt="" 
          className="global-watermark" 
          width="400" 
          height="400" 
          loading="lazy" 
          fetchpriority="low" 
          decoding="async" 
        />
        <Navbar />
        <main style={{ flex: 1 }}>
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
        </main>
        <Footer />
      </div>
    </Router>
    </HelmetProvider>
  );
}
