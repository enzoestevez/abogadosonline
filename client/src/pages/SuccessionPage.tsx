import SuccessionLeadForm from "@/components/SuccessionLeadForm";

export default function SuccessionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Diagnóstico de Sucesión</h1>
          <p className="text-xl text-blue-100 mb-6">
            Completa nuestro formulario interactivo y recibe un análisis personalizado de tu situación sucesoria
          </p>
          <p className="text-blue-100">
            Sin costo. Sin compromiso. Información confidencial.
          </p>
        </div>
      </div>

      {/* Form */}
      <SuccessionLeadForm />

      {/* Footer Info */}
      <div className="bg-gray-50 border-t border-gray-200 py-12 px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">7 Pasos</div>
              <p className="text-gray-600">Formulario rápido y sencillo</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">5 min</div>
              <p className="text-gray-600">Tiempo promedio de completación</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">100%</div>
              <p className="text-gray-600">Información confidencial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
