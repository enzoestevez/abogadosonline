import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConsultaConfirmada() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Evento de conversión para Google Ads
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        value: 1200,
        currency: "ARS",
        transaction_id: `consulta_${Date.now()}`,
      });

      (window as any).gtag("event", "page_view", {
        page_title: "Consulta Confirmada",
        page_path: "/consulta-confirmada",
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Success Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-block bg-green-100 rounded-full p-4">
                <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">¡Tu Consulta Ha Sido Confirmada!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Gracias por completar tu diagnóstico. Tu consulta ha sido registrada exitosamente.
            </p>
          </div>
        </section>

        {/* Consultation Summary */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Resumen de tu Consulta</h2>
            <div className="bg-white rounded-lg border-2 border-green-200 p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Día y Hora Agendada</p>
                  <p className="text-lg font-bold text-gray-900">Próximos 7 días hábiles</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Tema de Consulta</p>
                  <p className="text-lg font-bold text-gray-900">Asesoramiento Legal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Nombre</p>
                  <p className="text-lg font-bold text-gray-900">Datos recibidos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Email de Confirmación</p>
                  <p className="text-lg font-bold text-gray-900">Enviado a tu correo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Próximos Pasos</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-gray-700 text-lg">
                ✓ Recibirás confirmación por email y WhatsApp 24 horas antes de tu consulta.
              </p>
              <p className="text-gray-700 text-lg mt-4">
                ✓ Prepara tus documentos relevantes (títulos, contratos, certificados, etc.).
              </p>
              <p className="text-gray-700 text-lg mt-4">
                ✓ Si tienes preguntas, contáctanos por WhatsApp al +54 230 448-5586.
              </p>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Información Importante</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Qué Traer a la Consulta</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Documento de identidad</li>
                  <li>• Documentos relevantes al caso</li>
                  <li>• Contratos o acuerdos previos</li>
                  <li>• Correspondencia relacionada</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Políticas de Cancelación</h3>
                <p className="text-gray-700">
                  Si necesitas reprogramar, avísanos con 24 horas de anticipación. Las consultas no asistidas sin aviso previo serán cobradas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">Confidencialidad</h3>
                <p className="text-gray-700">
                  Toda información compartida en la consulta es completamente confidencial y protegida por secreto profesional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 text-lg"
              >
                Volver al Inicio
              </Button>
              <Button
                onClick={() => navigate("/diagnostico")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 text-lg"
              >
                Agendar Otra Consulta
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
