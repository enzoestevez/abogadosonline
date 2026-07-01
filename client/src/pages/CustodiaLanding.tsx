import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function CustodiaLanding() {
  const whyChooseItems = [
    "15 años de experiencia en custodia de hijos",
    "Consulta completamente confidencial",
    "Defensa de derechos de menores garantizada",
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
      name: "necesidad_custodia",
      label: "¿Cuál es tu principal necesidad?",
      type: "radio",
      required: true,
      options: [
        { value: "establecer_custodia", label: "Establecer custodia" },
        { value: "modificar_custodia", label: "Modificar custodia" },
        { value: "pension_alimenticia", label: "Reclamar pensión alimenticia" },
        { value: "regimen_visitas", label: "Establecer régimen de visitas" },
      ],
    },
    { name: "resumen_caso", label: "Dejanos un breve resumen de tu caso...", type: "textarea", required: true },
  ];

  const testimonials = [
    {
      name: "Daniela Pérez",
      text: "Excelente defensa de los derechos de mis hijos. Muy profesionales.",
      result: "Custodia compartida establecida",
    },
    {
      name: "Javier González",
      text: "Me asesoraron correctamente. Logré la custodia que buscaba.",
      result: "Custodia exclusiva otorgada",
    },
    {
      name: "Valeria Sánchez",
      text: "Recomendable. Priorizaron el bienestar de mis hijos en todo momento.",
      result: "Régimen de visitas justo establecido",
    },
  ];

  const miniBlogContent = {
    title: "Custodia de Hijos: Protegiendo el Bienestar de los Menores",
    paragraphs: [
      "La **custodia de hijos** es uno de los aspectos más delicados y cruciales en los procesos de separación o divorcio. Su objetivo principal es garantizar el bienestar y desarrollo integral de los menores, estableciendo quién será responsable de su **cuidado personal**, educación y toma de decisiones importantes. También nos encargamos de asegurar la **pensión alimenticia** adecuada para tus hijos.",
      "Existen diferentes modalidades de custodia, siendo las más comunes la custodia exclusiva (cuando uno de los progenitores asume la responsabilidad principal) y la custodia compartida (donde ambos padres participan activamente en el cuidado y las decisiones, ya sea de forma indistinta o con un régimen de alternancia). La elección de la modalidad dependerá de múltiples factores, siempre priorizando el interés superior del niño.",
      "Un abogado especializado en custodia de hijos no solo te guiará a través del proceso legal, sino que también te ayudará a negociar acuerdos justos y sostenibles, o a defender tus derechos y los de tus hijos en caso de conflicto. Es fundamental contar con asesoramiento legal para asegurar que se establezca un régimen de custodia que favorezca el desarrollo emocional, físico y educativo de los menores.",
    ],
  };

  const faqs = [
    {
      question: "¿Qué es la custodia legal?",
      answer: "Es el derecho y deber de cuidar, educar y tomar decisiones sobre un menor.",
    },
    {
      question: "¿Cuáles son los tipos de custodia?",
      answer: "Custodia exclusiva (un progenitor), custodia compartida (ambos), y custodia alternada.",
    },
    {
      question: "¿Cuánto cuesta un juicio de custodia?",
      answer: "La consulta inicial es $50.000 ARS. El costo total depende de la complejidad del caso.",
    },
    {
      question: "¿Cuánto tiempo demora un juicio de custodia?",
      answer: "Entre 3-6 meses en promedio, dependiendo de la complejidad y si hay acuerdo.",
    },
    {
      question: "¿Qué factores considera el juez?",
      answer: "El bienestar del niño, vínculo con cada progenitor, estabilidad, y capacidad de cuidado.",
    },
    {
      question: "¿Puedo cambiar la custodia después?",
      answer: "Sí, si hay cambios significativos en las circunstancias o el bienestar del niño.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Custodia de Hijos y Cuidado Personal - Abogado Especialista"
      subtitle="Aseguramos la pensión alimenticia y el bienestar de tus hijos"
      
      whyChooseItems={whyChooseItems}
      
      
      
      testimonials={testimonials}
      faqs={faqs}
      miniBlogContent={miniBlogContent}
      formFields={formFields}
    />
  );
}
