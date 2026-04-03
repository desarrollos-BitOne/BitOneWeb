import { urlFor } from '../lib/sanity';

export const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null; // Imagen inválida o en borrador incompleto
      }
      
      const scaleMode = value.imageSize || 'large'; // 'small', 'medium', 'large', 'xlarge'
      
      return (
        <figure className={`portable-image-figure scale-${scaleMode}`}>
          <img
            src={urlFor(value).width(scaleMode === 'xlarge' ? 1200 : 800).url()}
            alt={value.alt || 'Imagen de publicación técnica'}
            className="portable-image"
          />
          {value.caption && (
            <figcaption className="portable-image-caption">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    // Customize block styles for an editorial look
    h1: ({ children }) => <h1 className="portable-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="portable-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="portable-h3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="portable-blockquote">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="portable-p">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a href={value.href} rel={rel} target={target} className="portable-link">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="portable-strong">{children}</strong>,
  },
};
