import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  hasChildren: string;
  childrenAges: string;
  hasAssets: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

interface DiagnosisResult {
  processType: string;
  costInfo: string;
  nextSteps: string[];
  importantNotes: string[];
}

export default function DivorceLeadForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    hasChildren: "",
    childrenAges: "",
    hasAssets: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;
  const progressPercentage = (step / totalSteps) * 100;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        if (!formData.hasChildren) {
          toast.error("Por favor selecciona si tienen hijos");
          return false;
        }
        return true;

      case 2:
        if (formData.hasChildren === "yes" && !formData.childrenAges) {
          toast.error("Por favor selecciona la edad de los hijos");
          return false;
        }
        return true;

      case 3:
        if (!formData.hasAssets) {
          toast.error("Por favor indica si hay bienes a dividir");
          return false;
        }
        return true;

      case 4:
        const result = generateDiagnosis();
        setDiagnosis(result);
        return true;

      case 5:
        if (!formData.contactName.trim()) {
          toast.error("Por favor ingresa tu nombre");
          return false;
        }
        if (!formData.contactEmail.trim() || !formData.contactEmail.includes("@")) {
          toast.error("Por favor ingresa un email válido");
          return false;
        }
        if (!formData.contactPhone.trim()) {
          toast.error("Por favor ingresa tu teléfono");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const generateDiagnosis = (): DiagnosisResult => {
    const hasChildren = formData.hasChildren === "yes";
    const childrenAges = formData.childrenAges;
    const hasAssets = formData.hasAssets === "yes";

    let nextSteps: string[] = [];
    let importantNotes: string[] = [];

    // Pasos generales
    nextSteps = [
      "1. Agendar consulta inicial para analizar documentación",
      "2. Recopilar información sobre bienes y deudas",
      "3. Preparar demanda de divorcio",
      "4. Presentar ante tribunal de familia",
      "5. Notificación a la otra parte",
      "6. Audiencia de conciliación",
      "7. Sentencia de divorcio",
    ];

    // Notas importantes
    importantNotes = [
      "Costo del trámite de divorcio: 40 JUS (se puede acordar plan de pagos)",
      "El convenio sobre hijos y división de bienes es un trámite aparte",
    ];

    if (hasChildren) {
      if (childrenAges === "minor") {
        importantNotes.push(
          "Tendrás que acordar régimen de tenencia, visitas y alimentos con la otra parte"
        );
        importantNotes.push(
          "Si no hay acuerdo, el tribunal decidirá en el interés superior del niño"
        );
      } else if (childrenAges === "adult") {
        importantNotes.push("Los hijos mayores de edad no requieren acuerdos de tenencia");
      } else if (childrenAges === "mixed") {
        importantNotes.push(
          "Algunos hijos requieren acuerdo de tenencia, otros no. Esto puede complicar el proceso"
        );
      }
    }

    if (hasAssets) {
      importantNotes.push(
        "Se debe dividir la ganancia de la sociedad conyugal (50% cada uno)"
      );
      importantNotes.push(
        "Los bienes propios se dividen según lo acordado o lo que determine el tribunal"
      );
    }

    return {
      processType: "Divorcio en Provincia de Buenos Aires",
      costInfo: "40 JUS (se puede acordar plan de pagos)",
      nextSteps,
      importantNotes,
    };
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log("Form data:", formData);
      console.log("Diagnosis:", diagnosis);

      toast.success(
        "¡Solicitud enviada exitosamente! Te contactaremos para coordinar la entrevista."
      );

      setStep(1);
      setFormData({
        hasChildren: "",
        childrenAges: "",
        hasAssets: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
      });
      setDiagnosis(null);
    } catch (error) {
      toast.error("Error al enviar el formulario. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Diagnóstico de Divorcio</CardTitle>
            <CardDescription className="text-red-100">
              Responde algunas preguntas para recibir un análisis personalizado de tu situación
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Paso {step} de {totalSteps}
                </span>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Step 1: ¿Tienen hijos? */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">¿Tienen hijos?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Esta información es importante para determinar los acuerdos necesarios
                </p>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="hasChildren"
                      value="yes"
                      checked={formData.hasChildren === "yes"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">Sí, tenemos hijos</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="hasChildren"
                      value="no"
                      checked={formData.hasChildren === "no"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">No, no tenemos hijos</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Edad de los hijos */}
            {step === 2 && formData.hasChildren === "yes" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">¿Cuál es la edad de los hijos?</h3>
                <select
                  name="childrenAges"
                  value={formData.childrenAges}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecciona la edad</option>
                  <option value="minor">Todos menores de edad</option>
                  <option value="adult">Todos mayores de edad</option>
                  <option value="mixed">Algunos menores y otros mayores</option>
                </select>
              </div>
            )}

            {/* Step 2: No tiene hijos - pasar al siguiente */}
            {step === 2 && formData.hasChildren === "no" && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    Sin hijos, el proceso es más simple. Continuemos con la siguiente pregunta.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: ¿Hay bienes? */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">¿Hay bienes a dividir?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Incluye inmuebles, vehículos, cuentas bancarias, inversiones, etc.
                </p>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="hasAssets"
                      value="yes"
                      checked={formData.hasAssets === "yes"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">Sí, hay bienes importantes</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="hasAssets"
                      value="no"
                      checked={formData.hasAssets === "no"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">No, pocos o ningún bien</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Diagnóstico */}
            {step === 4 && diagnosis && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tu Análisis Personalizado</h3>

                {/* Tipo de proceso */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Tipo de Proceso</p>
                  <p className="text-2xl font-bold text-red-900">{diagnosis.processType}</p>
                </div>

                {/* Costos */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                    Costo del Trámite
                  </p>
                  <p className="text-lg font-semibold text-yellow-900">{diagnosis.costInfo}</p>
                </div>

                {/* Notas importantes */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    Información Importante
                  </h4>
                  <ul className="space-y-2">
                    {diagnosis.importantNotes.map((note, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Próximos pasos */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Próximos Pasos</h4>
                  <ol className="space-y-2">
                    {diagnosis.nextSteps.map((step, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="font-semibold text-red-600 min-w-fit">{idx + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Step 5: Datos de contacto */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900">
                    <strong>Consulta Inicial:</strong> 2 JUS con análisis de documentación
                  </p>
                  <p className="text-xs text-blue-800 mt-2">
                    Si deseas agendar una consulta, completa tus datos de contacto para que coordinemos una entrevista.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800">Tus Datos de Contacto</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+54 9 11 XXXX-XXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* Botones de Navegación */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-900 hover:bg-red-800"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
