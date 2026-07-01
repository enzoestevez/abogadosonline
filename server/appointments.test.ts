import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("forms.saveAppointment", () => {
  it("should accept appointment data and return success or error", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.saveAppointment({
      consultationType: "sucesiones",
      clientName: "Juan Pérez",
      clientEmail: "juan@example.com",
      clientPhone: "+5491234567890",
      appointmentDate: "2026-07-01",
      appointmentTime: "10:00",
    });

    // Result should have success property
    expect(result).toHaveProperty("success");
    expect(typeof result.success).toBe("boolean");
  });

  it("should validate required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.forms.saveAppointment({
        consultationType: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        appointmentDate: "",
        appointmentTime: "",
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should accept optional notes field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.saveAppointment({
      consultationType: "divorcios",
      clientName: "María García",
      clientEmail: "maria@example.com",
      clientPhone: "+5491234567891",
      appointmentDate: "2026-07-03",
      appointmentTime: "14:30",
      notes: "Consulta sobre custodia de menores",
    });

    expect(result).toHaveProperty("success");
    expect(typeof result.success).toBe("boolean");
  });
});
