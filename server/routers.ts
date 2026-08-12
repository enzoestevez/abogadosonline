import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import {
  saveSuccessionConsultation,
  saveDivorceConsultation,
  saveAppointment,
  getAppointmentsByDateAndTime,
  saveDiagnostic,
  getAppointmentById,
  setAppointmentPreference,
} from "./db.js";
import { createPaymentPreference } from "./mercadopago.js";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  forms: router({
    // Guardar consulta de sucesión en la base de datos
    saveSuccession: publicProcedure
      .input(z.object({
        hasWill: z.string(),
        deceasedType: z.string(),
        maritalStatus: z.string(),
        hasChildren: z.string(),
        heirstAgreement: z.string(),
        heirName: z.string(),
        heirEmail: z.string(),
        heirPhone: z.string(),
        diagnosis: z.any().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await saveSuccessionConsultation({
            hasWill: input.hasWill,
            deceasedType: input.deceasedType,
            maritalStatus: input.maritalStatus,
            hasChildren: input.hasChildren,
            heirstAgreement: input.heirstAgreement,
            heirName: input.heirName,
            heirEmail: input.heirEmail,
            heirPhone: input.heirPhone,
            diagnosis: input.diagnosis ? JSON.stringify(input.diagnosis) : null,
          });
          return { success: true };
        } catch (error) {
          console.error('Error guardando consulta de sucesión:', error);
          return { success: false, error: String(error) };
        }
      }),

    // Guardar consulta de divorcio en la base de datos
    saveDivorce: publicProcedure
      .input(z.object({
        hasChildren: z.string(),
        childrenAges: z.string(),
        hasAssets: z.string(),
        contactName: z.string(),
        contactEmail: z.string(),
        contactPhone: z.string(),
        diagnosis: z.any().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          await saveDivorceConsultation({
            hasChildren: input.hasChildren,
            childrenAges: input.childrenAges,
            hasAssets: input.hasAssets,
            contactName: input.contactName,
            contactEmail: input.contactEmail,
            contactPhone: input.contactPhone,
            diagnosis: input.diagnosis ? JSON.stringify(input.diagnosis) : null,
          });
          return { success: true };
        } catch (error) {
          console.error('Error guardando consulta de divorcio:', error);
          return { success: false, error: String(error) };
        }
      }),

    // Guardar cita agendada
    saveAppointment: publicProcedure
      .input(z.object({
        consultationType: z.string(),
        clientName: z.string(),
        clientEmail: z.string(),
        clientPhone: z.string(),
        appointmentDate: z.string(),
        appointmentTime: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          // Verificar disponibilidad
          const existing = await getAppointmentsByDateAndTime(input.appointmentDate, input.appointmentTime);
          if (existing.length > 0) {
            return { success: false, error: "Este horario ya no está disponible" };
          }

          await saveAppointment({
            consultationType: input.consultationType,
            clientName: input.clientName,
            clientEmail: input.clientEmail,
            clientPhone: input.clientPhone,
            appointmentDate: input.appointmentDate,
            appointmentTime: input.appointmentTime,
            status: "confirmed",
            notes: input.notes || null,
          });
          return { success: true };
        } catch (error) {
          console.error('Error guardando cita:', error);
          return { success: false, error: String(error) };
        }
      }),

    // Enviar a Formspree (después de guardar)
    submitSuccession: publicProcedure
      .input(z.object({
        hasWill: z.string(),
        deceasedType: z.string(),
        maritalStatus: z.string(),
        hasChildren: z.string(),
        heirstAgreement: z.string(),
        heirName: z.string(),
        heirEmail: z.string(),
        heirPhone: z.string(),
        diagnosis: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          const formData = new FormData();
          formData.append('hasWill', input.hasWill);
          formData.append('deceasedType', input.deceasedType);
          formData.append('maritalStatus', input.maritalStatus);
          formData.append('hasChildren', input.hasChildren);
          formData.append('heirstAgreement', input.heirstAgreement);
          formData.append('heirName', input.heirName);
          formData.append('heirEmail', input.heirEmail);
          formData.append('heirPhone', input.heirPhone);
          formData.append('formType', 'Sucesión');
          formData.append('diagnosis', input.diagnosis);

          const response = await fetch('https://formspree.io/f/xpwdkngy', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Formspree error: ${response.status}`);
          }

          return { success: true };
        } catch (error) {
          console.error('Error enviando a Formspree:', error);
          return { success: false, error: String(error) };
        }
      }),

    // Enviar a Formspree (después de guardar)
    submitDivorce: publicProcedure
      .input(z.object({
        hasChildren: z.string(),
        childrenAges: z.string(),
        hasAssets: z.string(),
        contactName: z.string(),
        contactEmail: z.string(),
        contactPhone: z.string(),
        diagnosis: z.string(),
      }))
      .mutation(async ({ input }) => {
        try {
          const formData = new FormData();
          formData.append('hasChildren', input.hasChildren);
          formData.append('childrenAges', input.childrenAges);
          formData.append('hasAssets', input.hasAssets);
          formData.append('contactName', input.contactName);
          formData.append('contactEmail', input.contactEmail);
          formData.append('contactPhone', input.contactPhone);
          formData.append('formType', 'Divorcio');
          formData.append('diagnosis', input.diagnosis);

          const response = await fetch('https://formspree.io/f/xpwdkngy', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Formspree error: ${response.status}`);
          }

          return { success: true };
        } catch (error) {
          console.error('Error enviando a Formspree:', error);
          return { success: false, error: String(error) };
        }
      }),

    // Guardar diagnóstico y enviar por email
    saveDiagnosticAndEmail: publicProcedure
      .input(z.object({
        consultationType: z.string(),
        clientName: z.string(),
        clientEmail: z.string(),
        clientPhone: z.string(),
        diagnosisTitle: z.string(),
        diagnosisDescription: z.string(),
        requiredDocuments: z.array(z.string()),
        nextSteps: z.array(z.string()),
        importantNotes: z.array(z.string()),
        formAnswers: z.any().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          // Guardar diagnóstico en BD
          await saveDiagnostic({
            consultationType: input.consultationType,
            clientName: input.clientName,
            clientEmail: input.clientEmail,
            clientPhone: input.clientPhone,
            diagnosisTitle: input.diagnosisTitle,
            diagnosisDescription: input.diagnosisDescription,
            requiredDocuments: input.requiredDocuments,
            nextSteps: input.nextSteps,
            importantNotes: input.importantNotes,
            formAnswers: input.formAnswers,
          });

          // Enviar email con Formspree
          const formData = new FormData();
          formData.append('name', input.clientName);
          formData.append('email', input.clientEmail);
          formData.append('phone', input.clientPhone);
          formData.append('consultation_type', input.consultationType);
          formData.append('diagnosis_title', input.diagnosisTitle);
          formData.append('diagnosis_description', input.diagnosisDescription);
          formData.append('required_documents', input.requiredDocuments.join(', '));
          formData.append('next_steps', input.nextSteps.join(', '));
          formData.append('important_notes', input.importantNotes.join(', '));
          formData.append('email_type', 'diagnosis_result');

          const response = await fetch('https://formspree.io/f/xpwdkngy', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            console.warn('Email send failed but diagnostic saved:', response.status);
          }

          return { 
            success: true,
            diagnostic: {
              title: input.diagnosisTitle,
              description: input.diagnosisDescription,
              requiredDocuments: input.requiredDocuments,
              nextSteps: input.nextSteps,
              importantNotes: input.importantNotes,
            }
          };
        } catch (error) {
          console.error('Error saving diagnostic:', error);
          return { success: false, error: String(error) };
        }
      }),
  }),

  payments: router({
    // Crea la cita (en estado "pending") + la preferencia de pago de Mercado Pago,
    // y devuelve el link de checkout al que hay que redirigir al usuario.
    createPreference: publicProcedure
      .input(z.object({
        consultationType: z.string(),
        clientName: z.string(),
        clientEmail: z.string(),
        clientPhone: z.string(),
        appointmentDate: z.string(),
        appointmentTime: z.string(),
        amount: z.number().positive(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const existing = await getAppointmentsByDateAndTime(input.appointmentDate, input.appointmentTime);
          if (existing.length > 0) {
            return { success: false as const, error: "Este horario ya no está disponible" };
          }

          const appointmentId = await saveAppointment({
            consultationType: input.consultationType,
            clientName: input.clientName,
            clientEmail: input.clientEmail,
            clientPhone: input.clientPhone,
            appointmentDate: input.appointmentDate,
            appointmentTime: input.appointmentTime,
            status: "pending",
            paymentStatus: "pending",
            amount: input.amount,
            notes: null,
          });

          if (!appointmentId) {
            return { success: false as const, error: "No se pudo crear la cita" };
          }

          // Base pública del sitio (necesaria para que Mercado Pago pueda
          // redirigir de vuelta y para el webhook). Configurar PUBLIC_SITE_URL
          // en las variables de entorno de producción.
          const origin = process.env.PUBLIC_SITE_URL || "";
          if (!origin) {
            console.warn("[payments] PUBLIC_SITE_URL no está configurada, back_urls quedarán vacías");
          }

          const preference = await createPaymentPreference({
            appointmentId,
            amount: input.amount,
            description: input.description || `Consulta legal - ${input.consultationType}`,
            payerEmail: input.clientEmail,
            successUrl: `${origin}/gracias-turno?appointment_id=${appointmentId}`,
            failureUrl: `${origin}/?pago=fallido`,
            pendingUrl: `${origin}/?pago=pendiente`,
            notificationUrl: `${origin}/api/mercadopago/webhook`,
          });

          await setAppointmentPreference(appointmentId, preference.id);

          return { success: true as const, initPoint: preference.init_point, appointmentId };
        } catch (error) {
          console.error("Error creando preferencia de pago:", error);
          return { success: false as const, error: String(error) };
        }
      }),

    // Usado por la página de "gracias" para confirmar, ANTES de disparar
    // la conversión de Google Ads, que el pago realmente se acreditó
    // (fuente de verdad = nuestra base de datos, actualizada solo por el webhook).
    getAppointmentStatus: publicProcedure
      .input(z.object({ appointmentId: z.number() }))
      .query(async ({ input }) => {
        const appt = await getAppointmentById(input.appointmentId);
        if (!appt) return { found: false as const };
        return {
          found: true as const,
          status: appt.status,
          paymentStatus: appt.paymentStatus,
          amount: appt.amount,
          appointmentDate: appt.appointmentDate,
          appointmentTime: appt.appointmentTime,
          consultationType: appt.consultationType,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
