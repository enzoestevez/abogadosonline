import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function TestamentoLanding() {
  const whyChooseItems = [
    "15 años de experiencia en redacción de testamentos",
    "Consulta completamente confidencial",
    "Testamento válido legalmente garantizado",
    "Precio justo y transparente ($50.000 ARS consulta inicial)",
  ];

  const differentiator = "¿Por qué hacer testamento?";
  const differentiatorContent = [
    "Evita conflictos familiares",
    "Define quién hereda qué",
    "Protege tu patrimonio",
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
      name: "objetivo_testamento",
      label: "¿Cuál es tu objetivo principal al hacer testamento?",
      type: "radio",
      required: true,
      options: [
        { value: "evitar_conflictos", label: "Evitar conflictos familiares" },
        { value: "proteger_patrimonio", label: "Proteger mi patrimonio" },
        { value: "designar_herederos", label: "Designar herederos específicos" },
        { value: "otros", label: "Otros" },
      ],
    },
    { name: "resumen_caso", label: "Dejanos un breve resumen de tu caso...", type: "textarea", required: true },
  ];

  const testimonials = [
    {
      name: "Elena Fernández",
      text: "Hice mi testamento con ellos. Muy profesionales y claros en todo el proceso.",
      result: "Testamento válido y protegido",
    },
    {
      name: "Francisco Gómez",
      text: "Excelente servicio. Me asesoraron sobre la mejor forma de proteger mi patrimonio.",
      result: "Patrimonio protegido para herederos",
    },
    {
      name: "Beatriz Martínez",
      text: "Recomendable. Resolvieron todas mis dudas sobre herencia y testamento.",
      result: "Testamento redactado legalmente válido",
    },
  ];

  const miniBlogContent = {
    title: "Testamento: Un Acto de Amor y Responsabilidad para tu Futuro",
    paragraphs: [
      "Hacer un **testamento** es un acto de previsión y responsabilidad que te permite decidir cómo se distribuirán tus bienes después de tu fallecimiento. Es una herramienta fundamental para cualquier persona que desee asegurar que su voluntad sea respetada, **evitar conflictos familiares** y **proteger tu patrimonio**.",
      "En Argentina, el testamento es un documento legal que debe cumplir con ciertas formalidades para ser válido. Puede ser ológrafo (escrito de puño y letra por el testador) o por acto público (otorgado ante escribano público). A través de él, puedes designar herederos, legar bienes específicos, establecer condiciones e incluso reconocer hijos. Es importante destacar que la ley argentina protege la porción legítima de los herederos forzosos (hijos, cónyuge, padres), por lo que no se puede disponer libremente de la totalidad del patrimonio.",
      "Contar con el asesoramiento de un abogado especializado en derecho sucesorio es crucial para redactar un testamento que sea legalmente válido y que refleje fielmente tus deseos. Un profesional te guiará sobre las opciones disponibles, los límites legales y las implicaciones de cada decisión, asegurando que tu patrimonio se transmita de forma ordenada y sin complicaciones para tus seres queridos. Es la mejor manera de dejar un legado de tranquilidad y evitar futuros litigios.",
    ],
  };

  const faqs = [
    {
      question: "¿Cuánto cuesta hacer un testamento?",
      answer: "La consulta inicial es $50.000 ARS. El testamento completo tiene costo según complejidad.",
    },
    {
      question: "¿Cuánto tiempo demora redactar un testamento?",
      answer: "Entre 7-15 días hábiles. Depende de la complejidad de tu patrimonio.",
    },
    {
      question: "¿Necesito comparecer presencialmente?",
      answer: "Sí, para la firma del testamento ante escribano. Podemos coordinar todo.",
    },
    {
      question: "¿Qué documentos necesito?",
      answer: "Documento de identidad, comprobante de domicilio, y listado de bienes.",
    },
    {
      question: "¿Puedo cambiar mi testamento después?",
      answer: "Sí, puedes hacer un nuevo testamento que revoque el anterior en cualquier momento.",
    },
    {
      question: "¿Qué pasa si no hago testamento?",
      answer: "Tu patrimonio se distribuye según la ley de sucesión intestada, sin tu voluntad.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Testamentos Online - Protección de Bienes y Voluntad"
      subtitle="Redacción de testamentos seguros para evitar conflictos familiares"
      
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
