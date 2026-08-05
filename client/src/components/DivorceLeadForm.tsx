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
        { value: "uncertain", label: "No estoy seguro, necesito asesoramiento" }
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
  inmobiliario: [
    {
      name: "advice",
      label: "¿En qué necesita asesoramiento inmobiliario?",
      options: [
        { value: "contract_review", label: "Revisión de contrato" },
        { value: "purchase", label: "Compraventa de un inmueble" },
        { value: "eviction", label: "Desalojo" },
        { value: "usurpation", label: "Usurpación o recuperación de un inmueble" },
        { value: "possession", label: "Posesión, prescripción adquisitiva (usucapión) o conflictos de dominio" },
        { value: "titling", label: "Escrituración o regularización de títulos" }
      ]
    }
  ],
  cuota_alimentaria: [
    {
      name: "situation",
      label: "¿Cuál es tu situación?",
      options: [
        { value: "reclaim", label: "Reclamar cuota alimentaria" },
        { value: "modify", label: "Modificar cuota existente" },
        { value: "non_payment", label: "Incumplimiento de pago" },
        { value: "cessation", label: "Cese de cuota alimentaria" }
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
  const [, navigate] = useLocation();
  const submitDivorceMutation = trpc.forms.submitDivorce.useMutation();
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
      divorcios: {
        title: "Diagnóstico de Divorcio",
        description: `Señún sus respuestas, será necesario analizar las particularidades de su situación familiar y patrimonial para determinar el procedimiento más adecuado y los aspectos que deberán resolverse durante el proceso de divorcio. ${
          formData.type === "mutual"
            ? "Al existir acuerdo entre las partes, el proceso suele ser más ágil. Durante la consulta analizaremos los términos del convenio, incluyendo el cuidado de los hijos, los alimentos, el régimen de comunicación y la distribución de los bienes, en caso de corresponder."
            : formData.type === "contested"
            ? "Al no existir acuerdo entre las partes, será necesario evaluar los puntos en conflicto y definir la estrategia jurídica más adecuada para proteger sus derechos durante el proceso judicial."
            : "Si ambas partes están de acuerdo en divorciarse y pueden resolver los aspectos legales necesarios, evaluaremos su caso para determinar el procedimiento más adecuado."
        } ${
          formData.children === "yes"
            ? "Cuando existen hijos menores de edad, será necesario analizar las cuestiones relacionadas con el cuidado personal, el régimen de comunicación y la cuota alimentaria, procurando siempre proteger su interés superior."
            : "Al no existir hijos menores de edad, el proceso se centrará en los aspectos patrimoniales y en los acuerdos o cuestiones que deban resolverse entre los cónyuges."
        } ${
          formData.assets === "yes"
            ? "Será necesario analizar la composición del patrimonio y determinar la forma en que corresponderá su distribución o liquidación, de acuerdo con el régimen patrimonial aplicable y las circunstancias del caso."
            : formData.assets === "few"
            ? "Aunque el patrimonio sea reducido, será importante evaluar la titularidad de los bienes y la forma más conveniente de resolver su distribución durante el proceso de divorcio."
            : "Al no existir bienes para distribuir, el proceso podrá centrarse en las demás cuestiones personales o familiares que deban resolverse, según las particularidades de su caso."
        }`,
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
      inmobiliario: {
        title: "Diagnóstico de Derecho Inmobiliario y Registral",
        description: `${
          formData.advice === "contract_review"
            ? "La revisión preventiva de contratos permite identificar riesgos jurídicos y brindar mayor seguridad antes de asumir obligaciones o firmar un acuerdo."
            : formData.advice === "purchase"
            ? "La compraventa de un inmueble requiere un análisis jurídico previo para verificar la situación del bien y brindar mayor seguridad durante la operación."
            : formData.advice === "eviction"
            ? "Será necesario analizar la situación del inmueble y el vínculo existente con el ocupante para determinar la vía legal más adecuada para recuperar su posesión."
            : formData.advice === "usurpation"
            ? "Cuando un inmueble ha sido ocupado sin autorización, resulta fundamental evaluar los antecedentes del caso para determinar las acciones legales más adecuadas para proteger sus derechos y recuperar la posesión."
            : formData.advice === "possession"
            ? "Será necesario analizar los antecedentes de la posesión, la documentación disponible y las circunstancias del caso para evaluar la viabilidad de una acción de usucapión o la defensa de sus derechos sobre el inmueble."
            : "Analizaremos la situación jurídica del inmueble para determinar los pasos necesarios para regularizar su titularidad y brindar mayor seguridad jurídica sobre el bien."
        }`,
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
      },
      cuota_alimentaria: {
        title: "Diagnóstico de Cuota Alimentaria",
        description: `${
          formData.situation === "reclaim"
            ? "La cuota alimentaria es la obligación legal de contribuir económicamente al sustento de los hijos menores. Analizaremos tu situación para determinar los montos adecuados y el procedimiento más eficiente para reclamar."
            : formData.situation === "modify"
            ? "La modificación de cuota alimentaria procede cuando cambian las circunstancias económicas o las necesidades del menor. Evaluaremos los nuevos parámetros para solicitar el ajuste correspondiente."
            : formData.situation === "non_payment"
            ? "El incumplimiento de pago de cuota alimentaria es un incumplimiento de obligación legal. Disponemos de herramientas judiciales para exigir el cumplimiento y obtener medidas coercitivas si es necesario."
            : "El cese de cuota alimentaria procede cuando se cumplen determinadas condiciones legales. Analizaremos tu caso para determinar si es procedente y los pasos a seguir."
        }`,
        requiredDocuments: [
          "Documentos de identidad",
          "Comprobante de ingresos",
          "Sentencia de divorcio o acuerdo de separación",
          "Documentación de cuota actual (si existe)",
          "Comprobantes de pago o incumplimiento"
        ],
        nextSteps: [
          "1. Análisis de la situación",
          "2. Cálculo de cuota adecuada",
          "3. Negociación o demanda",
          "4. Trámite judicial",
          "5. Resolución y cumplimiento"
        ],
        importantNotes: [
          "Obligación legal de ambos progenitores",
          "Protección de derechos del menor",
          "Herramientas legales para exigir cumplimiento"
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
      await submitDivorceMutation.mutateAsync({
        hasChildren: formData.hasChildren || 'no_especificado',
        childrenAges: formData.childrenAges || 'no_especificado',
        hasAssets: formData.hasAssets || 'no_especificado',
        contactName: formData.name || '',
        contactEmail: formData.email || '',
        contactPhone: formData.phone || '',
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
