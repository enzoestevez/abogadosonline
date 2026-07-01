/**
 * Google Ads Event Tracking Utilities
 * Tracks conversions for Google Ads campaigns
 */

// Declare gtag globally
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

/**
 * Track form submission (Diagnóstico)
 */
export const trackDiagnosticoSubmission = (formData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "diagnostico",
      event_label: "diagnostico_form_submitted",
      value: 0, // No monetary value for free diagnostic
      currency: "ARS",
    });
    
    // Also send conversion event
    window.gtag("event", "conversion", {
      send_to: "AW-18190992874/LABEL_DIAGNOSTICO",
    });
  }
};

/**
 * Track WhatsApp click
 */
export const trackWhatsAppClick = (source?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "click", {
      event_category: "whatsapp",
      event_label: `whatsapp_click_${source || "general"}`,
    });
    
    // Also send conversion event
    window.gtag("event", "conversion", {
      send_to: "AW-18190992874/LABEL_WHATSAPP",
    });
  }
};

/**
 * Track appointment booking
 */
export const trackAppointmentBooking = (appointmentData?: {
  date?: string;
  time?: string;
  consultationType?: string;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "book_appointment", {
      event_category: "appointment",
      event_label: appointmentData?.consultationType || "general_consultation",
      value: 50000, // $50.000 ARS - valor de la consulta inicial
      currency: "ARS",
    });
  }
};

/**
 * Track payment success (Reserva Simple)
 */
export const trackPaymentSuccess = (paymentData?: {
  amount?: number;
  currency?: string;
  consultationType?: string;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    const amount = paymentData?.amount || 50000;
    const currency = paymentData?.currency || "ARS";
    
    window.gtag("event", "purchase", {
      event_category: "payment",
      event_label: paymentData?.consultationType || "consultation_booking",
      value: amount,
      currency: currency,
    });
    
    // Send conversion event with value
    window.gtag("event", "conversion", {
      send_to: "AW-18190992874/LABEL_PAGO_TURNO",
      value: amount,
      currency: currency,
    });
  }
};

/**
 * Track page view with custom parameters
 */
export const trackPageView = (pageName: string, pageType?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: pageName,
      page_type: pageType || "landing_page",
    });
  }
};

/**
 * Track custom event
 */
export const trackCustomEvent = (
  eventName: string,
  eventData?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventData || {});
  }
};
