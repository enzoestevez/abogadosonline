import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function CuotaAlimentariaLanding() {
  const whyChooseItems = [
    "Experiencia en reclamos de cuota alimentaria",
    "Consulta completamente confidencial",
    "Defensa de derechos de alimentantes y alimentados",
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
      name: "situacion_cuota",
      label: "¿Cuál es tu situación?",
      type: "radio",
      required: true,
      options: [
        { value: "reclamar_cuota", label: "Reclamar cuota alimentaria" },
        { value: "modificar_cuota", label: "Modificar cuota existente" },
        { value: "incumplimiento", label: "Incumplimiento de pago" },
        { value: "cese_cuota", label: "Cese de cuota alimentaria" },
      ],
    },
    { name: "resumen_caso", label: "Dejanos un breve resumen de tu caso...", type: "textarea", required: true },
  ];

  const testimonials = [
    {
      name: "María García",
      text: "Excelente gestión en mi reclamo de cuota. Muy profesionales y atentos.",
      result: "Cuota alimentaria establecida",
    },
    {
      name: "Roberto Fernández",
      text: "Me asesoraron correctamente en la modificación de la cuota. Muy satisfecho.",
      result: "Cuota modificada favorablemente",
    },
    {
      name: "Laura Martínez",
      text: "Resolvieron mi situación de incumplimiento. Recomendable.",
      result: "Incumplimiento resuelto",
    },
  ];

  const miniBlogContent = {
    title: "Cuota Alimentaria: Garantizando el Sustento de los Menores",
    paragraphs: [
      "La **cuota alimentaria** es la obligación legal que tienen los padres de contribuir económicamente al sustento, educación y bienestar de sus hijos menores de edad. Se trata de una responsabilidad fundamental que busca garantizar que los menores cuenten con los recursos necesarios para vivir dignamente, independientemente de la situación marital o de convivencia de sus progenitores.",
      "La cuota alimentaria puede ser fijada de mutuo acuerdo entre los padres o determinada por un juez cuando no existe consenso. Su monto se calcula considerando diversos factores, como los ingresos de ambos progenitores, las necesidades del menor, el nivel de vida que tenía durante la convivencia, y otros gastos relacionados con educación, salud y desarrollo integral del niño.",
      "Un abogado especializado en cuota alimentaria te asistirá en el reclamo, modificación o defensa de tus derechos, ya sea como alimentante o alimentado. También te orientará en casos de incumplimiento de pago, buscando las mejores estrategias para asegurar que se cumpla con la obligación alimentaria establecida.",
    ],
  };

  const faqs = [
    {
      question: "¿Qué es la cuota alimentaria?",
      answer: "Es la obligación legal de un progenitor de contribuir económicamente al sustento de sus hijos menores.",
    },
    {
      question: "¿Cómo se calcula la cuota alimentaria?",
      answer: "Se considera los ingresos de ambos padres, necesidades del menor, y nivel de vida anterior.",
    },
    {
      question: "¿Cuánto cuesta una consulta sobre cuota alimentaria?",
      answer: "La consulta inicial es $50.000 ARS. El costo total depende de la complejidad del caso.",
    },
    {
      question: "¿Qué puedo hacer si el otro progenitor no paga?",
      answer: "Puedes iniciar un reclamo judicial por incumplimiento y solicitar medidas coercitivas.",
    },
    {
      question: "¿Se puede modificar la cuota alimentaria?",
      answer: "Sí, si cambian las circunstancias económicas o necesidades del menor.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Cuota Alimentaria"
      subtitle="Garantizando el Sustento de tus Hijos"
      whyChooseItems={whyChooseItems}
      differentiator="¿Por qué elegirnos?"
      differentiatorContent={[
        "Experiencia en reclamos y modificaciones de cuota alimentaria",
        "Defensa efectiva en casos de incumplimiento",
        "Asesoramiento integral sobre derechos y obligaciones",
        "Gestión ágil y resultados comprobados",
      ]}
      testimonials={testimonials}
      faqs={faqs}
      formTitle="Consulta sobre Cuota Alimentaria"
      formFields={formFields}
      consultationType="cuota_alimentaria"
      showCalendar={true}
      miniBlogContent={miniBlogContent}
    />
  );
}
