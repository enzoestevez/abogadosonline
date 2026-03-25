import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuccessionLeadForm from "@/components/SuccessionLeadForm";
import DivorceLeadForm from "@/components/DivorceLeadForm";

export default function DiagnosticPage() {
  const [activeTab, setActiveTab] = useState("succession");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Diagnósticos Gratuitos</h1>
          <p className="text-xl text-blue-100">
            Selecciona el tipo de consulta que necesitas y completa nuestro formulario interactivo
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="succession" className="text-base">
              Sucesiones
            </TabsTrigger>
            <TabsTrigger value="divorce" className="text-base">
              Divorcios
            </TabsTrigger>
          </TabsList>

          {/* Succession Tab */}
          <TabsContent value="succession" className="mt-0">
            <SuccessionLeadForm />
          </TabsContent>

          {/* Divorce Tab */}
          <TabsContent value="divorce" className="mt-0">
            <DivorceLeadForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
