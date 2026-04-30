import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

export default function Analytics() {
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      // Diferimos la inicialización de Google Analytics por 2.5s para no bloquear el Hilo Principal al inicio
      const timer = setTimeout(() => {
        ReactGA.initialize(GA_MEASUREMENT_ID);
        setIsInitialized(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      ReactGA.send({ 
        hitType: 'pageview', 
        page: location.pathname + location.search,
        title: document.title 
      });
    }
  }, [location, isInitialized]);

  return null;
}

/**
 * Event tracking helper
 * @param {string} category - e.g. 'Button'
 * @param {string} action - e.g. 'Click'
 * @param {string} label - e.g. 'Contact CTA'
 */
export const trackEvent = (category, action, label) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
    // console.log(`GA4 Event tracked: ${category} - ${action} - ${label}`);
  }
};
