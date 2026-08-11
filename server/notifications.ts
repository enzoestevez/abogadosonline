/**
 * Envío de notificaciones por email usando Formspree, con el mismo endpoint
 * que ya usa el resto del sitio (formularios de diagnóstico, etc.).
 *
 * Se llama exclusivamente desde el webhook de Mercado Pago, una vez que el
 * pago fue verificado como "approved" contra la API real de Mercado Pago.
 */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwdkngy";

interface AppointmentPaidEmailParams {
  consultationType: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  amount: number | null;
  mpPaymentId: string;
}

export async function sendAppointmentPaidEmail(params: AppointmentPaidEmailParams) {
  const formData = new FormData();
  formData.append("email_type", "turno_pagado");
  formData.append("consultation_type", params.consultationType);
  formData.append("name", params.clientName);
  formData.append("email", params.clientEmail);
  formData.append("phone", params.clientPhone);
  formData.append("appointment_date", params.appointmentDate);
  formData.append("appointment_time", params.appointmentTime);
  formData.append("amount", params.amount != null ? String(params.amount) : "N/A");
  formData.append("mercadopago_payment_id", params.mpPaymentId);
  formData.append(
    "message",
    `Nuevo turno CONFIRMADO Y PAGADO\n\n` +
      `Cliente: ${params.clientName}\n` +
      `Email: ${params.clientEmail}\n` +
      `Teléfono: ${params.clientPhone}\n` +
      `Tipo de consulta: ${params.consultationType}\n` +
      `Fecha: ${params.appointmentDate} - Hora: ${params.appointmentTime}\n` +
      `Monto abonado: $${params.amount ?? "N/A"} ARS\n` +
      `ID de pago Mercado Pago: ${params.mpPaymentId}`
  );

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Formspree error notificando turno pagado: ${response.status}`);
  }
}
