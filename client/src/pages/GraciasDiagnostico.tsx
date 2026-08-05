import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, FileText, AlertCircle } from "lucide-react";

interface DiagnosticData {
  title: string;
  description: string;
  requiredDocuments: string[];
  nextSteps: string[];
  importantNotes: string[];
}

export default function GraciasDiagnostico() {
  const [, navigate] = useLocation();
  const [diagnostic, setDiagnostic] = useState<DiagnosticData | null>(null);

  useEffect(() => {
    // Scroll al tope de la página
    window.scrollTo(0, 0);
    
    // Obtener diagnóstico del localStorage
    const storedDiagnostic = localStorage.getItem("currentDiagnostic");
    if (storedDiagnostic) {
      try {
        setDiagnostic(JSON.parse(storedDiagnostic));
      } catch (error) {
        console.error("Error parsing diagnostic:", error);
      }
    }
    
    // Evento de conversión para Google Ads - Diagnóstico completado
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        page_title: "Gracias - Diagnóstico Completado",
        page_path: "/gracias-diagnostico",
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Success Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-block bg-green-100 rounded-full p-4">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
              ¡Tu Diagnóstico Ha Sido Completado!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Gracias por completar tu diagnóstico gratuito. Aquí está tu análisis personalizado.
            </p>
          </div>
        </section>

        {/* Diagnostic Results Section */}
        {diagnostic && (
          <section className="py-12 px-4 bg-blue-50">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Tu Diagnóstico</h2>
                </div>

                {/* Diagnosis Title */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">{diagnostic.title}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{diagnostic.description}</p>
                </div>

                {/* Required Documents */}
                {diagnostic.requiredDocuments && diagnostic.requiredDocuments.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      Documentos Necesarios para la consulta
                    </h4>
                    <ul className="space-y-2">
                      {diagnostic.requiredDocuments.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Next Steps */}
                {diagnostic.nextSteps && diagnostic.nextSteps.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Próximos Pasos</h4>
                    <ol className="space-y-3">
                      {diagnostic.nextSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700">
                          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            {idx + 1}
                          </span>
                          <span className="pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Important Notes */}
                {diagnostic.importantNotes && diagnostic.importantNotes.length > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <h4 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Notas Importantes</h4>
                    <ul className="space-y-2">
                      {diagnostic.importantNotes.map((note, idx) => (
                        <li key={idx} className="text-yellow-900 flex items-start gap-2">
                          <span className="text-yellow-600 font-bold">→</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* What's Next Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">¿Qué Sucede Ahora?</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg border-l-4 border-blue-600 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Revisa tu Diagnóstico</h3>
                    <p className="text-gray-700">
                      Arriba encontrarás tu diagnóstico completo con recomendaciones específicas para tu caso, documentos necesarios y próximos pasos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border-l-4 border-blue-600 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Agendar Consulta</h3>
                    <p className="text-gray-700">
                      Si deseas profundizar en tu caso, puedes agendar una consulta personalizada con nuestros abogados especializados.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border-l-4 border-blue-600 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Contacto Directo</h3>
                    <p className="text-gray-700">
                      Si tienes preguntas urgentes, contáctanos por WhatsApp al +54 230 448-5586 para atención inmediata.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para Dar el Próximo Paso?</h2>
              <p className="text-gray-700 mb-6">
                Agendar una consulta personalizada con nuestros abogados especializados para resolver tu caso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/#agenda-consulta")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 text-lg"
                >
                  Agendar Consulta
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-8 text-lg"
                >
                  Volver al Inicio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-gray-700 mb-4">
                <strong>WhatsApp:</strong> +54 230 448-5586
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> info@escalante-estevez.com
              </p>
              <p className="text-gray-700">
                <strong>Horario de Atención:</strong> Lunes a Viernes, 9:00 AM - 18:00 PM
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
