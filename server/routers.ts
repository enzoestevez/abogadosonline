import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { saveSuccessionConsultation, saveDivorceConsultation } from "./db";

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
  }),
});

export type AppRouter = typeof appRouter;
