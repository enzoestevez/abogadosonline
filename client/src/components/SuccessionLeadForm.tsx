import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

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
        if (!formData.hasWill) {
          toast.error("Por favor selecciona si hay testamento");
          return false;
        }
        return true;

      case 2:
        if (!formData.deceasedType) {
          toast.error("Por favor selecciona el tipo de causante");
          return false;
        }
        return true;

      case 3:
        if (!formData.maritalStatus) {
          toast.error("Por favor selecciona el estado civil");
          return false;
        }
        if (!formData.hasChildren) {
          toast.error("Por favor indica si tenía hijos");
          return false;
        }
        return true;

      case 4:
        if (!formData.heirstAgreement) {
          toast.error("Por favor indica si hay acuerdo entre herederos");
          return false;
        }
        return true;

      case 5:
        if (!formData.heirName.trim()) {
          toast.error("Por favor ingresa tu nombre");
          return false;
        }
        if (!formData.heirEmail.trim() || !formData.heirEmail.includes("@")) {
          toast.error("Por favor ingresa un email válido");
          return false;
        }
        if (!formData.heirPhone.trim()) {
          toast.error("Por favor ingresa tu teléfono");
          return false;
        }
        return true;

      case 6:
        return true;

      default:
        return true;
    }
  };

  const generateDiagnosis = (): DiagnosisResult => {
    const hasWill = formData.hasWill === "yes";
    const maritalStatus = formData.maritalStatus;
    const hasChildren = formData.hasChildren === "yes";
    const heirstAgreement = formData.heirstAgreement;

    let heritageType = "";
    let requiredDocuments: string[] = [];
    let nextSteps: string[] = [];
    let heirs = "";
    let importantNotes: string[] = [];

    if (hasWill) {
      heritageType = "Sucesión Testamentaria";
      requiredDocuments = [
        "Testamento original o copia certificada",
        "Certificado de defunción",
        "DNI del causante",
      ];
      nextSteps = [
        "1. Solicitar aprobación judicial del testamento",
        "2. Iniciar juicio de sucesión testamentaria",
        "3. Analizar si el testamento afecta la legítima de herederos forzosos",
        "4. Si hay conflicto, resolver mediante acuerdo o litigio",
        "5. Obtener sentencia de aprobación",
        "6. Realizar inscripción en Registro de Propiedad",
      ];
      heirs = "Heredan las personas que figuran en el testamento";
      importantNotes.push(
        "Se debe analizar si el testamento afecta la legítima de herederos forzosos (cónyuge e hijos)"
      );
    } else {
      heritageType = "Sucesión Ab-Intestato";
      requiredDocuments = [
        "Certificado de defunción",
        "Certificado de vínculo (nacimiento/matrimonio)",
        "DNI del heredero que inicia la acción",
      ];
      nextSteps = [
        "1. Uno de los herederos inicia acción sucesoria ab-intestato",
        "2. Presentar certificado de defunción y vínculo",
        "3. Determinar orden sucesorio según Código Civil",
        "4. Si hay acuerdo, obtener sentencia rápida",
        "5. Si no hay acuerdo, iniciar partición judicial",
        "6. Realizar inscripción en Registro de Propiedad",
      ];

      if (maritalStatus === "married") {
        heirs =
          "Herederos: Cónyuge retiene 50% ganancial (bienes gananciales) y hereda como un hijo más sobre los bienes propios del causante. Hijos heredan los bienes propios en partes iguales.";
        importantNotes.push(
          "En matrimonio comunitario: el cónyuge retiene la mitad ganancial (50%) de los bienes gananciales y hereda como un hijo más sobre los bienes propios del causante"
        );
      } else if (maritalStatus === "single") {
        if (hasChildren) {
          heirs = "Herederos: Hijos (a partes iguales)";
        } else {
          heirs = "Herederos: Padres (si viven) o hermanos (según orden sucesorio)";
        }
      } else if (maritalStatus === "widowed") {
        if (hasChildren) {
          heirs = "Herederos: Hijos (a partes iguales)";
        } else {
          heirs = "Herederos: Padres (si viven) o hermanos (según orden sucesorio)";
        }
      } else if (maritalStatus === "divorced") {
        if (hasChildren) {
          heirs = "Herederos: Hijos (a partes iguales)";
        } else {
          heirs = "Herederos: Padres (si viven) o hermanos (según orden sucesorio)";
        }
      }

      if (maritalStatus === "married") {
        importantNotes.push(
          "IMPORTANTE: Si el matrimonio estaba bajo régimen de separación de bienes, el cónyuge NO retiene gananciales y solo hereda sobre bienes propios"
        );
      }
    }

    if (heirstAgreement === "no") {
      importantNotes.push(
        "Sin acuerdo entre herederos: será necesario iniciar partición judicial"
      );
    }

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

  const saveMutation = trpc.forms.saveSuccession.useMutation();
  const submitMutation = trpc.forms.submitSuccession.useMutation();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newDiagnosis = generateDiagnosis();
      
      // Guardar en base de datos
      await saveMutation.mutateAsync({
        hasWill: formData.hasWill,
        deceasedType: formData.deceasedType,
        maritalStatus: formData.maritalStatus,
        hasChildren: formData.hasChildren,
        heirstAgreement: formData.heirstAgreement,
        heirName: formData.heirName,
        heirEmail: formData.heirEmail,
        heirPhone: formData.heirPhone,
        diagnosis: newDiagnosis,
      });
      
      // Enviar a Formspree
      await submitMutation.mutateAsync({
        hasWill: formData.hasWill,
        deceasedType: formData.deceasedType,
        maritalStatus: formData.maritalStatus,
        hasChildren: formData.hasChildren,
        heirstAgreement: formData.heirstAgreement,
        heirName: formData.heirName,
        heirEmail: formData.heirEmail,
        heirPhone: formData.heirPhone,
        diagnosis: JSON.stringify(newDiagnosis),
      });

      // Guardar diagnóstico y avanzar a paso 6
      setDiagnosis(newDiagnosis);
      setStep(6);
      toast.success("¡Consulta enviada! Aquí está tu diagnóstico.");
    } catch (error) {
      toast.error("Error al enviar la consulta. Intenta nuevamente.");
    } finally {
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

        <CardContent className="pt-8">
          {/* Step 1: ¿Hay testamento? */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Existe testamento del fallecido?
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
                  <span className="ml-3 font-medium">Sí, hay testamento</span>
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
                  <span className="ml-3 font-medium">No, no hay testamento</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: ¿Quién es el fallecido? */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Quién es el fallecido?
              </h3>
              <select
                name="deceasedType"
                value={formData.deceasedType}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Selecciona una opción</option>
                <option value="mother">Madre</option>
                <option value="son">Hijo/a</option>
                <option value="brother">Hermano/a</option>
                <option value="uncle">Tío/a</option>
                <option value="grandfather">Abuelo/a</option>
              </select>
            </div>
          )}

          {/* Step 3: Estado civil e hijos */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  ¿Cuál era el estado civil del fallecido?
                </h3>
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
            <div className="space-y-4">
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
            </div>
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
            </div>
          )}

          {/* Navigation Buttons */}
          {step !== 6 && (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
