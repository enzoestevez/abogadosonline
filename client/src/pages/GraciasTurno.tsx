import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

function getAppointmentIdFromUrl(): number | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("appointment_id");
  const id = raw ? parseInt(raw, 10) : NaN;
  return Number.isNaN(id) ? null : id;
}

export default function GraciasTurno() {
  const [conversionFired, setConversionFired] = useState(false);
  const appointmentId = getAppointmentIdFromUrl();

  // Consultamos nuestra propia base de datos (actualizada únicamente por el
  // webhook de Mercado Pago) hasta confirmar que el pago quedó "paid".
  // Reintenta cada 1.5s por si el webhook todavía no llegó cuando el usuario
  // fue redirigido de vuelta (normalmente es cuestión de segundos).
  const { data } = trpc.payments.getAppointmentStatus.useQuery(
    { appointmentId: appointmentId ?? 0 },
    {
      enabled: appointmentId !== null,
      refetchInterval: (query) => {
        const d = query.state.data;
        if (!d || !d.found) return 1500;
        return d.paymentStatus === "paid" || d.paymentStatus === "failed" ? false : 1500;
      },
    }
  );

  const isConfirmedPaid = data?.found && data.paymentStatus === "paid";
  const isFailed = data?.found && data.paymentStatus === "failed";
  const isChecking = appointmentId !== null && !isConfirmedPaid && !isFailed;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isConfirmedPaid || conversionFired) return;
    // Evitar disparar de nuevo si el usuario refresca esta página.
    const alreadyFired = sessionStorage.getItem(`conversion_fired_${appointmentId}`);
    if (alreadyFired) {
      setConversionFired(true);
      return;
    }

    if (typeof window !== "undefined" && (window as any).gtag) {
      const amount = data?.amount ?? 0;
      const transactionId = `appointment_${appointmentId}`;

      (window as any).gtag("event", "purchase", {
        value: amount,
        currency: "ARS",
        transaction_id: transactionId,
        items: [
          {
            item_id: "consulta_legal",
            item_name: "Consulta Legal Confirmada",
            quantity: 1,
            price: amount,
          },
        ],
      });

      (window as any).gtag("event", "conversion", {
        send_to: "AW-18190992874/IMpICNjqjN8cEOqLkuJD",
        value: amount,
        currency: "ARS",
        transaction_id: transactionId,
      });
    }

    sessionStorage.setItem(`conversion_fired_${appointmentId}`, "1");
    setConversionFired(true);
  }, [isConfirmedPaid, conversionFired, appointmentId, data]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {isChecking && (
            <div className="mb-8">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmando tu pago...</h1>
              <p className="text-gray-600">Esto toma solo unos segundos, no cierres esta página.</p>
            </div>
          )}

          {isFailed && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                No pudimos confirmar tu pago
              </h1>
              <p className="text-gray-600 mb-8">
                Si Mercado Pago te descontó el dinero, contactanos por WhatsApp y lo resolvemos al toque.
                Si no, podés intentar reservar de nuevo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#agenda-consulta">
                  <Button className="w-full sm:w-auto">Intentar de nuevo</Button>
                </Link>
                <a
                  href="https://wa.me/5492304485586?text=Hola, tuve un problema pagando mi consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full sm:w-auto">
                    Contactar por WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          )}

          {(isConfirmedPaid || appointmentId === null) && (
            <>
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
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
