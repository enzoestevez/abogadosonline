import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function FideicomisosLanding() {
  const whyChooseItems = [
    "15 años de experiencia en fideicomisos",
    "Consulta completamente confidencial",
    "Estructura legal de protección garantizada",
    "Precio justo y transparente ($50.000 ARS consulta inicial)",
  ];

  const differentiator = "¿Qué es un fideicomiso?";
  const differentiatorContent =
    "Es una figura legal de protección donde transferís bienes a un fiduciario para que los administre en beneficio de terceros (beneficiarios).";

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
      name: "objetivo_fideicomiso",
      label: "¿Cuál es tu objetivo principal con el fideicomiso?",
      type: "radio",
      required: true,
      options: [
        { value: "proteccion_bienes", label: "Protección de bienes" },
        { value: "planificacion_sucesoria", label: "Planificación sucesoria" },
        { value: "gestion_inversiones", label: "Gestión de inversiones" },
        { value: "otros", label: "Otros" },
      ],
    },
    { name: "resumen_caso", label: "Dejanos un breve resumen de tu caso...", type: "textarea", required: true },
  ];

  const testimonials = [
    {
      name: "Horacio Díaz",
      text: "Excelente asesoramiento. Protegí mi patrimonio de forma legal y segura.",
      result: "Fideicomiso constituido exitosamente",
    },
    {
      name: "Claudia Moreno",
      text: "Muy profesionales. Explicaron todos los beneficios del fideicomiso.",
      result: "Patrimonio protegido para herederos",
    },
    {
      name: "Raúl Fernández",
      text: "Recomendable. Resolvieron mi necesidad de protección patrimonial.",
      result: "Fideicomiso operativo y seguro",
    },
  ];

  const miniBlogContent = {
    title: "Fideicomiso: La Herramienta Clave para la Protección Patrimonial",
    paragraphs: [
      "El **fideicomiso** es una figura jurídica versátil y poderosa que permite a una persona (fiduciante) transferir bienes a otra (fiduciario) para que los administre en beneficio de un tercero (beneficiario). Es una estrategia legal ideal para la **protección patrimonial**, **planificar la sucesión** y asegurar el futuro de los seres queridos o de un proyecto específico. Ofrecemos **fideicomisos civiles y familiares** adaptados a tus necesidades.",
      "En Argentina, el fideicomiso puede constituirse sobre diversos tipos de bienes, como inmuebles, acciones, dinero o derechos. Su principal ventaja radica en que los bienes fideicomitidos forman un patrimonio separado del fiduciante y del fiduciario, lo que los hace inembargables e inejecutables por deudas personales de cualquiera de ellos. Esto ofrece una robusta protección frente a riesgos comerciales, juicios o situaciones imprevistas.",
      "Además de la protección, el fideicomiso es una excelente herramienta para la planificación sucesoria, ya que permite establecer cómo se distribuirán los bienes después del fallecimiento del fiduciante, evitando los largos y costosos procesos sucesorios. También es útil para garantizar el sostenimiento de menores o personas con discapacidad, o para estructurar inversiones y proyectos empresariales con mayor seguridad jurídica. Un asesoramiento legal especializado es crucial para diseñar un fideicomiso a medida que se adapte a tus necesidades y objetivos.",
    ],
  };

  const faqs = [
    {
      question: "¿Cuánto cuesta constituir un fideicomiso?",
      answer: "La consulta inicial es $50.000 ARS. El costo total depende del tipo y complejidad.",
    },
    {
      question: "¿Cuánto tiempo demora constituir un fideicomiso?",
      answer: "Entre 15-30 días hábiles, dependiendo de la documentación y tipo de bien.",
    },
    {
      question: "¿Puedo cambiar los beneficiarios después?",
      answer: "Depende del tipo de fideicomiso. Algunos permiten modificaciones, otros no.",
    },
    {
      question: "¿Qué bienes puedo poner en fideicomiso?",
      answer: "Inmuebles, dinero, acciones, vehículos, y otros bienes de valor.",
    },
    {
      question: "¿Pierdo la propiedad del bien?",
      answer: "Técnicamente sí, pero conservas derechos como beneficiario y control sobre el destino.",
    },
    {
      question: "¿Cuáles son los beneficios del fideicomiso?",
      answer: "Protección patrimonial, planificación sucesoria, y resguardo de bienes.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Fideicomisos Civiles y Familiares - Protección Patrimonial"
      subtitle="Asegura tu futuro con fideicomisos legales en Buenos Aires"
      
      whyChooseItems={whyChooseItems}
      differentiator={differentiator}
      differentiatorContent={differentiatorContent}
      
      
      
      testimonials={testimonials}
      faqs={faqs}
      miniBlogContent={miniBlogContent}
      formFields={formFields}
    />
  );
}
