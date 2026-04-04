import React from 'react';
import './Cta.css';
import { trackEvent } from './Analytics';

const Cta = ({ 
  title = "Ready to start?", 
  description = "Connect with our technical team today.", 
  buttonText = "Start Project", 
  buttonLink = "https://wa.me/526681963932",
  pageName = "Global" 
}) => {
  return (
    <section className="global-cta-section">
      <div className="container">
        <div className="cta-glass-card">
          <div className="cta-glow-effect"></div>
          <h2>{title}</h2>
          <p>{description}</p>
          <a 
            href={buttonLink} 
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(`${pageName} CTA`, 'Click', title)}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cta;
