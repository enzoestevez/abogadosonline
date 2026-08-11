import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

/**
 * IMPORTANTE: definir la variable de entorno MP_ACCESS_TOKEN con el
 * Access Token de PRODUCCIÓN de Mercado Pago (Panel de desarrolladores
 * de Mercado Pago > Tus integraciones > Credenciales de producción).
 * Nunca hardcodear el token en el código.
 */
const accessToken = process.env.MP_ACCESS_TOKEN;

let client: MercadoPagoConfig | null = null;
function getClient(): MercadoPagoConfig {
  if (!accessToken) {
    throw new Error(
      "Falta configurar MP_ACCESS_TOKEN en las variables de entorno del servidor"
    );
  }
  if (!client) {
    client = new MercadoPagoConfig({ accessToken });
  }
  return client;
}

interface CreatePreferenceParams {
  appointmentId: number;
  amount: number; // en ARS, sin decimales
  description: string;
  payerEmail: string;
  successUrl: string;
  failureUrl: string;
  pendingUrl: string;
  notificationUrl: string;
}

export async function createPaymentPreference(params: CreatePreferenceParams) {
  const preference = new Preference(getClient());

  const result = await preference.create({
    body: {
      items: [
        {
          id: `appointment_${params.appointmentId}`,
          title: params.description,
          quantity: 1,
          unit_price: params.amount,
          currency_id: "ARS",
        },
      ],
      payer: {
        email: params.payerEmail,
      },
      // external_reference es la clave que usamos para volver a encontrar
      // la cita cuando llega la notificación del webhook
      external_reference: String(params.appointmentId),
      back_urls: {
        success: params.successUrl,
        failure: params.failureUrl,
        pending: params.pendingUrl,
      },
      auto_return: "approved",
      notification_url: params.notificationUrl,
      statement_descriptor: "ESTUDIO JURIDICO",
    },
  });

  if (!result.id || !result.init_point) {
    throw new Error("Mercado Pago no devolvió una preferencia válida");
  }

  return { id: result.id, init_point: result.init_point };
}

/**
 * Consulta el estado real de un pago directamente contra la API de
 * Mercado Pago. Nunca confiar únicamente en los query params que llegan
 * por back_url o en el payload del webhook sin validar esto: son
 * fácilmente falsificables por cualquiera que conozca la URL.
 */
export async function getPaymentStatus(paymentId: string) {
  const payment = new Payment(getClient());
  const result = await payment.get({ id: paymentId });
  return {
    id: String(result.id),
    status: result.status, // "approved" | "pending" | "rejected" | ...
    externalReference: result.external_reference ?? null,
    transactionAmount: result.transaction_amount ?? null,
  };
}
