import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from './Analytics';
import './Hero.css';

export default function Hero() {
  const words = [
    "Crecimiento",
    "PyME",
    "Emprendimiento",
    "Proyecto Digital"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-modern-v2">
      <div className="ambient-glow cyan"></div>
      <div className="ambient-glow pink"></div>

      <div className="container hero-grid">
        <div className="hero-text-side centered-hero">
          <div className="hero-badge">
            <span className="live-dot-pulse"></span>
            <span className="badge-text">BitOne | Soluciones Digitales</span>
          </div>

          <h1 className="hero-title">
            El socio tecnológico de tu <br />
            <span className="dynamic-word-wrapper">
              <span key={index} className="text-gradient-focus dynamic-word">
                {words[index]}
              </span>
            </span>
          </h1>

          <p className="hero-description">
            No hacemos simples diseños web. Transformamos requerimientos en infraestructura robusta diseñada para automatizar procesos y acelerar el crecimiento real de tu negocio.
          </p>

          <div className="hero-cta-group">
            <Link 
              to="/servicios" 
              className="btn-hero-primary" 
              onClick={() => trackEvent('Hero', 'Click', 'Ver Soluciones')}
            >
              Ver Soluciones
            </Link>
            <a 
              href="https://wa.me/526681963932?text=Hola,%20me%20gustaría%20hablar%20con%20un%20experto" 
              className="btn-hero-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackEvent('Hero', 'WhatsApp Click', 'Contactar Experto')}
            >
              Contactar Experto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}