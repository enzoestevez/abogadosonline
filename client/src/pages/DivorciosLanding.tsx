import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function DivorciosLanding() {
  const whyChooseItems = [
    "15 años de experiencia en divorcios",
    "Consulta completamente confidencial",
    "Tramitación rápida y segura",
    "Precio justo y transparente ($50.000 ARS consulta inicial)",
  ];

  const differentiator = "Dividimos en dos caminos:";
  const differentiatorContent = [
    "Divorcio Colaborativo (acuerdo mutuo) - Más rápido",
    "Divorcio Contencioso (juicio) - Si hay desacuerdo",
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
      name: "tramite_necesitas",
      label: "¿Qué trámite necesitas?",
      type: "radio",
      required: true,
      options: [
        { value: "mutuo_acuerdo", label: "Divorcio mutuo acuerdo" },
        { value: "expres_contencioso", label: "Divorcio exprés contencioso" },
        { value: "alimentos_custodia", label: "Alimentos o Custodia" },
      ],
    },
    { name: "resumen_caso", label: "Dejanos un breve resumen de tu caso...", type: "textarea", required: true },
  ];

  const testimonials = [
    {
      name: "Gabriela Torres",
      text: "Excelente atención. Resolvieron mi divorcio de forma rápida y discreta.",
      result: "Divorcio resuelto en 60 días",
    },
    {
      name: "Martín López",
      text: "Muy profesionales. Protegieron mis derechos y los de mis hijos.",
      result: "Custodia y alimentos asegurados",
    },
    {
      name: "Sofía Rodríguez",
      text: "Recomendable. Tramitación colaborativa sin conflictos.",
      result: "Divorcio amigable y rápido",
    },
  ];

  const miniBlogContent = {
    title: "Divorcio en Argentina: Guía Completa para una Separación Legal",
    paragraphs: [
      "El **divorcio online rápido** es el proceso legal que disuelve el vínculo matrimonial, permitiendo a las personas rehacer sus vidas de forma independiente. En Argentina, el Código Civil y Comercial de la Nación simplificó el trámite, eliminando la necesidad de expresar causas y permitiendo el divorcio a solicitud de uno o ambos cónyuges, sin un plazo mínimo de matrimonio. Ofrecemos **consulta legal por Zoom o WhatsApp** para tu comodidad.",
      "Existen principalmente dos vías para el divorcio: el divorcio de común acuerdo (o colaborativo) y el divorcio contencioso. El primero es más rápido y económico, ya que los cónyuges presentan una propuesta de convenio regulador que abarca la atribución del hogar, la distribución de bienes, la compensación económica, y todo lo relativo a los hijos (responsabilidad parental, alimentos, régimen de comunicación). Si hay acuerdo, el proceso puede resolverse en pocos meses.",
      "Cuando no hay acuerdo, se recurre al divorcio contencioso, que implica un litigio judicial donde un juez decide sobre los puntos de desacuerdo. Este proceso es más largo, costoso y emocionalmente desgastante. En ambos casos, la asistencia de un abogado especializado es fundamental para proteger tus derechos, asegurar un proceso justo y obtener el mejor resultado posible para tu futuro y el de tu familia.",
    ],
  };

  const faqs = [
    {
      question: "¿Cuánto cuesta un divorcio?",
      answer: "La consulta inicial es $50.000 ARS. El costo total depende si es colaborativo o contencioso.",
    },
    {
      question: "¿Cuánto tiempo demora un divorcio?",
      answer: "Divorcio colaborativo: 30-60 días. Divorcio contencioso: 6-12 meses.",
    },
    {
      question: "¿Qué pasa con los hijos en un divorcio?",
      answer: "Se define custodia, régimen de visitas y alimentos según el mejor interés del niño.",
    },
    {
      question: "¿Cómo se dividen los bienes?",
      answer: "Se dividen según el régimen matrimonial (gananciales o separación de bienes).",
    },
    {
      question: "¿Puedo hacer un divorcio sin abogado?",
      answer: "Legalmente sí, pero recomendamos asesoramiento para proteger tus derechos.",
    },
    {
      question: "¿Qué documentos necesito?",
      answer: "Certificado de matrimonio, documento de identidad, y documentos de bienes.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Divorcio Online Rápido - Mutuo Acuerdo y Contencioso"
      subtitle="Pensión alimenticia, custodia de hijos y cuidado personal"
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
