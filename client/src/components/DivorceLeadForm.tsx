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

interface DivorceLeadFormProps {
  consultationType?: string;
}

// Definir preguntas específicas por tipo de consulta
const consultationQuestions: Record<string, Array<{
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}>> = {
  divorcios: [
    {
      name: "type",
      label: "¿Qué tipo de divorcio necesitas?",
      options: [
        { value: "mutual", label: "Divorcio por mutuo acuerdo" },
        { value: "contested", label: "Divorcio contencioso" },
        { value: "express", label: "Divorcio exprés" }
      ]
    },
    {
      name: "children",
      label: "¿Tienes hijos menores?",
      options: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" }
      ]
    },
    {
      name: "assets",
      label: "¿Hay bienes para repartir?",
      options: [
        { value: "yes", label: "Sí, varios" },
        { value: "few", label: "Pocos bienes" },
        { value: "no", label: "No hay bienes" }
      ]
    }
  ],
  alimentos: [
    {
      name: "situation",
      label: "¿Cuál es tu situación?",
      options: [
        { value: "claim", label: "Reclamar pensión alimenticia" },
        { value: "modify", label: "Modificar pensión existente" },
        { value: "suspend", label: "Suspender/Eliminar pensión" }
      ]
    },
    {
      name: "children",
      label: "¿Cuántos hijos menores hay?",
      options: [
        { value: "one", label: "1 hijo" },
        { value: "two", label: "2 hijos" },
        { value: "more", label: "Más de 2 hijos" }
      ]
    },
    {
      name: "income",
      label: "¿Conoces el ingreso del obligado?",
      options: [
        { value: "yes", label: "Sí, aproximadamente" },
        { value: "no", label: "No, necesito investigar" },
        { value: "uncertain", label: "No estoy seguro" }
      ]
    }
  ],
  custodia: [
    {
      name: "type",
      label: "¿Qué tipo de custodia buscas?",
      options: [
        { value: "shared", label: "Custodia compartida" },
        { value: "exclusive", label: "Custodia exclusiva" },
        { value: "modify", label: "Modificar custodia existente" }
      ]
    },
    {
      name: "children",
      label: "¿Cuántos hijos menores hay?",
      options: [
        { value: "one", label: "1 hijo" },
        { value: "two", label: "2 hijos" },
        { value: "more", label: "Más de 2 hijos" }
      ]
    },
    {
      name: "agreement",
      label: "¿Hay acuerdo con el otro progenitor?",
      options: [
        { value: "yes", label: "Sí, hay acuerdo" },
        { value: "partial", label: "Acuerdo parcial" },
        { value: "no", label: "No hay acuerdo" }
      ]
    }
  ],
  inmobiliario: [
    {
      name: "issue",
      label: "¿Cuál es el problema inmobiliario?",
      options: [
        { value: "contract", label: "Revisión de contrato" },
        { value: "boleto", label: "Boleto de compraventa" },
        { value: "eviction", label: "Desalojo" },
        { value: "dispute", label: "Disputa de propiedad" }
      ]
    },
    {
      name: "stage",
      label: "¿En qué etapa está el conflicto?",
      options: [
        { value: "early", label: "Etapa temprana" },
        { value: "negotiation", label: "En negociación" },
        { value: "legal", label: "Ya en proceso legal" }
      ]
    },
    {
      name: "urgency",
      label: "¿Cuál es tu nivel de urgencia?",
      options: [
        { value: "immediate", label: "Inmediato" },
        { value: "soon", label: "Próximas semanas" },
        { value: "planning", label: "Planificación" }
      ]
    }
  ]
};

export default function DivorceLeadForm({ consultationType = "divorcios" }: DivorceLeadFormProps) {
  const questions = consultationQuestions[consultationType] || consultationQuestions.divorcios;
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
      divorcios: {
        title: "Diagnóstico de Divorcio",
        description: `Tipo: ${formData.type}, ${formData.children === "yes" ? "con hijos" : "sin hijos"}, ${formData.assets !== "no" ? "con bienes" : "sin bienes"}.`,
        requiredDocuments: [
          "Partida de matrimonio",
          "Documentos de identidad",
          "Comprobante de domicilio",
          formData.children === "yes" ? "Partidas de nacimiento de hijos" : "",
          "Documentos de bienes (si aplica)"
        ].filter(Boolean),
        nextSteps: [
          "1. Análisis de situación",
          "2. Negociación o preparación de demanda",
          "3. Presentación ante juzgado",
          "4. Trámite legal",
          "5. Sentencia de divorcio"
        ],
        importantNotes: [
          "Plazo estimado: 3-12 meses",
          "Protegemos tus derechos",
          "Asesoramiento integral en todo el proceso"
        ]
      },
      alimentos: {
        title: "Diagnóstico de Pensión Alimenticia",
        description: `Situación: ${formData.situation}, ${formData.children} menores, ingresos ${formData.income}.`,
        requiredDocuments: [
          "Partida de nacimiento de hijos",
          "Documentos de identidad",
          "Comprobante de ingresos",
          "Comprobante de gastos",
          "Información del obligado (si se conoce)"
        ],
        nextSteps: [
          "1. Cálculo de pensión",
          "2. Recopilación de pruebas",
          "3. Presentación de demanda",
          "4. Trámite judicial",
          "5. Sentencia y ejecución"
        ],
        importantNotes: [
          "Protegemos los derechos de los menores",
          "Cálculo justo según ingresos",
          "Seguimiento de cumplimiento"
        ]
      },
      custodia: {
        title: "Diagnóstico de Custodia de Hijos",
        description: `Tipo: ${formData.type}, ${formData.children} menores, acuerdo: ${formData.agreement}.`,
        requiredDocuments: [
          "Partida de nacimiento de hijos",
          "Documentos de identidad de ambos progenitores",
          "Comprobante de domicilio",
          "Información sobre vivienda",
          "Documentos escolares"
        ],
        nextSteps: [
          "1. Análisis de interés superior del menor",
          "2. Negociación de acuerdo",
          "3. Presentación ante juzgado",
          "4. Evaluación de capacidades",
          "5. Sentencia de custodia"
        ],
        importantNotes: [
          "Prioridad: bienestar del menor",
          "Custodia compartida es preferida",
          "Régimen de visitas justo"
        ]
      },
      inmobiliario: {
        title: "Diagnóstico de Conflicto Inmobiliario",
        description: `Problema: ${formData.issue}, etapa: ${formData.stage}, urgencia: ${formData.urgency}.`,
        requiredDocuments: [
          "Contrato de compraventa",
          "Boleto de compraventa",
          "Documentos de propiedad",
          "Comprobante de pagos",
          "Correspondencia relacionada"
        ],
        nextSteps: [
          "1. Análisis de documentos",
          "2. Evaluación de derechos",
          "3. Negociación o demanda",
          "4. Trámite legal",
          "5. Resolución"
        ],
        importantNotes: [
          "Protección de tu inversión",
          "Análisis completo de contratos",
          "Defensa de derechos inmobiliarios"
        ]
      }
    };

    return diagnoses[consultationType] || diagnoses.divorcios;
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
