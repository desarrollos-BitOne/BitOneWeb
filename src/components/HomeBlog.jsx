import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import '../pages/Blog.css'; // Reutilizamos tu arquitectura CSS Premium

export default function HomeBlog() {
  const [randomPosts, setRandomPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch de los últimos 15 artículos de Sanity (Para asegurar frescura y aleatoriedad sin jalar toda la DB)
    const query = `*[_type == "post" && visibility == "public" && isApproved == true] | order(publishedAt desc)[0...15] {
      title,
      slug,
      mainImage,
      publishedAt,
      "cat": categories[0]->title,
      "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
    }`;

    client.fetch(query)
      .then((data) => {
        if (!data || data.length === 0) {
          setLoading(false);
          return;
        }

        // 2. Algoritmo Fisher-Yates (Para barajar criptográficamente la lista extraída)
        const shuffled = [...data];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // 3. Imprimir solo los 3 ganadores
        setRandomPosts(shuffled.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null; // Componente silencioso, si carga no estorba la web.
  if (randomPosts.length === 0) return null;

  return (
    <section className="home-blog-section" style={{ padding: '80px 0', backgroundColor: '#020617' }}>
      <div className="container">
        
        {/* Header de la Sección */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ 
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: '800',
            background: 'rgba(0, 242, 254, 0.1)',
            color: '#00f2fe',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            textTransform: 'uppercase',
            marginBottom: '15px'
          }}>Blog y Novedades</span>
          
          <h2 className="display-title-premium" style={{ fontSize: '3rem', margin: '0' }}>
            Explora nuestros <span className="gradient-text">Últimos Artículos</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '15px' }}>
            Descubre guías prácticas, tendencias, noticias relevantes y reflexiones sobre nuestra industria.
          </p>
        </div>

        {/* Reuso de Grilla de Tarjetas */}
        <div className="premium-blog-bento">
          {randomPosts.map((post) => (
             <article key={post.slug.current} className="premium-post-card">
               <Link to={`/blog/${post.slug.current}`} className="post-card-inner">
                 
                 <div className="post-image-glass">
                   {post.mainImage ? (
                     <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} />
                   ) : (
                      <div className="missing-img-fallback"></div>
                   )}
                   {post.cat && <span className="floating-category-tag">{post.cat}</span>}
                 </div>

                 <div className="post-content-premium">
                   <div className="post-meta-data">
                      <span className="premium-date">{new Date(post.publishedAt).toLocaleDateString()}</span>
                   </div>
                   <h3 className="post-title-neo" style={{ fontSize: '1.4rem' }}>{post.title}</h3>
                   <p className="post-excerpt-neo" style={{ fontSize: '1rem' }}>{post.excerpt}</p>
                   
                   <div className="read-more-neo">Leer investigación <span className="neo-arrow">→</span></div>
                 </div>

               </Link>
             </article>
          ))}
        </div>

        {/* CTA Bajar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <Link to="/blog" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1rem' }}>
            Ver todos los artículos
          </Link>
        </div>

      </div>
    </section>
  );
}
