import { useState } from "react";
import { Calendar, ArrowLeft, CreditCard, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LandingCalendar from "./LandingCalendar";
import { trpc } from "@/lib/trpc";

const CONSULTATION_AMOUNT_ARS = 50000;
const CONSULTATION_DESCRIPTION = "Consulta Legal Inicial - Escalante & Estévez Abogados";

export default function CalendarBooking() {
  const [step, setStep] = useState<"contact" | "calendar" | "summary">("contact");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string; formattedDate?: string } | null>(null);
  const [touched, setTouched] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const createPreferenceMutation = trpc.payments.createPreference.useMutation();

  const isContactValid =
    contact.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(contact.email) &&
    contact.phone.trim().length > 6;

  const handleContinue = () => {
    setTouched(true);
    if (isContactValid) setStep("calendar");
  };

  const handleSelectSlot = (date: string, time: string) => {
    // Formatear fecha legible
    const [year, month, day] = date.split("-");
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('es-AR', options);

    setSelectedSlot({ date, time, formattedDate });
    setStep("summary");
  };

  const handleProceedToPayment = async () => {
    if (!selectedSlot) return;
    setIsPaying(true);
    setPaymentError(null);

    try {
      const result = await createPreferenceMutation.mutateAsync({
        consultationType: "consulta_general",
        clientName: contact.name,
        clientEmail: contact.email,
        clientPhone: contact.phone,
        appointmentDate: selectedSlot.date,
        appointmentTime: selectedSlot.time,
        amount: CONSULTATION_AMOUNT_ARS,
        description: CONSULTATION_DESCRIPTION,
      });

      if (result.success && result.initPoint) {
        window.location.href = result.initPoint;
      } else {
        setPaymentError(result.error || "No se pudo generar el link de pago. Por favor intenta nuevamente.");
        setIsPaying(false);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setPaymentError(msg || "Ocurrió un error al procesar el pago. Por favor intenta nuevamente.");
      setIsPaying(false);
    }
  };

  return (
    <section id="agenda-consulta" className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Agenda tu Consulta
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Selecciona el horario que mejor se adapte a tu disponibilidad
          </p>
        </div>

        <Card className="shadow-lg overflow-hidden max-w-2xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <div>
                  <CardTitle>Reserva tu Cita</CardTitle>
                  <CardDescription className="text-white/80">
                    Consulta inicial con análisis de documentación · ${CONSULTATION_AMOUNT_ARS.toLocaleString("es-AR")}
                  </CardDescription>
                </div>
              </div>
              <div className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full text-white/90">
                {step === "contact" && "Paso 1 de 3: Tus Datos"}
                {step === "calendar" && "Paso 2 de 3: Fecha y Hora"}
                {step === "summary" && "Paso 3 de 3: Resumen y Pago"}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {step === "contact" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Completá tus datos personales para continuar con la selección del turno.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="cb-name">Nombre y apellido</Label>
                  <Input
                    id="cb-name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    placeholder="Juan Pérez"
                  />
                  {touched && contact.name.trim().length <= 1 && (
                    <p className="text-xs text-red-600">Ingresá tu nombre</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cb-email">Email</Label>
                  <Input
                    id="cb-email"
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    placeholder="juan@email.com"
                  />
                  {touched && !/\S+@\S+\.\S+/.test(contact.email) && (
                    <p className="text-xs text-red-600">Ingresá un email válido</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cb-phone">Teléfono / WhatsApp</Label>
                  <Input
                    id="cb-phone"
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    placeholder="+54 9 11 1234-5678"
                  />
                  {touched && contact.phone.trim().length <= 6 && (
                    <p className="text-xs text-red-600">Ingresá un teléfono válido</p>
                  )}
                </div>
                <Button onClick={handleContinue} className="w-full" size="lg">
                  Ver horarios disponibles
                </Button>
              </div>
            )}

            {step === "calendar" && (
              <div className="space-y-4">
                <button
                  onClick={() => setStep("contact")}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="w-4 h-4" /> Editar mis datos ({contact.name})
                </button>
                <p className="text-sm text-gray-600">
                  Elegí el día y horario que prefieras para tu consulta inicial.
                </p>
                <LandingCalendar
                  consultationType="consulta_general"
                  clientName={contact.name}
                  clientEmail={contact.email}
                  clientPhone={contact.phone}
                  selectionOnly={true}
                  onSelectSlot={handleSelectSlot}
                />
              </div>
            )}

            {step === "summary" && selectedSlot && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep("calendar")}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeft className="w-4 h-4" /> Cambiar horario
                  </button>
                  <span className="text-xs text-muted-foreground">Paso final</span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b border-blue-200 pb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" /> Resumen de tu Reserva
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 font-medium">Cliente</p>
                      <p className="text-gray-900 font-semibold">{contact.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Contacto</p>
                      <p className="text-gray-900 font-semibold">{contact.email}</p>
                      <p className="text-gray-700">{contact.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Fecha y Hora</p>
                      <p className="text-gray-900 font-semibold capitalize">{selectedSlot.formattedDate}</p>
                      <p className="text-blue-700 font-bold text-base">{selectedSlot.time} hs</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Total a Abonar</p>
                      <p className="text-2xl font-black text-primary">
                        ${CONSULTATION_AMOUNT_ARS.toLocaleString("es-AR")} <span className="text-xs font-normal text-gray-500">ARS</span>
                      </p>
                    </div>
                  </div>
                </div>

                {paymentError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {paymentError}
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={isPaying}
                    className="w-full bg-[#009ee3] hover:bg-[#0082be] text-white font-bold py-6 text-lg shadow-md flex items-center justify-center gap-3"
                    size="lg"
                  >
                    {isPaying ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Redirigiendo a Mercado Pago...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-6 h-6" />
                        Pagar con Mercado Pago (${CONSULTATION_AMOUNT_ARS.toLocaleString("es-AR")})
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Pago 100% seguro a través de Mercado Pago. Al abonar, tu turno quedará confirmado automáticamente.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Disponibilidad Flexible</h3>
            <p className="text-sm text-gray-600">
              Elige entre múltiples horarios disponibles según tu conveniencia
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Confirmación Inmediata</h3>
            <p className="text-sm text-gray-600">
              Tu turno queda confirmado apenas se acredita el pago
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Consulta Presencial o Virtual</h3>
            <p className="text-sm text-gray-600">
              Elige si prefieres atendimiento presencial o por videollamada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
