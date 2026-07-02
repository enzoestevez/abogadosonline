import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
      name: "situation",
      label: "¿Cuál es la situación actual de los bienes?",
      options: [
        { value: "start", label: "Iniciar desde cero" },
        { value: "blocked", label: "Sucesión trabada" },
        { value: "conflict", label: "Conflicto entre herederos" }
      ]
    },
    {
      name: "hasWill",
      label: "¿Existe testamento?",
      options: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" }
      ]
    },
    {
      name: "heirs",
      label: "¿Cuántos herederos hay aproximadamente?",
      options: [
        { value: "one", label: "1 heredero" },
        { value: "few", label: "2-3 herederos" },
        { value: "many", label: "Más de 3 herederos" }
      ]
    }
  ],
  herencias: [
    {
      name: "situation",
      label: "¿Cuál es tu situación con la herencia?",
      options: [
        { value: "claim", label: "Reclamar mi parte" },
        { value: "defend", label: "Defender mis derechos" },
        { value: "dispute", label: "Resolver disputa" }
      ]
    },
    {
      name: "timeframe",
      label: "¿Hace cuánto tiempo falleció el causante?",
      options: [
        { value: "recent", label: "Menos de 1 año" },
        { value: "moderate", label: "1-5 años" },
        { value: "old", label: "Más de 5 años" }
      ]
    },
    {
      name: "assets",
      label: "¿Qué tipo de bienes hay en la herencia?",
      options: [
        { value: "property", label: "Inmuebles" },
        { value: "money", label: "Dinero/Cuentas" },
        { value: "mixed", label: "Varios tipos" }
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
      name: "complexity",
      label: "¿Cuál es la complejidad de tu patrimonio?",
      options: [
        { value: "simple", label: "Patrimonio simple" },
        { value: "moderate", label: "Patrimonio moderado" },
        { value: "complex", label: "Patrimonio complejo" }
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
        { value: "optimize", label: "Optimizar impuestos" },
        { value: "plan", label: "Planificar sucesión" }
      ]
    },
    {
      name: "assetType",
      label: "¿Qué tipo de activos tienes?",
      options: [
        { value: "real_estate", label: "Inmuebles" },
        { value: "business", label: "Negocio/Empresa" },
        { value: "mixed", label: "Varios tipos" }
      ]
    },
    {
      name: "urgency",
      label: "¿Cuál es tu nivel de urgencia?",
      options: [
        { value: "immediate", label: "Inmediato" },
        { value: "soon", label: "Próximos meses" },
        { value: "planning", label: "Planificación a largo plazo" }
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
    },
    {
      name: "complexity",
      label: "¿Necesitas estructura compleja?",
      options: [
        { value: "simple", label: "Estructura simple" },
        { value: "moderate", label: "Estructura moderada" },
        { value: "complex", label: "Estructura compleja" }
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
        description: `Basado en tu situación (${formData.situation}), ${formData.hasWill === "yes" ? "con testamento" : "sin testamento"}, con ${formData.heirs} herederos.`,
        requiredDocuments: [
          "Certificado de defunción",
          formData.hasWill === "yes" ? "Testamento original" : "Documentos de identidad",
          "Comprobante de domicilio",
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
          "Plazo estimado: 6-24 meses",
          "Se requiere asesoramiento especializado",
          "Costos varían según complejidad"
        ]
      },
      herencias: {
        title: "Diagnóstico de Herencia",
        description: `Tu situación: ${formData.situation}, con bienes de tipo ${formData.assets}.`,
        requiredDocuments: [
          "Certificado de defunción",
          "Documentos de identidad",
          "Documentos de los bienes",
          "Comprobante de vínculo hereditario"
        ],
        nextSteps: [
          "1. Análisis de derechos hereditarios",
          "2. Recopilación de pruebas",
          "3. Negociación o litigio",
          "4. Resolución y distribución"
        ],
        importantNotes: [
          "Protegemos tus derechos hereditarios",
          "Experiencia en conflictos familiares",
          "Asesoramiento integral"
        ]
      },
      testamentos: {
        title: "Diagnóstico de Testamento",
        description: `Necesitas ${formData.need} un testamento con patrimonio ${formData.complexity}.`,
        requiredDocuments: [
          "Identificación",
          "Documentos de bienes",
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
        description: `Tu objetivo: ${formData.goal}, con activos ${formData.assetType}.`,
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
        description: `Propósito: ${formData.purpose}, con bienes ${formData.assets}.`,
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
      
      // Enviar datos a Formspree
      const formspreeData = new FormData();
      formspreeData.append('name', formData.name || '');
      formspreeData.append('email', formData.email || '');
      formspreeData.append('phone', formData.phone || '');
      formspreeData.append('consultation_type', consultationType);
      formspreeData.append('diagnosis_title', result.title);
      formspreeData.append('diagnosis_description', result.description);
      formspreeData.append('required_documents', result.requiredDocuments.join(', '));
      formspreeData.append('next_steps', result.nextSteps.join(', '));
      formspreeData.append('important_notes', result.importantNotes.join(', '));
      
      // Agregar respuestas del formulario
      Object.entries(formData).forEach(([key, value]) => {
        if (!['name', 'email', 'phone'].includes(key)) {
          formspreeData.append(`answer_${key}`, value);
        }
      });

      // Enviar a Formspree
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'https://formspree.io/f/xnjkbryp';
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formspreeData,
      });

      if (response.ok) {
        setDiagnosis(result);
        toast.success("¡Diagnóstico generado y enviado por mail!");
        
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
      } else {
        setDiagnosis(result);
        toast.success("¡Diagnóstico generado! (Mail pendiente de configurar)");
        
        // Enviar evento de conversión a Google Ads incluso si falla el mail
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
      }
    } catch (error) {
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
