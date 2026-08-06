import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuccessionLeadForm from "@/components/SuccessionLeadForm";
import DivorceLeadForm from "@/components/DivorceLeadForm";

export default function DiagnosticPage() {
  const [activeTab, setActiveTab] = useState("sucesiones");

  const specialties = [
    { id: "sucesiones", label: "Sucesiones" },
    { id: "testamentos", label: "Testamentos" },
    { id: "divorcios", label: "Divorcios" },

    { id: "cuota_alimentaria", label: "Cuota Alimentaria" },
    { id: "patrimonial", label: "Planificación Patrimonial" },
    { id: "fideicomisos", label: "Fideicomisos" },
    { id: "inmobiliario", label: "Servicios Inmobiliarios" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Diagnósticos Gratuitos</h1>
          <p className="text-xl text-blue-100">
            Selecciona el área de especialidad que necesitas y completa nuestro formulario interactivo
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-2 mb-8 h-auto p-2">
            {specialties.map((specialty) => (
              <TabsTrigger key={specialty.id} value={specialty.id} className="text-xs md:text-sm">
                {specialty.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Succession/Testamentos/Patrimonial/Fideicomisos Forms */}
          {["sucesiones", "testamentos", "patrimonial", "fideicomisos"].includes(activeTab) && (
            <TabsContent value={activeTab} className="mt-0">
              <SuccessionLeadForm consultationType={activeTab} />
            </TabsContent>
          )}

          {/* Divorce/Alimentos/Custodia/Inmobiliario Forms */}
          {["divorcios", "cuota_alimentaria", "inmobiliario"].includes(activeTab) && (
            <TabsContent value={activeTab} className="mt-0">
              <DivorceLeadForm consultationType={activeTab} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
