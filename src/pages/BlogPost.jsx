import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/PortableTextCustom';
import Seo from '../components/Seo';
import LoadingScreen from '../components/LoadingScreen';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // 1) Fetch main post
    const query = `*[_type == "post" && slug.current == $slug && isApproved == true][0] {
      ...,
      "authorName": author->name,
      "categoriesList": categories[]->title
    }`;
    client.fetch(query, { slug })
      .then(setPost)
      .catch(console.error);

    // 2) Fetch recent 3 posts for the sidebar (excluding the current one)
    const recentQuery = `*[_type == "post" && visibility == "public" && isApproved == true && slug.current != $slug] | order(publishedAt desc)[0...3] {
      title,
      slug,
      publishedAt
    }`;
    client.fetch(recentQuery, { slug })
      .then(setRecentPosts)
      .catch(console.error);
  }, [slug]);

  if (!post) {
    return <LoadingScreen message="Preparando publicación..." />;
  }

  return (
    <article className="post-detail-page fade-in">
      <Seo 
        title={post.title} 
        description={post.excerpt}
        image={post.mainImage ? urlFor(post.mainImage).width(1200).url() : null}
        url={`/blog/${slug}`}
        article={true}
      />

      {/* Premium Hero Header */}
      <header className="post-hero-premium">
        <div className="hero-background-overlay"></div>
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1920).url()} 
            alt={post.title} 
            className="post-hero-img" 
          />
        )}
        
        <div className="post-hero-content container">
          <button onClick={() => navigate(-1)} className="back-to-blog" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            ← Directorio Tech
          </button>
          
          {post.categoriesList && post.categoriesList.length > 0 && (
            <div className="post-tags-flex">
              {post.categoriesList.map((cat, i) => (
                 <span key={i} className="post-cat-tag">{cat}</span>
              ))}
            </div>
          )}
          
          <h1 className="post-main-title">{post.title}</h1>
          
          <div className="post-meta-premium">
             <span className="post-date-large">{new Date(post.publishedAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
             {post.authorName && (
               <>
                 <span className="meta-divider">•</span>
                 <span className="post-author-name">Por {post.authorName}</span>
               </>
             )}
          </div>
        </div>
      </header>
      
      {/* Editorial Body Segment with Sidebar Grid */}
      <div className="post-body-editorial container">
        <div className="post-layout-grid">
          
          {/* Main Content Area */}
          <div className="editorial-content">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          {/* Sticky Commercial Sidebar */}
          <aside className="blog-sidebar">
            <div className="sidebar-sticky-box">
              
              <div className="sidebar-cta-widget">
                <h3>Transforma estas ideas en Software Real</h3>
                <p>Nuestros ingenieros analizan los procesos de tu PyME sin costo y proponen un plan de digitalización inteligente.</p>
                <a href="https://wa.me/526681963932?text=Hola,%20acabo%20de%20leer%20su%20blog.%20Me%20gustar%C3%ADa%20un%20an%C3%A1lisis%20de%20tecnolog%C3%ADa%20gratuito." target="_blank" rel="noopener noreferrer" className="sidebar-btn-cyber">
                  Solicitar Análisis Gratuito
                </a>
              </div>

              {recentPosts.length > 0 && (
                <div className="sidebar-recents">
                  <h4>Lecturas Recientes</h4>
                  {recentPosts.map((recent) => (
                    <Link key={recent.slug.current} to={`/blog/${recent.slug.current}`} className="recent-post-mini">
                      <h5>{recent.title}</h5>
                      <span>{new Date(recent.publishedAt).toLocaleDateString('es-MX', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </Link>
                  ))}
                </div>
              )}

            </div>
          </aside>
          
        </div>
      </div>
    </article>
  );
}
