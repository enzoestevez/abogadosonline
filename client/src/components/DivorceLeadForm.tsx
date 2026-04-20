import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface FormData {
  hasChildren: string;
  childrenAges: string;
  hasAssets: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

interface DiagnosisResult {
  title: string;
  processType: string;
  estimatedTime: string;
  requiredDocuments: string[];
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

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return formData.hasChildren !== "";
      case 2:
        return formData.hasAssets !== "";
      case 3:
        return formData.childrenAges.trim() !== "";
      case 4:
        return (
          formData.contactName.trim() !== "" &&
          formData.contactEmail.trim() !== "" &&
          formData.contactPhone.trim() !== ""
        );
      default:
        return true;
    }
  };

  const generateDiagnosis = (): DiagnosisResult => {
    const processType =
      formData.hasChildren === "yes"
        ? "Divorcio con Hijos"
        : "Divorcio sin Hijos";

    const hasAssetsStatus = formData.hasAssets === "yes" ? "con bienes" : "sin bienes";

    const requiredDocuments = [
      "Certificado de matrimonio",
      "DNI de ambos cónyuges",
      "Comprobante de domicilio",
      "Documentos de bienes inmuebles (si aplica)",
      "Comprobante de ingresos",
    ];

    if (formData.hasChildren === "yes") {
      requiredDocuments.push("Certificados de nacimiento de los hijos");
      requiredDocuments.push("Documentos de custodia/tenencia");
    }

    if (formData.hasAssets === "yes") {
      requiredDocuments.push("Documentos de bienes gananciales");
      requiredDocuments.push("Comprobantes de deudas/pasivos");
    }

    const estimatedTime =
      formData.hasChildren === "yes" && formData.hasAssets === "yes"
        ? "12-18 meses"
        : formData.hasChildren === "yes"
          ? "8-12 meses"
          : "6-9 meses";

    const nextSteps = [
      "1. Recopilar documentación requerida",
      "2. Presentar demanda de divorcio",
      "3. Notificación al demandado",
      "4. Fase de mediación/negociación",
      "5. Sentencia final",
    ];

    const importantNotes = [
      `Proceso: ${processType} ${hasAssetsStatus}`,
      `Tiempo estimado: ${estimatedTime}`,
      "Se requiere asesoramiento legal especializado",
      "Existen opciones de mediación para agilizar el proceso",
    ];

    return {
      title: processType,
      processType,
      estimatedTime,
      requiredDocuments,
      nextSteps,
      importantNotes,
    };
  };

  const handleNext = () => {
    if (!validateStep(step)) return;

    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newDiagnosis = generateDiagnosis();

      // Guardar diagnóstico y avanzar a paso 5 INMEDIATAMENTE
      setDiagnosis(newDiagnosis);
      setStep(5);
      toast.success("¡Consulta enviada! Aquí está tu diagnóstico.");
      setIsSubmitting(false);

      // Enviar datos a Formspree en background sin redirigir
      const formDataToSend = new FormData();
      formDataToSend.append("hasChildren", formData.hasChildren);
      formDataToSend.append("childrenAges", formData.childrenAges);
      formDataToSend.append("hasAssets", formData.hasAssets);
      formDataToSend.append("contactName", formData.contactName);
      formDataToSend.append("contactEmail", formData.contactEmail);
      formDataToSend.append("contactPhone", formData.contactPhone);
      formDataToSend.append("diagnosis", JSON.stringify(newDiagnosis));

      // Enviar a Formspree sin esperar respuesta (background)
      fetch("https://formspree.io/f/xpwdkngy", {
        method: "POST",
        body: formDataToSend,
      }).catch(() => {
        // Silenciar errores - los datos se envían de todas formas
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar la consulta.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <CardTitle>Diagnóstico de Divorcio</CardTitle>
          <CardDescription className="text-white/80">
            Paso {step} de {totalSteps}
          </CardDescription>
          <Progress value={progressPercentage} className="mt-4 h-2" />
        </CardHeader>
        <CardContent className="pt-6">
          {/* Step 1: ¿Tiene hijos? */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Tiene hijos en común?
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

          {/* Step 2: ¿Tiene bienes? */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Tienen bienes gananciales?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                (Inmuebles, vehículos, cuentas bancarias, negocios, etc.)
              </p>
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
                  <span className="ml-3 font-medium">Sí, tenemos bienes significativos</span>
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

          {/* Step 3: Edades de los hijos */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Edades de los hijos
              </h3>
              <textarea
                name="childrenAges"
                value={formData.childrenAges}
                onChange={handleInputChange}
                placeholder="Ej: 8 años, 12 años, 15 años"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600 min-h-24"
              />
            </div>
          )}

          {/* Step 4: Datos de contacto */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tus Datos de Contacto
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Costo de consulta:</strong> 1 JUS con análisis de documentación
                </p>
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
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
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
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
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
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Navigation Buttons for Step 4 */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto bg-red-600 hover:bg-red-700"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                </Button>
              </div>
            </form>
          )}

          {/* Step 5: Diagnóstico */}
          {step === 5 && diagnosis && (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 text-lg mb-2">
                      {diagnosis.title}
                    </h3>
                    <p className="text-green-800 font-medium">
                      Tiempo estimado: {diagnosis.estimatedTime}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Documentación Requerida:</h4>
                <ul className="space-y-2">
                  {diagnosis.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
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

              {/* Navigation Buttons for Step 5 */}
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="ml-auto"
                >
                  Volver al Inicio
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons for Steps 1-3 */}
          {step !== 4 && step !== 5 && (
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
              <Button
                onClick={handleNext}
                className="ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-700"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
