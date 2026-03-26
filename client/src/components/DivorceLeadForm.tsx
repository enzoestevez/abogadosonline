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

  const totalSteps = 5;
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

      case 5:
        // Diagnóstico ya debe estar generado
        return true;

      default:
        return true;
    }
  };

  const generateDiagnosis = (): DiagnosisResult => {
    const hasChildren = formData.hasChildren === "yes";
    const childrenAges = formData.childrenAges;
    const hasAssets = formData.hasAssets === "yes";

    let processType = "Divorcio por Presentación Conjunta";
    let costInfo = "Costo del trámite: 40 JUS (Se puede acordar plan de pagos)";
    let nextSteps: string[] = [];
    let importantNotes: string[] = [];

    nextSteps = [
      "1. Presentar demanda de divorcio ante el Juzgado de Familia",
      "2. Notificar a la otra parte",
      "3. Si hay acuerdo: obtener sentencia en 30-60 días",
      "4. Si no hay acuerdo: litigio (6-12 meses)",
      "5. Convenio sobre hijos y división de bienes (trámite aparte)",
      "6. Inscripción en el Registro Civil",
    ];

    if (hasChildren) {
      importantNotes.push(
        "El convenio sobre tenencia, régimen de visitas y alimentos es un trámite APARTE del divorcio"
      );

      if (childrenAges === "minors") {
        importantNotes.push(
          "Con hijos menores: se requiere aprobación judicial del convenio de tenencia y alimentos"
        );
      } else if (childrenAges === "adults") {
        importantNotes.push("Con hijos mayores: solo se requiere acuerdo sobre alimentos si corresponde");
      } else if (childrenAges === "mixed") {
        importantNotes.push(
          "Con hijos de diferentes edades: se requiere acuerdo diferenciado según edad de cada hijo"
        );
      }
    }

    if (hasAssets) {
      importantNotes.push(
        "La división de bienes es un trámite APARTE del divorcio y se resuelve mediante acuerdo o litigio"
      );
      importantNotes.push(
        "Se deben identificar bienes gananciales (adquiridos durante el matrimonio) y bienes propios"
      );
    }

    importantNotes.push(
      "En Provincia de Buenos Aires: el divorcio tiene costo de 40 JUS, el cual puede pagarse en cuotas"
    );
    importantNotes.push(
      "Consulta inicial: 2 JUS con análisis de documentación y estrategia personalizada"
    );

    return {
      processType,
      costInfo,
      nextSteps,
      importantNotes,
    };
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step === 4) {
      const newDiagnosis = generateDiagnosis();
      setDiagnosis(newDiagnosis);
      setStep(5);
    } else if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      toast.success("¡Gracias! Nos contactaremos pronto para coordinar tu consulta.");
      setTimeout(() => {
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
      }, 2000);
    } catch (error) {
      toast.error("Error al enviar el formulario. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardTitle>Diagnóstico de Divorcio</CardTitle>
          <CardDescription className="text-white/80">
            Paso {step} de {totalSteps}
          </CardDescription>
          <Progress value={progressPercentage} className="mt-4 h-2" />
        </CardHeader>

        <CardContent className="pt-8">
          {/* Step 1: ¿Tienen hijos? */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Tienen hijos en común?
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="hasChildren"
                    value="yes"
                    checked={formData.hasChildren === "yes"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Sí, tenemos hijos</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="hasChildren"
                    value="no"
                    checked={formData.hasChildren === "no"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">No, no tenemos hijos</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Edad de los hijos */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Cuál es la edad de los hijos?
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="childrenAges"
                    value="minors"
                    checked={formData.childrenAges === "minors"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Todos menores de 18 años</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="childrenAges"
                    value="adults"
                    checked={formData.childrenAges === "adults"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Todos mayores de 18 años</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="childrenAges"
                    value="mixed"
                    checked={formData.childrenAges === "mixed"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Menores y mayores de 18 años</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: ¿Hay bienes? */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Hay bienes a dividir (inmuebles, vehículos, etc.)?
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="hasAssets"
                    value="yes"
                    checked={formData.hasAssets === "yes"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Sí, hay bienes significativos</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="hasAssets"
                    value="no"
                    checked={formData.hasAssets === "no"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">No, pocos o ningún bien</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Datos de contacto */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tus Datos de Contacto
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      <strong>Costo del trámite:</strong> 40 JUS (Se puede acordar plan de pagos)
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                      <strong>Consulta inicial:</strong> 1 JUS con análisis de documentación
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="Tu teléfono"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* Step 5: Diagnóstico */}
          {step === 5 && diagnosis && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 text-lg mb-2">
                  {diagnosis.processType}
                </h3>
                <p className="text-blue-800 font-medium">{diagnosis.costInfo}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Próximos Pasos:</h4>
                <ol className="space-y-2">
                  {diagnosis.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-gray-700">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {diagnosis.importantNotes.length > 0 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">Puntos Importantes:</h4>
                      <ul className="space-y-1">
                        {diagnosis.importantNotes.map((note, idx) => (
                          <li key={idx} className="text-yellow-800 text-sm">
                            • {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Próximo paso:</strong> Nos contactaremos a través de email y WhatsApp para coordinar tu consulta inicial.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            {step < 5 ? (
              <Button
                onClick={handleNext}
                className="ml-auto flex items-center gap-2"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-auto"
              >
                {isSubmitting ? "Enviando..." : "Enviar Consulta"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
