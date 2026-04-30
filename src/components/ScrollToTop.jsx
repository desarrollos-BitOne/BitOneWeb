import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Desactivamos la restauración automática del navegador para evitar saltos locos (jumps)
    // Ahora cada página de lista (Blog, Proyectos) se encarga de su propia restauración manual.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Solo forzamos scroll arriba si NO es un retroceso (es decir, es PUSH o REPLACE)
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
}
