import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema.js";
import { ENV } from './_core/env.js';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { successionConsultations, divorceConsultations, InsertSuccessionConsultation, InsertDivorceConsultation } from "../drizzle/schema.js";

export async function saveSuccessionConsultation(data: InsertSuccessionConsultation) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save consultation: database not available");
    return null;
  }

  try {
    const result = await db.insert(successionConsultations).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to save succession consultation:", error);
    throw error;
  }
}

export async function saveDivorceConsultation(data: InsertDivorceConsultation) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save consultation: database not available");
    return null;
  }

  try {
    const result = await db.insert(divorceConsultations).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to save divorce consultation:", error);
    throw error;
  }
}

export async function saveAppointment(data: any): Promise<number | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save appointment: database not available");
    return null;
  }

  try {
    const { appointments } = await import("../drizzle/schema.js");
    const result: any = await db.insert(appointments).values(data);
    // drizzle-orm/mysql2 devuelve [ResultSetHeader, FieldPacket[]]
    const insertId = result?.[0]?.insertId ?? result?.insertId ?? null;
    return insertId;
  } catch (error) {
    console.error("[Database] Failed to save appointment:", error);
    throw error;
  }
}

export async function getAppointmentById(id: number) {
  const db = await getDb();
  if (!db) return null;
  try {
    const { appointments } = await import("../drizzle/schema.js");
    const result = await db.select().from(appointments).where(eq(appointments.id, id));
    return result[0] ?? null;
  } catch (error) {
    console.error("[Database] Failed to get appointment by id:", error);
    return null;
  }
}

export async function setAppointmentPreference(id: number, mpPreferenceId: string) {
  const db = await getDb();
  if (!db) return;
  try {
    const { appointments } = await import("../drizzle/schema.js");
    await db.update(appointments).set({ mpPreferenceId }).where(eq(appointments.id, id));
  } catch (error) {
    console.error("[Database] Failed to set appointment preference:", error);
  }
}

/**
 * Marca una cita como pagada/confirmada o fallida. Esta función es la
 * ÚNICA fuente de verdad sobre si un pago se acreditó: la llama
 * exclusivamente el webhook de Mercado Pago después de validar el pago
 * directamente contra la API de Mercado Pago (nunca confiar en el
 * navegador del cliente para esto).
 */
export async function updateAppointmentPaymentStatus(params: {
  appointmentId: number;
  paymentStatus: "paid" | "failed" | "refunded";
  mpPaymentId: string;
}) {
  const db = await getDb();
  if (!db) return;
  try {
    const { appointments } = await import("../drizzle/schema.js");
    await db
      .update(appointments)
      .set({
        paymentStatus: params.paymentStatus,
        mpPaymentId: params.mpPaymentId,
        status: params.paymentStatus === "paid" ? "confirmed" : "pending",
      })
      .where(eq(appointments.id, params.appointmentId));
  } catch (error) {
    console.error("[Database] Failed to update appointment payment status:", error);
  }
}

export async function getAppointmentsByDateAndTime(date: string, time: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get appointments: database not available");
    return [];
  }

  try {
    const { appointments } = await import("../drizzle/schema.js");
    const { and } = await import("drizzle-orm");
    const result = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.appointmentDate, date),
          eq(appointments.appointmentTime, time),
          eq(appointments.status, "confirmed")
        )
      );
    return result;
  } catch (error) {
    console.error("[Database] Failed to get appointments:", error);
    return [];
  }
}

export async function saveDiagnostic(data: any) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save diagnostic: database not available");
    return null;
  }

  try {
    const { diagnostics } = await import("../drizzle/schema.js");
    const result = await db.insert(diagnostics).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to save diagnostic:", error);
    throw error;
  }
}
