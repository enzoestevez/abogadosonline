import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function SuccesionesLanding() {
  const whyChooseItems = [
    "15 años de experiencia en sucesiones",
    "Consulta completamente confidencial",
    "Proceso rápido (tramitación en 30-60 días)",
    "Precio justo y transparente ($50.000 ARS consulta inicial)",
  ];

  const formFields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio';
    required?: boolean;
    options?: { value: string; label: string }[];
  }> = [
    { name: "nombre", label: "Nombre completo", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "telefono", label: "Teléfono", type: "tel", required: true },
    {
      name: "situacion_bienes",
      label: "¿Cuál es la situación actual de los bienes?",
      type: "radio",
      required: true,
      options: [
        { value: "iniciar_cero", label: "Iniciar desde cero" },
        { value: "sucesion_trabada", label: "Sucesión trabada" },
        { value: "conflicto_herederos", label: "Conflicto entre herederos" },
      ],
    },
    { name: "resumen_caso", label: "Dejanos un breve resumen de tu caso...", type: "textarea", required: true },
  ];

  const testimonials = [
    {
      name: "María González",
      text: "Excelente atención. Resolvieron mi sucesión en 45 días. Muy profesionales.",
      result: "Heredó $500.000 en 45 días",
    },
    {
      name: "Juan Pérez",
      text: "Muy recomendable. Claros en los costos y transparentes en todo el proceso.",
      result: "Sucesión resuelta sin conflictos",
    },
    {
      name: "Ana López",
      text: "Profesionales de confianza. Resolvieron conflictos familiares con diplomacia.",
      result: "Patrimonio protegido para 3 herederos",
    },
  ];

  const miniBlogContent = {
    title: "¿Qué es una Sucesión y por qué es Importante?",
    paragraphs: [
      "Una **sucesión** es el proceso legal mediante el cual se transfiere la propiedad de los bienes de una persona fallecida (causante) a sus herederos. Si buscas un **abogado de sucesiones online** para **tramitar herencia en Buenos Aires y CABA**, nuestro estudio ofrece soluciones eficientes. Este trámite es fundamental para que los herederos puedan disponer legalmente de los bienes, ya sean inmuebles, cuentas bancarias, vehículos o cualquier otro activo.",
      "En Argentina, existen dos tipos principales de sucesiones: la testamentaria (cuando el causante dejó un testamento válido) y la intestada o ab intestato (cuando no hay testamento, y la ley determina quiénes son los herederos). Ambos procesos requieren la intervención de un abogado para garantizar que se cumplan todos los requisitos legales y se protejan los derechos de los herederos.",
      "La importancia de iniciar el trámite de sucesión radica en la necesidad de regularizar la titularidad de los bienes. Sin la declaratoria de herederos y la posterior inscripción de los bienes a nombre de estos, no es posible vender, alquilar, hipotecar o realizar cualquier otra operación legal con el patrimonio del causante. Un proceso sucesorio bien gestionado evita futuros conflictos familiares y asegura la correcta distribución de la herencia.",
    ],
  };

  const faqs = [
    {
      question: "¿Cuánto cuesta el trámite de sucesión completo?",
      answer: "El costo depende de la complejidad. La consulta inicial es $50.000 ARS. Ofrecemos presupuesto transparente según tu caso.",
    },
    {
      question: "¿Cuánto tiempo demora tramitar una sucesión?",
      answer: "Entre 30-60 días en promedio, dependiendo de si hay testamento y conflictos entre herederos.",
    },
    {
      question: "¿Necesito aparecer presencialmente o puedo hacerlo online?",
      answer: "Ofrecemos ambas opciones. Muchos trámites se pueden hacer online, pero algunos requieren presencia.",
    },
    {
      question: "¿Qué documentos debo traer?",
      answer: "Certificado de defunción, testamento (si existe), documentos de identidad de herederos, y comprobante de bienes.",
    },
    {
      question: "¿Qué pasa si hay conflicto entre herederos?",
      answer: "Mediamos entre partes para llegar a acuerdos. Si no es posible, procedemos con sucesión contenciosa.",
    },
    {
      question: "¿Puedo cambiar un testamento?",
      answer: "No, pero podemos asesorarte sobre nulidad o impugnación si hay vicios en su redacción.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Abogado de Sucesiones Online - Tramitar Herencia en Buenos Aires y CABA"
      subtitle="Declaratoria de herederos virtual y resolución de conflictos de herencia"
      
      whyChooseItems={whyChooseItems}
      
      
      
      testimonials={testimonials}
      faqs={faqs}
      miniBlogContent={miniBlogContent}
      formFields={formFields}
    />
  );
}
