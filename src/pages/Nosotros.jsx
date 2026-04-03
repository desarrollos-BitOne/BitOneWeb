import logoNormal from '../assets/LogoNormal.png';
import Seo from '../components/Seo';
import './Nosotros.css';

export default function Nosotros() {
  const valores = [
    { num: '01', title: 'Accesibilidad', desc: 'Soluciones asequibles y fáciles de entender, sin tecnicismos innecesarios.' },
    { num: '02', title: 'Pragmatismo', desc: 'Nos enfocamos en resolver el problema del cliente de forma directa, sin complicaciones.' },
    { num: '03', title: 'Empatía', desc: 'Entendemos las necesidades y desafíos de los negocios pequeños para ofrecer la mejor alternativa.' },
    { num: '04', title: 'Calidad', desc: 'Entregamos software funcional, robusto y documentado, respaldado por un análisis sólido.' },
    { num: '05', title: 'Personalización', desc: 'Adaptamos la tecnología a las necesidades específicas para garantizar eficacia.' }
  ];

  return (
    <div className="about-page-premium">
      <Seo 
        title="Nuestra Visión Técnica | El Equipo" 
        description="Conoce al equipo estratégico de BitOne. No nos atamos a una tecnología específica; diagnosticamos y aplicamos la herramienta exacta que tu empresa necesita, desde integraciones hasta software a la medida."
        url="/nosotros"
      />

      {/* HERO SECTION PREMIUM */}
      <section className="about-hero-premium">
        <div className="container relative-z">
          <div className="hero-content-wrapper">
            <div className="hero-badge-glass">
              <span className="live-dot"></span> Sobre nosotros
            </div>

            <h1 className="display-title-premium">
              <span className="gradient-text">BitOne</span>
            </h1>

            <p className="hero-subtitle">
              Ayudamos a negocios y emprendedores en México a modernizarse mediante <strong>soluciones digitales prácticas</strong>. Si tu operación aún depende de libretas, formatos manuales, hojas de Excel o sistemas obsoletos, estás en el lugar correcto para iniciar tu verdadera transformación.
            </p>

            <div className="hero-tech-pills">
              <span className="tech-pill">Ingeniería a Medida</span>
              <span className="tech-pill">Análisis de Negocio</span>
              <span className="tech-pill">Crecimiento Escalable</span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="identity-section-premium">
        <div className="container relative-z">
          <div className="identity-layout">
            <div className="identity-card left">
              <div className="glow-edge cyan"></div>
              <h3>Nuestra Misión</h3>
              <p>En BitOne, impulsamos la transformación digital de pymes y emprendedores en México, ofreciendo análisis y soluciones digitales accesibles, prácticas y personalizadas, garantizando un crecimiento real y eficiencia en sus operaciones.</p>
            </div>
            <div className="identity-card right">
              <div className="glow-edge pink"></div>
              <h3>Nuestra Visión</h3>
              <p>Ser reconocidos como el socio tecnológico y consultor estratégico de confianza para miles de pymes y emprendedores en México, ayudándolos a competir y prosperar en la economía digital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO BOX VALORES */}
      <section className="values-section-premium">
        <div className="container relative-z">
          <div className="section-header-left">
            <span className="eyebrow-premium">DNA BitOne</span>
            <h2>Nuestros <span className="gradient-text">Valores</span></h2>
          </div>

          <div className="values-bento-grid">
            {valores.map((val) => (
              <div key={val.num} className="value-card">
                <span className="value-num">{val.num}</span>
                <h4>{val.title}</h4>
                <p>{val.desc}</p>
                <div className="value-hover-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL SEAL */}
      <section className="institutional-section">
        <div className="container relative-z flex-center">
          <div className="institutional-box">
            <img src={logoNormal} alt="BitOne" className="institutional-logo" />
            <p className="institutional-quote">
              "La evolución de tu negocio comienza con una línea de código precisa."
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}