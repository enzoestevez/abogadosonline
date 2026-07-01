import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function InmobiliarioLanding() {
  const whyChooseItems = [
    "15 años de experiencia en derecho inmobiliario",
    "Consulta completamente confidencial",
    "Solución de conflictos garantizada",
    "Precio justo y transparente ($50.000 ARS consulta inicial)",
  ];

  const differentiator = "Casos que resolvemos:";
  const differentiatorContent = [
    "Problemas en compra-venta de inmueble",
    "Cláusulas injustas en contrato",
    "Conflictos de desalojo",
    "Reclamos de comprador/vendedor",
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
      name: "motivo_consulta",
      label: "¿Motivo de consulta?",
      type: "radio",
      required: true,
      options: [
        { value: "revision_contrato", label: "Revisión de contrato" },
        { value: "boleto_compraventa", label: "Boleto de compraventa" },
        { value: "desalojos", label: "Desalojos" },
        { value: "otros", label: "Otros" },
      ],
    },
    { name: "resumen_caso", label: "Dejanos un breve resumen de tu caso...", type: "textarea", required: true },
  ];

  const testimonials = [
    {
      name: "Karina Flores",
      text: "Excelente defensa. Resolvieron mi conflicto inmobiliario de forma rápida.",
      result: "Conflicto resuelto favorablemente",
    },
    {
      name: "Andrés Gutiérrez",
      text: "Muy profesionales. Me asesoraron correctamente en la compra de mi casa.",
      result: "Compra segura y sin problemas",
    },
    {
      name: "Lucía Sánchez",
      text: "Recomendable. Protegieron mis derechos como vendedora.",
      result: "Venta exitosa y segura",
    },
  ];

  const miniBlogContent = {
    title: "Derecho Inmobiliario: Protegiendo tus Inversiones y Propiedades",
    paragraphs: [
      "El **derecho inmobiliario** abarca todas las normativas y regulaciones relacionadas con la propiedad, compra, venta, alquiler y uso de bienes inmuebles. Si necesitas un **abogado inmobiliario** para la **revisión de contratos de alquiler**, **boleto de compraventa** o **asesoría en desalojos**, nuestro estudio te brinda la seguridad jurídica necesaria. Dada la magnitud de las transacciones y los valores involucrados, contar con asesoramiento legal especializado es fundamental para proteger tus intereses y evitar futuros conflictos.",
      "Ya sea que estés comprando tu primera vivienda, invirtiendo en propiedades comerciales, o enfrentando problemas con un contrato de alquiler o un desalojo, un abogado inmobiliario puede brindarte la seguridad jurídica necesaria. Esto incluye la revisión de títulos de propiedad, la redacción y negociación de contratos, la resolución de disputas entre vecinos o copropietarios, y la representación en juicios por vicios ocultos o incumplimientos contractuales.",
      "Los conflictos inmobiliarios pueden ser complejos y costosos si no se manejan adecuadamente. Desde la prevención, asegurando que todos los documentos estén en regla antes de una firma, hasta la intervención en litigios, un abogado experto te ayudará a navegar el marco legal, proteger tu patrimonio y garantizar que tus derechos como propietario, comprador o inquilino sean respetados. No dejes al azar la seguridad de tus bienes más valiosos.",
    ],
  };

  const faqs = [
    {
      question: "¿Cuánto cuesta una asesoría inmobiliaria?",
      answer: "La consulta inicial es $50.000 ARS. El costo total depende del tipo de conflicto.",
    },
    {
      question: "¿Cuánto tiempo demora resolver un conflicto inmobiliario?",
      answer: "Depende del tipo. Algunos se resuelven en 30 días, otros pueden tardar meses.",
    },
    {
      question: "¿Qué debo revisar antes de comprar un inmueble?",
      answer: "Título de propiedad, antecedentes legales, documentación municipal, y contrato.",
    },
    {
      question: "¿Puedo desistir de una compra ya firmada?",
      answer: "Depende del contrato. Asesoramos sobre opciones legales según tu situación.",
    },
    {
      question: "¿Qué es un desalojo?",
      answer: "Es un proceso legal para recuperar posesión de un inmueble ocupado sin derecho.",
    },
    {
      question: "¿Cómo protejo mis derechos como inquilino?",
      answer: "Con contrato claro, documentación de pagos, y asesoramiento legal preventivo.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Abogado Inmobiliario - Revisión de Contratos de Alquiler y Desalojos"
      subtitle="Asesoría en boleto de compraventa y conflictos de propiedad"
      
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
