/**
 * Entry point del backend para Vercel.
 *
 * En Manus, el servidor corría como un proceso Node persistente
 * (server/_core/index.ts, con app.listen()). Vercel no funciona así: cada
 * request se maneja con una función serverless que se levanta y se apaga.
 * Por eso este archivo arma el mismo Express app (tRPC + OAuth + webhook de
 * Mercado Pago) pero SIN app.listen() y lo exporta como default: Vercel
 * detecta automáticamente que es una app de Express y la usa como handler.
 *
 * El archivo vercel.json redirige todo lo que empieza con /api/ hacia esta
 * función, así que Express sigue viendo las rutas completas
 * (/api/trpc/..., /api/oauth/callback, /api/mercadopago/webhook) tal como
 * las espera.
 *
 * El build y el server para desarrollo local (pnpm dev) siguen usando
 * server/_core/index.ts sin cambios — este archivo es exclusivo para el
 * despliegue en Vercel.
 */
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { registerMercadoPagoWebhook } from "../server/mercadopagoWebhook";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth callback bajo /api/oauth/callback (no se usa en el sitio público,
// se deja por compatibilidad con el código heredado de Manus).
registerOAuthRoutes(app);

// Webhook de Mercado Pago bajo /api/mercadopago/webhook
registerMercadoPagoWebhook(app);

// API principal (tRPC) bajo /api/trpc
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
