import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, url, image, article, customSchema }) {
  const siteName = "BitOne | Agencia de Consultoría y Desarrollo de Software";
  const defaultDescription = "Agencia tecnológica en Los Mochis, Sinaloa especializada en transformación digital, desarrollo web premium y software para pymes.";
  const baseUrl = "https://bit-one.net"; // Reemplazar con dominio real cuando haya uno oficial asegurado, por ahora bit-one.net es tu asunción

  const metaTitle = title ? `${title} | BitOne` : siteName;
  const metaDescription = description || defaultDescription;
  const metaImage = image || `${baseUrl}/og-image-default.jpg`; 
  const metaUrl = url ? `${baseUrl}${url}` : baseUrl;

  // GEO Default Schema (Local Business for Los Mochis, Sinaloa)
  const defaultLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BitOne",
    "image": `${baseUrl}/logo192.png`,
    "description": defaultDescription,
    "url": baseUrl,
    "telephone": "+526681963932",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Mochis",
      "addressRegion": "Sinaloa",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.7904, // Aproximado Los Mochis
      "longitude": -108.9858
    }
  };

  const schemaToRender = customSchema ? customSchema : defaultLocalBusinessSchema;

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToRender)}
      </script>
    </Helmet>
  );
}
