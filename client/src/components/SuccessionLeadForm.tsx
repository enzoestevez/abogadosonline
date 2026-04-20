import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface FormData {
  hasWill: string;
  deceasedType: string;
  maritalStatus: string;
  hasChildren: string;
  heirstAgreement: string;
  heirName: string;
  heirEmail: string;
  heirPhone: string;
}

interface DiagnosisResult {
  title: string;
  heritageType: string;
  requiredDocuments: string[];
  nextSteps: string[];
  heirs: string;
  importantNotes: string[];
}

export default function SuccessionLeadForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    hasWill: "",
    deceasedType: "",
    maritalStatus: "",
    hasChildren: "",
    heirstAgreement: "",
    heirName: "",
    heirEmail: "",
    heirPhone: "",
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

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return formData.hasWill !== "";
      case 2:
        return formData.deceasedType !== "";
      case 3:
        return formData.maritalStatus !== "";
      case 4:
        return formData.hasChildren !== "";
      case 5:
        return (
          formData.heirstAgreement !== "" &&
          formData.heirName.trim() !== "" &&
          formData.heirEmail.trim() !== "" &&
          formData.heirPhone.trim() !== ""
        );
      default:
        return true;
    }
  };

  const generateDiagnosis = (): DiagnosisResult => {
    const heritageType =
      formData.deceasedType === "spouse"
        ? "Sucesión Conyugal"
        : formData.deceasedType === "parent"
          ? "Sucesión Parental"
          : "Sucesión General";

    const hasWillStatus = formData.hasWill === "yes" ? "con testamento" : "sin testamento";
    const childrenStatus = formData.hasChildren === "yes" ? "con hijos" : "sin hijos";

    const requiredDocuments = [
      "Certificado de defunción",
      "Testamento (si existe)",
      "Documentos de identidad de herederos",
      "Comprobante de domicilio",
      "Documentos de bienes inmuebles",
    ];

    if (formData.hasChildren === "yes") {
      requiredDocuments.push("Certificados de nacimiento de los hijos");
    }

    const nextSteps = [
      "1. Recopilar toda la documentación requerida",
      "2. Presentar solicitud de sucesión ante el juzgado",
      "3. Notificación a herederos",
      "4. Trámite de inventario y avalúo",
      "5. Resolución final y distribución de bienes",
    ];

    const importantNotes = [
      `Sucesión ${hasWillStatus} ${childrenStatus}`,
      "El proceso puede tomar entre 6 meses a 2 años",
      "Se requiere asesoramiento legal especializado",
      "Los costos varían según la complejidad del caso",
    ];

    const heirs =
      formData.hasChildren === "yes"
        ? "Herederos: Cónyuge e hijos"
        : "Herederos: Cónyuge y otros herederos legales";

    return {
      title: heritageType,
      heritageType,
      requiredDocuments,
      nextSteps,
      heirs,
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
      hasWill: "",
      deceasedType: "",
      maritalStatus: "",
      hasChildren: "",
      heirstAgreement: "",
      heirName: "",
      heirEmail: "",
      heirPhone: "",
    });
    setDiagnosis(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newDiagnosis = generateDiagnosis();

      // Guardar diagnóstico y avanzar a paso 6 INMEDIATAMENTE
      setDiagnosis(newDiagnosis);
      setStep(6);
      toast.success("¡Consulta enviada! Aquí está tu diagnóstico.");
      setIsSubmitting(false);

      // Enviar datos a Formspree en background sin redirigir
      const formDataToSend = new FormData();
      formDataToSend.append("hasWill", formData.hasWill);
      formDataToSend.append("deceasedType", formData.deceasedType);
      formDataToSend.append("maritalStatus", formData.maritalStatus);
      formDataToSend.append("hasChildren", formData.hasChildren);
      formDataToSend.append("heirstAgreement", formData.heirstAgreement);
      formDataToSend.append("heirName", formData.heirName);
      formDataToSend.append("heirEmail", formData.heirEmail);
      formDataToSend.append("heirPhone", formData.heirPhone);
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
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardTitle>Diagnóstico de Sucesión</CardTitle>
          <CardDescription className="text-white/80">
            Paso {step} de {totalSteps}
          </CardDescription>
          <Progress value={progressPercentage} className="mt-4 h-2" />
        </CardHeader>
        <CardContent className="pt-6">
          {/* Step 1: ¿Hay testamento? */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Existe un testamento?
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="hasWill"
                    value="yes"
                    checked={formData.hasWill === "yes"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Sí, existe testamento</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="hasWill"
                    value="no"
                    checked={formData.hasWill === "no"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">No, falleció sin testamento</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Tipo de fallecido */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Quién falleció?
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deceasedType"
                    value="spouse"
                    checked={formData.deceasedType === "spouse"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Cónyuge</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deceasedType"
                    value="parent"
                    checked={formData.deceasedType === "parent"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Padre/Madre</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deceasedType"
                    value="other"
                    checked={formData.deceasedType === "other"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Otro familiar</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Estado civil */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Estado civil del fallecido
              </h3>
              <div>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="married">Casado/a</option>
                  <option value="single">Soltero/a</option>
                  <option value="widowed">Viudo/a</option>
                  <option value="divorced">Divorciado/a</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  ¿Tenía hijos?
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
                    <span className="ml-3 font-medium">Sí</span>
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
                    <span className="ml-3 font-medium">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: ¿Hay acuerdo entre herederos? */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Hay acuerdo entre todos los herederos?
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="heirstAgreement"
                    value="yes"
                    checked={formData.heirstAgreement === "yes"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Sí, todos están de acuerdo</span>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="heirstAgreement"
                    value="no"
                    checked={formData.heirstAgreement === "no"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">No, hay desacuerdos</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Datos de contacto */}
          {step === 5 && (
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
                  name="heirName"
                  value={formData.heirName}
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
                  name="heirEmail"
                  value={formData.heirEmail}
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
                  name="heirPhone"
                  value={formData.heirPhone}
                  onChange={handleInputChange}
                  placeholder="Tu teléfono"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              {/* Navigation Buttons for Step 5 */}
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
                  className="ml-auto"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                </Button>
              </div>
            </form>
          )}

          {/* Step 6: Diagnóstico */}
          {step === 6 && diagnosis && (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 text-lg mb-2">
                      {diagnosis.title}
                    </h3>
                    <p className="text-green-800 font-medium">{diagnosis.heirs}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Documentación Requerida:</h4>
                <ul className="space-y-2">
                  {diagnosis.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-primary font-bold">•</span>
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

              {/* Navigation Buttons for Step 6 */}
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

          {/* Navigation Buttons for Steps 1-4 */}
          {step !== 5 && step !== 6 && (
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
                className="ml-auto flex items-center gap-2"
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
