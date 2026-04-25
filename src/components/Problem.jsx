import './Problem.css';

export default function Problem() {
  return (
    <section className="problem-section-modern">
      <div className="container split-grid">
        {/* LADO IZQUIERDO: EL DOLOR DEL CLIENTE */}
        <div className="problem-text">
          <span className="section-tag-v2">REALIDAD DEL MERCADO</span>
          <h2>¿Tu negocio aún depende de procesos manuales o sistemas obsoletos?</h2>
          <p className="problem-desc">
            Los pequeños negocios y emprendedores en México a menudo operan con libretas y hojas de Excel básicas, generando ineficiencia. Carecen de una presencia digital efectiva, limitando su alcance. Además, la mayoría de soluciones en el mercado son costosas, complejas, dirigidas a grandes empresas y omiten un diagnóstico empresarial vital antes de invertir.
          </p>
        </div>

        {/* LADO DERECHO: LA DIFERENCIACIÓN (PVU) */}
        <div className="pvu-card-glass">
          <div className="pvu-glow"></div>
          <div className="pvu-content">
            <h3>Nuestra Propuesta de Valor Única</h3>
            <p className="pvu-quote">
              "Transformación digital basada en análisis. No solo programamos; diagnosticamos tu negocio para brindarte soluciones prácticas, personalizadas y asequibles enfocadas en rentabilidad."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
