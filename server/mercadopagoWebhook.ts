import type { Express, Request, Response } from "express";
import { getPaymentStatus } from "./mercadopago";
import { updateAppointmentPaymentStatus, getAppointmentById } from "./db";
import { sendAppointmentPaidEmail } from "./notifications";

/**
 * Mercado Pago llama a esta URL (configurada como notification_url al crear
 * la preferencia) cada vez que cambia el estado de un pago. Puede llegar
 * como query params (?type=payment&data.id=123) o como body JSON
 * ({ type: "payment", data: { id: "123" } }), dependiendo de la
 * integración. Contemplamos ambos casos.
 *
 * CRÍTICO: nunca confiar en el "status" que venga en el payload del
 * webhook en sí. Siempre volvemos a consultar el pago contra la API
 * oficial de Mercado Pago (getPaymentStatus) antes de marcar algo como
 * pagado. Así evitamos que alguien falsifique una llamada al webhook.
 */
export function registerMercadoPagoWebhook(app: Express) {
  app.post("/api/mercadopago/webhook", async (req: Request, res: Response) => {
    try {
      const type = (req.query.type as string) || req.body?.type;
      const paymentId =
        (req.query["data.id"] as string) ||
        req.body?.data?.id ||
        req.body?.id;

      // Respondemos 200 rápido en cualquier notificación que no sea de pago
      // (Mercado Pago también manda otros tipos de eventos que ignoramos).
      if (type !== "payment" || !paymentId) {
        return res.sendStatus(200);
      }

      const payment = await getPaymentStatus(String(paymentId));

      if (!payment.externalReference) {
        console.warn("[mercadopago webhook] Pago sin external_reference:", payment.id);
        return res.sendStatus(200);
      }

      const appointmentId = parseInt(payment.externalReference, 10);
      if (Number.isNaN(appointmentId)) {
        return res.sendStatus(200);
      }

      if (payment.status === "approved") {
        await updateAppointmentPaymentStatus({
          appointmentId,
          paymentStatus: "paid",
          mpPaymentId: payment.id,
        });

        // Avisar por email que hay un turno nuevo y pago. Si esto falla,
        // no debe afectar la confirmación del pago en sí (ya se guardó
        // arriba); solo lo logueamos.
        try {
          const appt = await getAppointmentById(appointmentId);
          if (appt) {
            await sendAppointmentPaidEmail({
              consultationType: appt.consultationType,
              clientName: appt.clientName,
              clientEmail: appt.clientEmail,
              clientPhone: appt.clientPhone,
              appointmentDate: appt.appointmentDate,
              appointmentTime: appt.appointmentTime,
              amount: appt.amount,
              mpPaymentId: payment.id,
            });
          }
        } catch (emailError) {
          console.error("[mercadopago webhook] No se pudo enviar el email de aviso:", emailError);
        }
      } else if (payment.status === "rejected" || payment.status === "cancelled") {
        await updateAppointmentPaymentStatus({
          appointmentId,
          paymentStatus: "failed",
          mpPaymentId: payment.id,
        });
      }
      // Si está "pending" o "in_process" no hacemos nada todavía: esperamos
      // la próxima notificación cuando cambie de estado.

      return res.sendStatus(200);
    } catch (error) {
      console.error("[mercadopago webhook] Error procesando notificación:", error);
      // Devolvemos 200 igual para que Mercado Pago no reintente en loop
      // indefinidamente por un error nuestro; el log queda para revisar.
      return res.sendStatus(200);
    }
  });
}
