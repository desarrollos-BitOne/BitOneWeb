import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import Seo from '../components/Seo';
import Cta from '../components/Cta';
import './Blog.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Estados del Motor de Exploración
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [limit, setLimit] = useState(9); // Iniciamos con 9 artículos
  const [totalPostsCount, setTotalPostsCount] = useState(0); // Para saber si ocultamos el botón de "Cargar más"
  const [loading, setLoading] = useState(false);

  // Inicializar todas las categorías disponibles en la CMS
  useEffect(() => {
    client.fetch(`*[_type == "category"]{ title }`)
      .then((data) => {
        // Extraemos solo el string del titulo
        const cats = data.map(c => c.title).filter(Boolean);
        setCategories(["Todas", ...cats]);
      })
      .catch(console.error);
  }, []);

  // Motor principal (reacciona a busqueda, categoria o limite)
  useEffect(() => {
    setLoading(true);
    
    // Condicionales para GROQ
    const categoryFilter = activeCategory !== "Todas" ? `&& "${activeCategory}" in categories[]->title` : "";
    const searchFilter = searchTerm.trim() !== "" ? `&& title match "*${searchTerm}*"` : "";
    
    const countQuery = `count(*[_type == "post" && visibility == "public" && isApproved == true ${categoryFilter} ${searchFilter}])`;
    
    const fetchQuery = `*[_type == "post" && visibility == "public" && isApproved == true ${categoryFilter} ${searchFilter}] | order(publishedAt desc)[0...$limit] {
      title,
      slug,
      mainImage,
      publishedAt,
      "cat": categories[0]->title,
      "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
    }`;

    // Hacemos ambas peticiones en paralelo
    Promise.all([
      client.fetch(countQuery),
      client.fetch(fetchQuery, { limit })
    ])
      .then(([count, data]) => {
        setTotalPostsCount(count);
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
      
  }, [searchTerm, activeCategory, limit]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setLimit(9); // Reseteamos paginación al buscar
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSearchTerm(""); // Limpiamos la barra al cambiar de pestaña explícitamente
    setLimit(9);
  };

  const loadMore = () => {
    setLimit((prev) => prev + 9);
  };

  return (
    <div className="blog-page">
      <Seo 
        title="Directorio Tech" 
        description="Publicación sobre desarrollo web, estrategia digital para empresas y transformación tecnológica por BitOne."
        url="/blog"
      />

      <section className="blog-hero hero-section-premium container relative-z text-center">
        <div className="hero-badge-glass process-badge">
           <span className="live-dot-pulse"></span> BitOne Journal
        </div>
        <h1 className="display-title-premium" autoFocus>
          Directorio <span className="gradient-text">Tech</span>
        </h1>
        <p className="hero-subtitle centered">
          Nuestra visión documentada. Investigaciones y análisis sobre el futuro del software.
        </p>
      </section>


      <div className="container" style={{ marginBottom: '40px' }}>
         {/* EXPLORER UI */}
         <div className="blog-explorer-panel">
            <input 
              type="text" 
              placeholder="Buscar investigaciones, herramientas o conceptos..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="blog-search-bar"
            />
            
            {categories.length > 1 && (
              <div className="blog-categories-pills">
                {categories.map((cat, i) => (
                  <button 
                    key={i} 
                    className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
         </div>
      </div>

      <div className="container">
        {loading && posts.length === 0 ? (
          <div className="post-loading-fallback">Rastreando nuestra hemeroteca...</div>
        ) : posts.length === 0 ? (
           <div className="no-posts-found">No encontramos artículos que coincidan con tu búsqueda.</div>
        ) : (
          <>
            <div className="premium-blog-bento">
              {posts.map((post) => {
                return (
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
                        <h2 className="post-title-neo">{post.title}</h2>
                        <p className="post-excerpt-neo">{post.excerpt}</p>
                        
                        <div className="read-more-neo">Leer investigación completa <span className="neo-arrow">→</span></div>
                      </div>

                    </Link>
                  </article>
                );
              })}
            </div>

            {/* BOTÓN CARGAR MÁS */}
            {posts.length < totalPostsCount && (
              <div className="load-more-container">
                <button onClick={loadMore} className="btn-load-more" disabled={loading}>
                  {loading ? 'Cargando datos...' : 'Cargar más resultados'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Cta 
        title="¿Te gusta nuestra visión técnica?"
        description="Llevamos el conocimiento del diario a la práctica de tu negocio. Suscríbete o contáctanos para una asesoría."
        buttonText="Suscribirse / Contacto"
        pageName="Blog"
      />

    </div>
  );
}