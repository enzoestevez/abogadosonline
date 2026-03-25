import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type CaseType = "sucesion" | "divorcio" | null;
type Step = "case-type" | "personal-info" | "case-details" | "diagnosis" | "contact-info" | "confirmation";

interface FormData {
  caseType: CaseType;
  fullName: string;
  email: string;
  phone: string;
  // Sucesión
  deceasedName?: string;
  deceasedDeathDate?: string;
  hasWill?: boolean;
  heirs?: number;
  mainAsset?: string;
  estimatedValue?: string;
  familyConflicts?: boolean;
  // Divorcio
  spouseName?: string;
  marriageYears?: string;
  hasChildren?: boolean;
  childrenCount?: number;
  hasAgreement?: boolean;
  mainAssets?: string;
}

export default function DiagnosticForm() {
  const [currentStep, setCurrentStep] = useState<Step>("case-type");
  const [formData, setFormData] = useState<FormData>({
    caseType: null,
    fullName: "",
    email: "",
    phone: "",
  });
  const [diagnosis, setDiagnosis] = useState<string>("");

  const handleCaseTypeSelect = (type: CaseType) => {
    setFormData({ ...formData, caseType: type });
    setCurrentStep("personal-info");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep === "personal-info") {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast.error("Por favor completa todos los campos");
        return;
      }
      setCurrentStep("case-details");
    } else if (currentStep === "case-details") {
      generateDiagnosis();
      setCurrentStep("diagnosis");
    } else if (currentStep === "diagnosis") {
      setCurrentStep("contact-info");
    } else if (currentStep === "contact-info") {
      setCurrentStep("confirmation");
    }
  };

  const handleBack = () => {
    if (currentStep === "personal-info") {
      setCurrentStep("case-type");
    } else if (currentStep === "case-details") {
      setCurrentStep("personal-info");
    } else if (currentStep === "diagnosis") {
      setCurrentStep("case-details");
    } else if (currentStep === "contact-info") {
      setCurrentStep("diagnosis");
    }
  };

  const generateDiagnosis = () => {
    let diagnosisText = "";

    if (formData.caseType === "sucesion") {
      const hasConflicts = formData.familyConflicts ? "Sí" : "No";
      const hasWill = formData.hasWill ? "Sí" : "No";
      const complexity = formData.familyConflicts || (formData.heirs && formData.heirs > 2) ? "Alta" : "Moderada";

      diagnosisText = `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-primary">Diagnóstico Preliminar - Sucesión</h3>
          <div class="bg-blue-50 border-l-4 border-primary p-4 rounded">
            <p class="font-semibold text-primary">Complejidad estimada: <span class="text-accent">${complexity}</span></p>
            <p class="text-sm text-foreground mt-2">Basado en los datos proporcionados, tu caso presenta una complejidad ${complexity.toLowerCase()}.</p>
          </div>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <CheckCircle2 class="text-accent flex-shrink-0 mt-1" size={20} />
              <div>
                <p class="font-semibold text-foreground">Testamento: ${hasWill}</p>
                <p class="text-sm text-muted-foreground">Esto ${hasWill === "Sí" ? "facilita" : "complica"} el proceso sucesorio.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <${formData.familyConflicts ? "AlertCircle" : "CheckCircle2"} class="text-${formData.familyConflicts ? "orange" : "accent"}-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <p class="font-semibold text-foreground">Conflictos familiares: ${hasConflicts}</p>
                <p class="text-sm text-muted-foreground">${formData.familyConflicts ? "Recomendamos asesoramiento preventivo urgente." : "Buen pronóstico para una sucesión ordenada."}</p>
              </div>
            </div>
          </div>
          <div class="bg-accent/10 border border-accent/30 p-4 rounded">
            <p class="text-sm text-foreground"><strong>Próximos pasos:</strong> Agendar una consulta para revisar la documentación y definir la estrategia.</p>
          </div>
        </div>
      `;
    } else if (formData.caseType === "divorcio") {
      const hasAgreement = formData.hasAgreement ? "Sí" : "No";
      const hasChildren = formData.hasChildren ? "Sí" : "No";
      const complexity = formData.hasChildren || !formData.hasAgreement ? "Alta" : "Moderada";

      diagnosisText = `
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-primary">Diagnóstico Preliminar - Divorcio</h3>
          <div class="bg-blue-50 border-l-4 border-primary p-4 rounded">
            <p class="font-semibold text-primary">Complejidad estimada: <span class="text-accent">${complexity}</span></p>
            <p class="text-sm text-foreground mt-2">Basado en los datos proporcionados, tu caso presenta una complejidad ${complexity.toLowerCase()}.</p>
          </div>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <${formData.hasAgreement ? "CheckCircle2" : "AlertCircle"} class="text-${formData.hasAgreement ? "accent" : "orange"}-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <p class="font-semibold text-foreground">Acuerdo previo: ${hasAgreement}</p>
                <p class="text-sm text-muted-foreground">${formData.hasAgreement ? "Esto agiliza significativamente el proceso." : "Recomendamos mediación o negociación."}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <${formData.hasChildren ? "AlertCircle" : "CheckCircle2"} class="text-${formData.hasChildren ? "orange" : "accent"}-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <p class="font-semibold text-foreground">Hijos menores: ${hasChildren}</p>
                <p class="text-sm text-muted-foreground">${formData.hasChildren ? "Requiere especial atención en custodia y manutención." : "Simplifica el proceso."}</p>
              </div>
            </div>
          </div>
          <div class="bg-accent/10 border border-accent/30 p-4 rounded">
            <p class="text-sm text-foreground"><strong>Próximos pasos:</strong> Consulta para evaluar opciones de resolución y proteger tus derechos.</p>
          </div>
        </div>
      `;
    }

    setDiagnosis(diagnosisText);
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Por favor completa todos los campos de contacto");
      return;
    }
    toast.success("¡Gracias! Tu información ha sido enviada. Me pondré en contacto pronto.");
    // Aquí iría la lógica para enviar los datos a un servidor
    setCurrentStep("confirmation");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Diagnóstico Legal Gratuito</h1>
            <p className="text-lg text-muted-foreground">
              Responde algunas preguntas y recibe un análisis preliminar de tu situación
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-primary">
                Paso {
                  currentStep === "case-type"
                    ? "1"
                    : currentStep === "personal-info"
                    ? "2"
                    : currentStep === "case-details"
                    ? "3"
                    : currentStep === "diagnosis"
                    ? "4"
                    : currentStep === "contact-info"
                    ? "5"
                    : "6"
                } de 6
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width:
                    currentStep === "case-type"
                      ? "16%"
                      : currentStep === "personal-info"
                      ? "33%"
                      : currentStep === "case-details"
                      ? "50%"
                      : currentStep === "diagnosis"
                      ? "66%"
                      : currentStep === "contact-info"
                      ? "83%"
                      : "100%",
                }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <Card className="p-8 bg-white border border-border">
            {/* Step 1: Case Type Selection */}
            {currentStep === "case-type" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">¿Cuál es tu situación?</h2>
                <p className="text-foreground">Selecciona el tipo de caso para recibir un diagnóstico personalizado</p>

                <div className="grid gap-4">
                  <button
                    onClick={() => handleCaseTypeSelect("sucesion")}
                    className="p-6 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
                  >
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      Sucesión
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Necesito tramitar una herencia o planificar mi patrimonio
                    </p>
                  </button>

                  <button
                    onClick={() => handleCaseTypeSelect("divorcio")}
                    className="p-6 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
                  >
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      Divorcio
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Necesito asesoramiento sobre separación o divorcio
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {currentStep === "personal-info" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">Información Personal</h2>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Nombre Completo *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+54 (11) XXXX-XXXX"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={18} /> Atrás
                  </Button>
                  <Button onClick={handleNext} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90">
                    Siguiente <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Case Details - Sucesión */}
            {currentStep === "case-details" && formData.caseType === "sucesion" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">Detalles de la Sucesión</h2>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Nombre del fallecido *</label>
                  <input
                    type="text"
                    name="deceasedName"
                    value={formData.deceasedName || ""}
                    onChange={handleInputChange}
                    placeholder="Nombre completo"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Fecha de fallecimiento</label>
                  <input
                    type="date"
                    name="deceasedDeathDate"
                    value={formData.deceasedDeathDate || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">¿Existe testamento?</label>
                  <select
                    name="hasWill"
                    value={formData.hasWill === undefined ? "" : formData.hasWill ? "si" : "no"}
                    onChange={(e) => setFormData({ ...formData, hasWill: e.target.value === "si" })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí, existe testamento</option>
                    <option value="no">No, no existe testamento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">¿Cuántos herederos hay?</label>
                  <input
                    type="number"
                    name="heirs"
                    value={formData.heirs || ""}
                    onChange={handleInputChange}
                    placeholder="Número de herederos"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Principal activo de la herencia</label>
                  <select
                    name="mainAsset"
                    value={formData.mainAsset || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="inmueble">Inmueble(s)</option>
                    <option value="dinero">Dinero/Ahorros</option>
                    <option value="empresa">Empresa/Negocio</option>
                    <option value="mixto">Mixto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">¿Hay conflictos entre herederos?</label>
                  <select
                    name="familyConflicts"
                    value={formData.familyConflicts === undefined ? "" : formData.familyConflicts ? "si" : "no"}
                    onChange={(e) => setFormData({ ...formData, familyConflicts: e.target.value === "si" })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí, hay conflictos</option>
                    <option value="no">No, hay buen entendimiento</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={18} /> Atrás
                  </Button>
                  <Button onClick={handleNext} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90">
                    Ver Diagnóstico <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Case Details - Divorcio */}
            {currentStep === "case-details" && formData.caseType === "divorcio" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">Detalles del Divorcio</h2>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Nombre de la pareja</label>
                  <input
                    type="text"
                    name="spouseName"
                    value={formData.spouseName || ""}
                    onChange={handleInputChange}
                    placeholder="Nombre completo"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">¿Cuántos años llevan casados?</label>
                  <input
                    type="number"
                    name="marriageYears"
                    value={formData.marriageYears || ""}
                    onChange={handleInputChange}
                    placeholder="Años"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">¿Tienen hijos menores?</label>
                  <select
                    name="hasChildren"
                    value={formData.hasChildren === undefined ? "" : formData.hasChildren ? "si" : "no"}
                    onChange={(e) => setFormData({ ...formData, hasChildren: e.target.value === "si" })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí, tenemos hijos</option>
                    <option value="no">No, no tenemos hijos menores</option>
                  </select>
                </div>

                {formData.hasChildren && (
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">¿Cuántos hijos?</label>
                    <input
                      type="number"
                      name="childrenCount"
                      value={formData.childrenCount || ""}
                      onChange={handleInputChange}
                      placeholder="Número de hijos"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">¿Tienen acuerdo previo?</label>
                  <select
                    name="hasAgreement"
                    value={formData.hasAgreement === undefined ? "" : formData.hasAgreement ? "si" : "no"}
                    onChange={(e) => setFormData({ ...formData, hasAgreement: e.target.value === "si" })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="si">Sí, ya hemos acordado</option>
                    <option value="no">No, aún no hay acuerdo</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={18} /> Atrás
                  </Button>
                  <Button onClick={handleNext} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90">
                    Ver Diagnóstico <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Diagnosis */}
            {currentStep === "diagnosis" && (
              <div className="space-y-6">
                <div dangerouslySetInnerHTML={{ __html: diagnosis }} />

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={18} /> Atrás
                  </Button>
                  <Button onClick={handleNext} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90">
                    Agendar Consulta <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Contact Info Confirmation */}
            {currentStep === "contact-info" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">Confirma tu Información</h2>
                <p className="text-foreground">Usaremos estos datos para contactarte y agendar tu consulta gratuita</p>

                <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre</p>
                    <p className="font-semibold text-foreground">{formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-semibold text-foreground">{formData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm text-foreground">
                    Al enviar este formulario, aceptas que me contacte para agendar una consulta gratuita y proporcionar asesoramiento legal.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={18} /> Atrás
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                  >
                    Enviar y Agendar <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Confirmation */}
            {currentStep === "confirmation" && (
              <div className="text-center space-y-6 py-8">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="text-accent" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-primary">¡Gracias!</h2>
                <p className="text-lg text-foreground">
                  Tu información ha sido enviada exitosamente. Me pondré en contacto contigo en las próximas 24 horas para agendar tu consulta gratuita.
                </p>
                <div className="bg-accent/10 border border-accent/30 p-6 rounded-lg text-left space-y-2">
                  <p className="font-semibold text-primary">¿Qué sucede ahora?</p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      Revisaré tu caso en detalle
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      Te contactaré por teléfono o email para agendar
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      Realizaremos una consulta inicial gratuita
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
