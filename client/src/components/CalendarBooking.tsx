import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CalendarBooking() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
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
