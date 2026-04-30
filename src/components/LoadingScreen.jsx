import React from 'react';

const LoadingScreen = ({ message = "Cargando contenido..." }) => {
  return (
    <div className="premium-loading-screen">
      <div className="loading-content">
        <div className="bitone-logo-loader">
          <div className="live-dot-pulse"></div>
          <span className="loader-text">BitOne</span>
        </div>
        <p className="loading-message">{message}</p>
      </div>
      <div className="loader-progress-bar">
        <div className="loader-progress-inner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
