import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function GraciasTurno() {
  useEffect(() => {
    // Scroll al tope de la página
    window.scrollTo(0, 0);
    
    // Evento de conversión PURCHASE para Google Ads cuando la reserva está confirmada
    if (typeof window !== "undefined" && (window as any).gtag) {
      // Evento principal: purchase (conversión completada)
      (window as any).gtag("event", "purchase", {
        value: 50000,
        currency: "ARS",
        transaction_id: `consulta_${Date.now()}`,
        items: [
          {
            item_id: "consulta_legal",
            item_name: "Consulta Legal Confirmada",
            quantity: 1,
            price: 50000
          }
        ]
      });

      // Evento de conversión con label específico para Google Ads
      (window as any).gtag("event", "conversion", {
        send_to: "AW-18190992874/LABEL_PAGO_TURNO",
        value: 50000,
        currency: "ARS",
        transaction_id: `consulta_${Date.now()}`
      });

      // Evento de page view
      (window as any).gtag("event", "page_view", {
        page_title: "Turno Confirmado",
        page_path: "/gracias-turno",
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Tu turno ha sido confirmado!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gracias por reservar tu consulta. Nos pondremos en contacto a la brevedad para confirmar los detalles.
          </p>

          {/* Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Próximos pasos:
            </h2>
            <ul className="text-left space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">1.</span>
                <span>
                  Recibirás un email de confirmación con los detalles de tu turno
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">2.</span>
                <span>
                  Nuestro equipo se comunicará contigo 24 horas antes de la consulta
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">3.</span>
                <span>
                  La consulta será 100% online por video llamada o WhatsApp
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Si tienes alguna pregunta antes de tu consulta, no dudes en contactarnos:
            </p>
            <div className="space-y-2">
              <p className="text-gray-900 font-semibold">
                📞 WhatsApp: +54 9 2304 48-5586
              </p>
              <p className="text-gray-900 font-semibold">
                📧 Email: consultas@escalante-estevez.com.ar
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">
                Volver al inicio
              </Button>
            </Link>
            <a
              href="https://wa.me/5492304485586?text=Hola, tengo una consulta sobre mi turno"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto">
                Contactar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
