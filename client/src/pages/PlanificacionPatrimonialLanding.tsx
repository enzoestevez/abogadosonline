import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function PlanificacionPatrimonialLanding() {
  const whyChooseItems = [
    "15 años de experiencia en planificación patrimonial",
    "Consulta completamente confidencial",
    "Estrategia personalizada garantizada",
    "Precio justo y transparente ($50.000 ARS consulta inicial)",
  ];

  const formFields = [
    { name: "nombre", label: "Nombre completo", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "telefono", label: "Teléfono", type: "tel", required: true },
    { name: "descripcion", label: "Descripción de tu patrimonio", type: "textarea", required: true },
    { name: "objetivos", label: "¿Cuál es tu objetivo principal?", type: "select", required: true },
    { name: "herederos", label: "¿Tienes herederos definidos?", type: "select", required: true },
  ];

  const testimonials = [
    {
      name: "Ignacio Ruiz",
      text: "Excelente asesoramiento. Planificaron mi patrimonio de forma estratégica.",
      result: "Plan patrimonial implementado",
    },
    {
      name: "Mariana López",
      text: "Muy profesionales. Aseguraron el futuro de mi familia.",
      result: "Patrimonio protegido y planificado",
    },
    {
      name: "Sergio Martínez",
      text: "Recomendable. Resolvieron mis dudas sobre protección patrimonial.",
      result: "Estrategia patrimonial exitosa",
    },
  ];

  const miniBlogContent = {
    title: "Planificación Patrimonial: Asegurando tu Futuro y el de tu Familia",
    paragraphs: [
      "La **planificación patrimonial** es un proceso estratégico y legal que te permite organizar, proteger y transferir tus bienes de la manera más eficiente posible. Si buscas **fideicomisos civiles y familiares** o **protección de bienes legales en Buenos Aires**, nuestro estudio te ofrece soluciones. Va más allá de la simple herencia, buscando optimizar la gestión de tu patrimonio en vida y asegurar su correcta distribución post-mortem, minimizando riesgos y conflictos.",
      "Este proceso implica un análisis exhaustivo de tus activos (inmuebles, inversiones, empresas, etc.) y pasivos, así como de tus objetivos personales y familiares. Se utilizan diversas herramientas legales como testamentos, fideicomisos, donaciones, y estructuras societarias para lograr la protección deseada, la eficiencia fiscal y la continuidad de tu legado. Es una medida proactiva para evitar problemas futuros y garantizar la tranquilidad de tus seres queridos.",
      "Una planificación patrimonial bien ejecutada no solo resguarda tus bienes de imprevistos o litigios, sino que también facilita la sucesión, evitando largos y costosos trámites judiciales. Es especialmente relevante para empresarios, profesionales y familias con patrimonios significativos. Contar con el asesoramiento de un abogado especializado es clave para diseñar un plan a medida que se adapte a tu situación particular y a las leyes vigentes, asegurando que tu voluntad se cumpla y tu patrimonio perdure.",
    ],
  };

  const faqs = [
    {
      question: "¿Qué es la planificación patrimonial?",
      answer: "Es la estrategia legal para organizar, proteger y transferir tu patrimonio de forma eficiente.",
    },
    {
      question: "¿Cuánto cuesta una planificación patrimonial?",
      answer: "La consulta inicial es $50.000 ARS. El plan completo depende de la complejidad.",
    },
    {
      question: "¿Cuándo debo hacer una planificación patrimonial?",
      answer: "Cuanto antes mejor. Es especialmente importante si tienes patrimonio significativo.",
    },
    {
      question: "¿Qué incluye una planificación patrimonial?",
      answer: "Análisis de bienes, estrategia fiscal, testamento, fideicomisos, y protección legal.",
    },
    {
      question: "¿Puedo cambiar mi plan después?",
      answer: "Sí, la planificación es flexible y se puede ajustar según cambios en tu situación.",
    },
    {
      question: "¿Cuáles son los beneficios?",
      answer: "Protección de bienes, eficiencia fiscal, sucesión ordenada, y paz mental.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Planificación Patrimonial - Fideicomisos Civiles y Familiares"
      subtitle="Protección de bienes legales en Buenos Aires para tu futuro"
      
      whyChooseItems={whyChooseItems}
      
      
      
      testimonials={testimonials}
      faqs={faqs}
      miniBlogContent={miniBlogContent}
    />
  );
}
