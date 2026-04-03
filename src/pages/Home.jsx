import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Problem from '../components/Problem';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import HomeBlog from '../components/HomeBlog'; // NUEVO COMPONENTE BARAJA LECTURAS ALEATORIAS
import CtaFooter from '../components/CtaFooter';
import './Home.css';

import Seo from '../components/Seo';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Traemos proyectos, servicios limpios y testimonios
    const query = `{
      "projects": *[_type == "project" && featured == true] | order(date desc)[0..3]{
        _id, 
        name, 
        "cat": category->title, 
        logo, 
        image, 
        workDescription,
        date
      },
      "services": *[_type == "service"] | order(_createdAt asc)[0..2],
      "testimonials": *[_type == "testimonial" && approved == true] | order(_createdAt desc){
        _id,
        authorName,
        authorRole,
        quote,
        project->{
          name,
          logo
        }
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
      })
      .catch((err) => {
        console.error("❌ [Home] Error al traer datos:", err);
      });
  }, []);

  return (
    <div className="home-modern">
      <Seo 
        title="Consultoría y Desarrollo de Software Premium" 
        description="Transformamos empresas operativas en negocios digitales eficientes en Los Mochis. Desarrollo de software a medida, e-commerce y consultoría tecnológica premium para pymes."
        url=""
      />
      <Hero />
      <Problem />
      {data && <Services services={data.services} />}
      {data && <Portfolio projects={data.projects} />}
      {data && <Testimonials testimonials={data.testimonials} />}
      <HomeBlog />
      {data && <Marquee projects={data.projects} />}
      <CtaFooter />
    </div>
  );
}