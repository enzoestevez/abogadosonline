import LandingPageTemplate from "@/components/LandingPageTemplate";

export default function HereciasLanding() {
  const whyChooseItems = [
    "15 años de experiencia en herencias",
    "Consulta completamente confidencial",
    "Proceso rápido (tramitación en 30-60 días)",
    "Precio justo y transparente ($50.000 ARS consulta inicial)",
  ];

  const differentiator = "Diferencia entre sucesiones y herencias";
  const differentiatorContent = [
    "Herencia: El bien o patrimonio que se transmite",
    "Sucesión: El trámite legal para transferir la herencia",
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
      name: "Carlos Mendez",
      text: "Recuperé mi herencia que estaba retenida. Profesionales muy competentes.",
      result: "Herencia reclamada exitosamente",
    },
    {
      name: "Patricia Ruiz",
      text: "Excelente asesoramiento. Explicaron todo de forma clara y comprensible.",
      result: "Herencia de inmueble transferida",
    },
    {
      name: "Roberto Silva",
      text: "Recomendable 100%. Resolvieron mi caso en tiempo récord.",
      result: "Herencia de $300.000 en 40 días",
    },
  ];

  const miniBlogContent = {
    title: "Herencias en Argentina: ¿Cómo Reclamar lo que te Corresponde?",
    paragraphs: [
      "Una **herencia** es el conjunto de bienes, derechos y obligaciones que una persona deja al fallecer. Si buscas un **abogado de herencias online** para **tramitar herencia en Buenos Aires**, nuestro estudio ofrece soluciones eficientes. Reclamar una herencia puede ser un proceso complejo, especialmente si existen **conflictos de herencia**, falta de documentación o bienes en el extranjero. En Argentina, el proceso se inicia con la sucesión, que es el trámite legal para transferir esos bienes a los herederos legítimos.",
      "Es fundamental diferenciar entre herencia y sucesión. La herencia es el patrimonio en sí, mientras que la **sucesión** es el procedimiento judicial que permite a los herederos adquirir legalmente ese patrimonio. Un **abogado especializado en herencias** te guiará en cada paso, desde la recopilación de documentos (partida de defunción, testamento si lo hubiere, partidas de nacimiento que acrediten el vínculo) hasta la inscripción de los bienes a nombre de los nuevos propietarios. Ofrecemos **declaratoria de herederos virtual** para tu comodidad.",
      "Si tu herencia está retenida, hay bienes no declarados o existen desacuerdos familiares, la intervención de un profesional es crucial. Podemos mediar para alcanzar acuerdos, o iniciar las acciones legales necesarias para proteger tus derechos y asegurar que recibas lo que te corresponde. No dejes que la complejidad del proceso te impida acceder a tu patrimonio; un asesoramiento adecuado puede simplificar y acelerar el trámite.",
    ],
  };

  const faqs = [
    {
      question: "¿Cuánto cuesta reclamar una herencia?",
      answer: "La consulta inicial es $50.000 ARS. El costo total depende de la complejidad del reclamo.",
    },
    {
      question: "¿Cuánto tiempo demora reclamar una herencia?",
      answer: "Entre 30-60 días en promedio, dependiendo de la documentación y si hay oposición.",
    },
    {
      question: "¿Puedo reclamar una herencia si no tengo documentos?",
      answer: "Sí, podemos gestionar la obtención de documentos necesarios. Asesoramos en cada paso.",
    },
    {
      question: "¿Qué pasa si la herencia está retenida por otro heredero?",
      answer: "Podemos mediar o iniciar acciones legales para recuperar tu parte de la herencia.",
    },
    {
      question: "¿Puedo heredar si no hay testamento?",
      answer: "Sí, existe sucesión intestada. Los herederos se determinan por ley.",
    },
    {
      question: "¿Qué documentos necesito para reclamar?",
      answer: "Certificado de defunción, documento de identidad, comprobante de vínculo familiar, y documentos del bien.",
    },
  ];

  return (
    <LandingPageTemplate
      title="Abogado de Herencias Online - Tramitar Herencia en Buenos Aires"
      subtitle="Declaratoria de herederos virtual y resolución de conflictos de herencia"
      
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
