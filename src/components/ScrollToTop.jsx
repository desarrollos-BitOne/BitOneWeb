import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando la ruta cambie, forzamos al navegador a subir instantáneamente
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
