import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function CalendarBooking() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Listener AGRESIVO - captura TODOS los mensajes
    const handleAllMessages = (event: MessageEvent) => {
      // Log de TODOS los mensajes (sin filtro de origen)
      console.log("[MESSAGE] Mensaje recibido de:", event.origin);
      console.log("[MESSAGE] Contenido:", event.data);
      console.log("[MESSAGE] Tipo:", typeof event.data);

      // Ahora sí, verificar si viene de ReservaSimple
      if (event.origin === "https://reservasimple.com" || event.origin.includes("reservasimple")) {
        console.log("[ReservaSimple] ✅ MENSAJE DE RESERVASIMPLE DETECTADO");
        console.log("[ReservaSimple] Datos completos:", JSON.stringify(event.data));

        const data = event.data;

        // Detectar confirmación - CUALQUIER indicador
        const isConfirmed = 
          data?.type === "booking_completed" ||
          data?.status === "confirmed" ||
          data?.event === "booking_success" ||
          data?.action === "booking_confirmed" ||
          data?.booking_id !== undefined ||
          data?.confirmed === true ||
          data?.success === true ||
          (typeof data === 'string' && (data.includes('confirmed') || data.includes('success'))) ||
          (typeof data === 'object' && Object.values(data).some((v: any) => 
            typeof v === 'string' && (v.includes('confirmed') || v.includes('success'))
          ));

        if (isConfirmed) {
          console.log("[ReservaSimple] 🎉 ¡RESERVA CONFIRMADA DETECTADA!");

          // Trackear en Google Ads
          if (typeof window !== "undefined" && (window as any).gtag) {
            console.log("[Google Ads] Enviando evento purchase...");
            (window as any).gtag("event", "purchase", {
              value: 0,
              currency: "ARS",
              transaction_id: data?.booking_id || `reserva_${Date.now()}`,
              items: [
                {
                  item_name: "Consulta Inicial",
                  item_category: "legal_consultation",
                },
              ],
            });
          }

          // Redirigir
          console.log("[Redirect] Redirigiendo a /gracias-turno...");
          setTimeout(() => {
            navigate("/gracias-turno");
            window.scrollTo(0, 0);
          }, 500);
        }
      }
    };

    // Escuchar TODOS los mensajes
    window.addEventListener("message", handleAllMessages);

    console.log("[Init] Listener de ReservaSimple inicializado");

    return () => {
      window.removeEventListener("message", handleAllMessages);
    };
  }, [navigate]);

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

        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <div>
                <CardTitle>Reserva tu Cita</CardTitle>
                <CardDescription className="text-white/80">
                  Consulta inicial: 1 JUS con análisis de documentación
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* ReservaSimple Embed */}
            <div className="w-full h-screen md:h-[800px]">
              <iframe
                src="https://reservasimple.com/escalanteyestevezabogados"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Agendar Consulta"
                style={{ border: "none" }}
              />
            </div>
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
              Recibe confirmación al instante en tu email y WhatsApp
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
