import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

interface MercadoPagoPaymentProps {
  amount?: number;
  description?: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export default function MercadoPagoPayment({
  amount = 1200,
  description = "Consulta Legal - Escalante & Estévez Abogados",
  onSuccess,
  onError,
}: MercadoPagoPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setStatus("processing");

    try {
      // Simular integración con Mercado Pago
      // En producción, esto llamaría a tu backend para crear una preferencia de pago
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          description,
          external_reference: `consulta_${Date.now()}`,
          notification_url: `${window.location.origin}/api/mercadopago/webhook`,
          back_urls: {
            success: `${window.location.origin}/consulta-confirmada`,
            failure: `${window.location.origin}/`,
            pending: `${window.location.origin}/`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Error al procesar el pago");
      }

      const data = await response.json();

      if (data.init_point) {
        // Redirigir a Mercado Pago
        window.location.href = data.init_point;
      } else {
        throw new Error("No se pudo obtener el link de pago");
      }
    } catch (error) {
      setStatus("error");
      const errorMessage = error instanceof Error ? error.message : "Error al procesar el pago";
      setMessage(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Resumen de Pago</h3>
          <span className="text-2xl font-bold text-blue-600">${amount.toLocaleString("es-AR")}</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">{description}</p>

        {status === "error" && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700">¡Pago procesado exitosamente!</p>
          </div>
        )}

        <Button
          onClick={handlePayment}
          disabled={loading || status === "success"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Procesando...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Pago Completado
            </>
          ) : (
            "Pagar con Mercado Pago"
          )}
        </Button>

        <p className="text-xs text-gray-600 text-center mt-3">
          Serás redirigido a Mercado Pago para completar el pago de forma segura
        </p>
      </Card>

      {/* Payment Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-bold text-gray-900 mb-2">¿Por qué pagar ahora?</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✓ Asegura tu cita con el abogado</li>
          <li>✓ Acceso inmediato a tu diagnóstico</li>
          <li>✓ Pago 100% seguro con Mercado Pago</li>
          <li>✓ Reembolso garantizado si no estás satisfecho</li>
        </ul>
      </div>
    </div>
  );
}
