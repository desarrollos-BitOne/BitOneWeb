import React, { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { client } from '../lib/sanity';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import './Home.css';
import Seo from '../components/Seo';

// Componentes "Below the fold" cargados perezosamente para reducir el tamaño del JS inicial
const Services = lazy(() => import('../components/Services'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const HomeBlog = lazy(() => import('../components/HomeBlog'));
const Marquee = lazy(() => import('../components/Marquee'));
const Cta = lazy(() => import('../components/Cta'));

let memoryCache = {
  data: null,
  scrollPos: 0
};

export default function Home() {
  const [data, setData] = useState(memoryCache.data);

  useEffect(() => {
    // Si ya tenemos los datos, evitamos recargar todo el home
    if (memoryCache.data) return;

    // Traemos proyectos, servicios limpios y testimonios
    const query = `{
      "projects": *[_type == "project" && featured == true] | order(date desc)[0..3]{
        _id, 
        title,
        "name": client->name,
        "slug": slug.current,
        "cat": client->category->title, 
        "logo": client->logo, 
        image, 
        workDescription,
        date
      },
      "services": *[_type == "service"] | order(_createdAt asc)[0..2]{
        _id,
        title,
        "slug": slug.current,
        subtitle,
        summary,
        icon,
        actionUrl
      },
      "testimonials": *[_type == "testimonial" && approved == true] | order(_createdAt desc){
        _id,
        authorName,
        authorRole,
        quote,
        project->{
          "name": client->name,
          "logo": client->logo
        }
      },
      "clients": *[_type == "client" && featured == true]{
        _id,
        name,
        logo
      }
    }`;

    client.fetch(query)
      .then((res) => {
        // Función para aleatorizar el array
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        // Mezclamos testimonios y agarramos máximo 5
        if (res.testimonials) {
          res.testimonials = shuffleArray([...res.testimonials]).slice(0, 5);
        }

        setData(res);
        memoryCache.data = res;
      })
      .catch((err) => {
        console.error("❌ [Home] Error al traer datos:", err);
      });
  }, []);

  // Restauración síncrona antes de pintar
  useLayoutEffect(() => {
    if (memoryCache.scrollPos > 0) {
      window.scrollTo({ top: memoryCache.scrollPos, behavior: 'instant' });
    }
  }, []);

  // Guardar posición continuamente mientras scrolleamos
  useEffect(() => {
    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        memoryCache.scrollPos = window.scrollY;
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="home-modern">
      <Seo
        title="Consultoría y Desarrollo de Software"
        description="Transformamos empresas operativas en negocios digitales eficientes en Los Mochis. Desarrollo de software a medida, e-commerce y consultoría tecnológica para pymes."
        url=""
      />
      <Hero />
      <Problem />
      <Suspense fallback={<div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div className="live-dot-pulse"></div></div>}>
        {data && <Services services={data.services} />}
        {data && <Portfolio projects={data.projects} />}
        {data && <Testimonials testimonials={data.testimonials} />}
        <HomeBlog />
        {data && <Marquee clients={data.clients} />}
        <Cta
          title="No te quedes rezagado en el pasado digital"
          description="Ya conoces a BitOne. Es hora de llevar tus procesos al siguiente nivel con software limpio, moderno y accesible."
          buttonText="Iniciar Análisis Gratuito"
          pageName="Home"
        />
      </Suspense>
    </div>
  );
}
