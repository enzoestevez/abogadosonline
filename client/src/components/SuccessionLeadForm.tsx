import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

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
        return true;

      case 6:
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

    if (step === 4) {
      const newDiagnosis = generateDiagnosis();
      setDiagnosis(newDiagnosis);
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
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    try {
      toast.success("¡Gracias! Nos contactaremos pronto para coordinar tu consulta.");
      setTimeout(() => {
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
      }, 2000);
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
          <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Diagnóstico de Sucesión</CardTitle>
            <CardDescription className="text-blue-100">
              Responde algunas preguntas para recibir un análisis personalizado de tu situación sucesoria
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Paso {step} de {totalSteps}
                </span>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Step 1: ¿Hay testamento? */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">¿Hay testamento?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Esta información es fundamental para determinar el tipo de sucesión
                </p>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="hasWill"
                      value="yes"
                      checked={formData.hasWill === "yes"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">Sí, hay testamento</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="hasWill"
                      value="no"
                      checked={formData.hasWill === "no"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">No, no hay testamento</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Tipo de causante */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">¿Quién es el fallecido?</h3>
                <select
                  name="deceasedType"
                  value={formData.deceasedType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona relación con el fallecido</option>
                  <option value="mother">Madre</option>
                  <option value="son">Hijo</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona estado civil</option>
                    <option value="married">Casado/a</option>
                    <option value="single">Soltero/a</option>
                    <option value="widowed">Viudo/a</option>
                    <option value="divorced">Divorciado/a</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Tenía hijos?</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                      <input
                        type="radio"
                        name="hasChildren"
                        value="yes"
                        checked={formData.hasChildren === "yes"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span>Sí, tenía hijos</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                      <input
                        type="radio"
                        name="hasChildren"
                        value="no"
                        checked={formData.hasChildren === "no"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span>No, no tenía hijos</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Acuerdo entre herederos */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">¿Hay acuerdo entre herederos?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Esto determina si se puede hacer una sucesión rápida o si se necesita partición judicial
                </p>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50">
                    <input
                      type="radio"
                      name="heirstAgreement"
                      value="yes"
                      checked={formData.heirstAgreement === "yes"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">Sí, todos estamos de acuerdo</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-yellow-50">
                    <input
                      type="radio"
                      name="heirstAgreement"
                      value="partial"
                      checked={formData.heirstAgreement === "partial"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">Parcialmente, hay algunos desacuerdos</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-red-50">
                    <input
                      type="radio"
                      name="heirstAgreement"
                      value="no"
                      checked={formData.heirstAgreement === "no"}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="font-medium">No, hay conflictos importantes</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 5: Diagnóstico */}
            {step === 5 && diagnosis && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tu Análisis Personalizado</h3>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Tipo de Sucesión</p>
                  <p className="text-2xl font-bold text-blue-900">{diagnosis.title}</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Herederos</p>
                  <p className="text-base font-semibold text-green-900">{diagnosis.heirs}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Documentación Requerida:</p>
                  <ul className="space-y-2">
                    {diagnosis.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-yellow-600 font-bold">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-purple-900 mb-2">Costo de Consulta Inicial:</p>
                  <p className="text-lg font-bold text-purple-900">2 JUS</p>
                  <p className="text-xs text-purple-800 mt-2">Con análisis de documentación</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Próximos Pasos:</p>
                  <ol className="space-y-2">
                    {diagnosis.nextSteps.map((nextStep, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="font-bold text-gray-500">{i + 1}.</span>
                        <span>{nextStep}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {diagnosis.importantNotes.length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-orange-900 mb-3">Notas Importantes:</p>
                    <ul className="space-y-2">
                      {diagnosis.importantNotes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-orange-900">
                          <AlertCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Datos de contacto */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tus Datos de Contacto</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Completa tus datos para que podamos coordinar tu consulta inicial
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="heirName"
                    value={formData.heirName}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="heirEmail"
                    value={formData.heirEmail}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="heirPhone"
                    value={formData.heirPhone}
                    onChange={handleInputChange}
                    placeholder="+54 9 11 XXXX-XXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Botones de Navegación */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={step === 1}
                className="flex-1"
              >
                <ChevronLeft size={18} className="mr-2" />
                Anterior
              </Button>

              {step < totalSteps ? (
                <Button onClick={handleNext} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Siguiente
                  <ChevronRight size={18} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 size={18} className="mr-2" />
                  {isSubmitting ? "Enviando..." : "Enviar Diagnóstico"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
