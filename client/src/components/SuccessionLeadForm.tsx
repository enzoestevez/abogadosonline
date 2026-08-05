import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

interface FormData {
  [key: string]: string;
}

interface DiagnosisResult {
  title: string;
  description: string;
  requiredDocuments: string[];
  nextSteps: string[];
  importantNotes: string[];
}

interface SuccessionLeadFormProps {
  consultationType?: string;
}

// Definir preguntas específicas por tipo de consulta
const consultationQuestions: Record<string, Array<{
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}>> = {
  sucesiones: [
    {
      name: "hasWill",
      label: "¿Existe testamento?",
      options: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" }
      ]
    }
  ],
  testamentos: [
    {
      name: "need",
      label: "¿Qué necesitas hacer con tu testamento?",
      options: [
        { value: "create", label: "Crear uno nuevo" },
        { value: "modify", label: "Modificar existente" },
        { value: "validate", label: "Validar su legalidad" }
      ]
    },
    {
      name: "assets",
      label: "¿Qué bienes desea incluir en su planificación?",
      options: [
        { value: "one_property", label: "Un inmueble" },
        { value: "multiple_properties", label: "Varios inmuebles" },
        { value: "mixed_assets", label: "Inmuebles, vehículos e inversiones" },
        { value: "business", label: "Empresa o participación societaria" }
      ]
    },
    {
      name: "heirs",
      label: "¿Tienes herederos específicos en mente?",
      options: [
        { value: "yes", label: "Sí, ya los definí" },
        { value: "no", label: "No, necesito asesoramiento" },
        { value: "partial", label: "Tengo algunas ideas" }
      ]
    }
  ],
  patrimonial: [
    {
      name: "goal",
      label: "¿Cuál es tu objetivo principal?",
      options: [
        { value: "protect", label: "Proteger patrimonio" },
        { value: "plan", label: "Planificar sucesión" }
      ]
    },
    {
      name: "assets",
      label: "¿Qué bienes desea incluir en su planificación?",
      options: [
        { value: "real_estate", label: "Inmuebles" },
        { value: "business", label: "Empresa o participación societaria" },
        { value: "investments", label: "Inversiones, cuentas o ahorros" },
        { value: "mixed", label: "Un patrimonio con distintos tipos de bienes" }
      ]
    }
  ],
  fideicomisos: [
    {
      name: "purpose",
      label: "¿Cuál es el propósito del fideicomiso?",
      options: [
        { value: "inheritance", label: "Planificar herencia" },
        { value: "business", label: "Estructura empresarial" },
        { value: "protection", label: "Protección de bienes" }
      ]
    },
    {
      name: "assets",
      label: "¿Qué bienes incluirías?",
      options: [
        { value: "property", label: "Inmuebles" },
        { value: "shares", label: "Acciones/Participaciones" },
        { value: "mixed", label: "Varios tipos" }
      ]
    }
  ]
};

export default function SuccessionLeadForm({ consultationType = "sucesiones" }: SuccessionLeadFormProps) {
  const questions = consultationQuestions[consultationType] || consultationQuestions.sucesiones;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [, navigate] = useLocation();
  const submitSuccessionMutation = trpc.forms.submitSuccession.useMutation();
  const saveDiagnosticMutation = trpc.forms.saveDiagnosticAndEmail.useMutation();

  const totalSteps = questions.length + 1; // +1 para datos de contacto
  const progressPercentage = (step / totalSteps) * 100;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === totalSteps) {
      return formData.name?.trim() !== "" && formData.email?.trim() !== "" && formData.phone?.trim() !== "";
    }
    if (currentStep <= questions.length) {
      const question = questions[currentStep - 1];
      return formData[question.name] !== "";
    }
    return true;
  };

  const generateDiagnosis = (): DiagnosisResult => {
    const diagnoses: Record<string, DiagnosisResult> = {
      sucesiones: {
        title: "Diagnóstico de Sucesión",
        description: `${formData.hasWill === "yes" ? "Según su situación, al existir un testamento, será necesario analizar la validez y el alcance del mismo, así como verificar si sus disposiciones respetan las porciones de distribución de bienes legalmente protegidas. En la consulta evaluaremos cómo ello impacta en la sucesión. El procedimiento es iniciar una sucesión testamentaria a fin de que se declare válido el mismo." : "Según su situación, al no existir testamento, será necesario analizar quiénes tienen derecho a heredar, el vínculo con el causante (persona fallecida), los bienes que integran la herencia y la forma en que ésta se distribuirá conforme a la ley. El procedimiento es iniciar una sucesión ab-intestato."}`,
        requiredDocuments: [
          "Certificado de defunción",
          formData.hasWill === "yes" ? "Testamento original" : "Documentos de identidad",
          "Certificados de Nacimiento y Matrimonio en caso de estar casado el causante",
          "Documentos de bienes"
        ],
        nextSteps: [
          "1. Recopilar documentación",
          "2. Presentar solicitud ante juzgado",
          "3. Notificación a herederos",
          "4. Inventario y avalúo",
          "5. Distribución de bienes"
        ],
        importantNotes: [
          "Plazo estimado: 3 meses hasta la Declaratoria de Herederos. Distribución dependerá del acuerdo o no entre los herederos",
          "Se requiere asesoramiento especializado",
          "Costos varían según complejidad"
        ]
      },
      testamentos: {
        title: "Diagnóstico de Testamento",
        description: `${
          formData.need === "create"
            ? "La elaboración de un testamento permite organizar anticipadamente la transmisión de su patrimonio y brindar mayor seguridad jurídica a sus herederos y beneficiarios."
            : formData.need === "modify"
            ? "El testamento puede modificarse o incluso revocarse, total o parcialmente, mientras el testador conserve su capacidad. Durante la consulta analizaremos las disposiciones testamentarias vigentes y los cambios que desea realizar para que reflejen su voluntad y se adecuen a su situación familiar y patrimonial actual."
            : "Realizaremos un análisis jurídico del testamento para verificar su validez, su alcance y si sus disposiciones cumplen con los requisitos previstos por la legislación vigente."
        }`,
        requiredDocuments: formData.need === "modify" ? [
          "Datos del testador",
          "Testamento en caso de existir uno previo",
          "Información de herederos y beneficiarios",
          "Información de bienes"
        ] : [
          "Identificación",
          "Certificados de Nacimiento y Matrimonio en caso de estar casado el causante",
          "Información de herederos",
          "Datos de beneficiarios"
        ],
        nextSteps: [
          "1. Consulta inicial",
          "2. Redacción del testamento",
          "3. Revisión legal",
          "4. Firma ante escribano"
        ],
        importantNotes: [
          "Testamento legal y válido",
          "Protege a tus herederos",
          "Evita conflictos futuros"
        ]
      },
      patrimonial: {
        title: "Diagnóstico de Planificación Patrimonial",
        description: `Señún sus respuestas, será necesario realizar un análisis integral de su situación patrimonial, familiar y de sus objetivos, a fin de diseñar una estrategia jurídica que proteja su patrimonio y le permita planificar su transmisión de manera segura y eficiente. ${
          formData.goal === "protect"
            ? "La protección patrimonial permite organizar sus bienes para reducir riesgos jurídicos y brindar mayor seguridad a su patrimonio y a su familia. Durante la consulta evaluaremos las herramientas legales más adecuadas para su situación."
            : "La planificación sucesoria permite anticipar la transmisión del patrimonio, reducir futuros conflictos y organizar la distribución de los bienes de acuerdo con sus objetivos y la normativa aplicable."
        } ${
          formData.assets === "real_estate"
            ? "Será necesario analizar la situación jurídica de sus inmuebles y determinar la estrategia patrimonial más conveniente para su administración, protección o futura transmisión."
            : formData.assets === "business"
            ? "Cuando el patrimonio incluye una empresa o actividad comercial, resulta conveniente planificar su continuidad y la forma en que será administrada o transmitida en el futuro."
            : formData.assets === "investments"
            ? "Al contar con inversiones, cuentas o ahorros, será importante evaluar la mejor forma de administrar y proteger estos activos, así como planificar su transmisión."
            : "Al contar con distintos tipos de activos, será recomendable realizar una planificación patrimonial integral que contemple la protección, administración y transmisión de cada uno de ellos."
        }`,
        requiredDocuments: [
          "Inventario de bienes",
          "Documentos de propiedad",
          "Estados financieros",
          "Información fiscal"
        ],
        nextSteps: [
          "1. Análisis patrimonial completo",
          "2. Evaluación fiscal",
          "3. Diseño de estrategia",
          "4. Implementación"
        ],
        importantNotes: [
          "Optimización fiscal",
          "Protección de patrimonio",
          "Planificación sucesoria"
        ]
      },
      fideicomisos: {
        title: "Diagnóstico de Fideicomiso",
        description: `Señún sus respuestas, será necesario analizar su situación patrimonial y los objetivos que desea alcanzar para determinar si el fideicomiso constituye la herramienta jurídica más adecuada y definir la estructura que mejor se adapte a sus necesidades. ${
          formData.purpose === "inheritance"
            ? "El fideicomiso puede ser una herramienta útil para organizar la transmisión del patrimonio, brindar mayor previsibilidad y reducir futuros conflictos entre los beneficiarios. Durante la consulta evaluaremos si resulta la alternativa más conveniente para su caso."
            : formData.purpose === "business"
            ? "Cuando el patrimonio incluye una actividad empresarial, el fideicomiso puede facilitar la organización, administración y continuidad del negocio. Analizaremos la estructura jurídica más adecuada según sus objetivos."
            : "El fideicomiso puede ofrecer una herramienta eficaz para organizar y proteger determinados bienes, siempre dentro de los límites previstos por la legislación vigente. Durante la consulta evaluaremos su viabilidad según su situación patrimonial."
        } ${
          formData.assets === "property"
            ? "Será necesario analizar la situación jurídica de los inmuebles y determinar la conveniencia de incorporarlos al fideicomiso de acuerdo con los objetivos planteados."
            : formData.assets === "shares"
            ? "Cuando el patrimonio comprende acciones o participaciones societarias, será importante evaluar la estructura societaria y la forma más adecuada de incorporarlas al fideicomiso."
            : "Al incluir distintos tipos de bienes, será recomendable realizar un análisis integral para definir una estructura fiduciaria que contemple adecuadamente cada activo."
        }`,
        requiredDocuments: [
          "Documentos de bienes",
          "Identificación de partes",
          "Comprobante de domicilio",
          "Información financiera"
        ],
        nextSteps: [
          "1. Análisis de viabilidad",
          "2. Diseño de estructura",
          "3. Redacción de acta",
          "4. Constitución del fideicomiso"
        ],
        importantNotes: [
          "Estructura legal segura",
          "Protección de patrimonio",
          "Gestión profesional"
        ]
      }
    };

    return diagnoses[consultationType] || diagnoses.sucesiones;
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      toast.error("Por favor completa este campo");
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (!acceptedTerms) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = generateDiagnosis();
      
      // Guardar diagnóstico en localStorage para mostrar en página de gracias
      localStorage.setItem('currentDiagnostic', JSON.stringify(result));
      
      // Enviar evento de conversión a Google Ads
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          'value': 0,
          'currency': 'ARS',
          'lead_type': consultationType,
          'client_name': formData.name,
          'client_email': formData.email,
          'client_phone': formData.phone
        });
      }

      // Guardar diagnóstico en BD (legacy)
      await submitSuccessionMutation.mutateAsync({
        hasWill: formData.hasWill || 'no_especificado',
        deceasedType: formData.deceasedType || 'no_especificado',
        maritalStatus: formData.maritalStatus || 'no_especificado',
        hasChildren: formData.hasChildren || 'no_especificado',
        heirstAgreement: formData.heirstAgreement || 'no_especificado',
        heirName: formData.name || '',
        heirEmail: formData.email || '',
        heirPhone: formData.phone || '',
        diagnosis: JSON.stringify(result),
      });

      setDiagnosis(result);
      toast.success("¡Diagnóstico generado y enviado por mail!");
      
      // Redirigir a página de agradecimiento inmediatamente
      navigate('/gracias-diagnostico');
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al generar el diagnóstico");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (diagnosis) {
    return (
      <Card className="w-full">
        <CardHeader className="bg-green-50 border-b border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <CardTitle className="text-green-900">{diagnosis.title}</CardTitle>
              <CardDescription className="text-green-700 mt-1">{diagnosis.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Documentos Requeridos
            </h3>
            <ul className="space-y-2">
              {diagnosis.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Próximos Pasos</h3>
            <ol className="space-y-2">
              {diagnosis.nextSteps.map((step, idx) => (
                <li key={idx} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Notas Importantes</h3>
            <ul className="space-y-1">
              {diagnosis.importantNotes.map((note, idx) => (
                <li key={idx} className="text-sm text-blue-800">
                  • {note}
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={() => {
              setDiagnosis(null);
              setStep(1);
              setFormData({});
            }}
            className="w-full"
            variant="outline"
          >
            Hacer otro diagnóstico
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step <= questions.length) {
    const question = questions[step - 1];
    return (
      <Card className="w-full">
        <CardHeader>
          <Progress value={progressPercentage} className="mb-4" />
          <CardTitle>Pregunta {step} de {questions.length}</CardTitle>
          <CardDescription>{question.label}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option.value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={question.name}
                  value={option.value}
                  checked={formData[question.name] === option.value}
                  onChange={(e) => handleInputChange(question.name, e.target.value)}
                  className="w-4 h-4"
                />
                <span className="ml-3 text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePrev}
              variant="outline"
              disabled={step === 1}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === totalSteps) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Progress value={progressPercentage} className="mb-4" />
          <CardTitle>Tus Datos de Contacto</CardTitle>
          <CardDescription>Para enviarte el diagnóstico y asesoramiento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre Completo</label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+54 9 11 1234-5678"
            />
          </div>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="ml-3 text-sm text-gray-700">
              Acepto recibir asesoramiento y aceptó los términos de privacidad
            </span>
          </label>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePrev}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Procesando..." : "Obtener Diagnóstico"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
