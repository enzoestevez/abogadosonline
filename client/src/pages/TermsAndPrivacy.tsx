import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function TermsAndPrivacy() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-4xl font-bold">Términos, Condiciones y Privacidad</h1>
          <p className="text-blue-100 mt-2">Escalante & Estévez Abogados</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Política de Privacidad */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Política de Privacidad y Protección de Datos</h2>

          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Responsable del Tratamiento de Datos</h3>
              <p>
                <strong>Titular y Responsable:</strong> Escalante & Estévez Abogados
              </p>
              <p className="mt-2">
                Somos responsables del tratamiento de tus datos personales conforme a la legislación vigente en materia de protección de datos.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Datos que Recopilamos</h3>
              <p>Recopilamos la siguiente información personal:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono / WhatsApp</li>
                <li>Información sobre tu situación legal (respuestas del formulario de diagnóstico)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Finalidad del Tratamiento de Datos</h3>
              <p>Utilizamos tus datos exclusivamente para:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Procesar tu solicitud de consulta legal</li>
                <li>Contactarte para coordinar tu consulta inicial</li>
                <li>Proporcionarte información sobre nuestros servicios</li>
                <li>Mantener comunicación profesional relacionada con tu caso</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Base Legal</h3>
              <p>
                El tratamiento de tus datos se realiza sobre la base de tu consentimiento explícito, que otorgas al aceptar esta política y completar el formulario de diagnóstico.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">5. Seguridad de los Datos</h3>
              <p>
                Implementamos medidas técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, alteración, pérdida o destrucción. Tus datos se almacenan de forma segura y solo son accesibles por personal autorizado de Escalante & Estévez Abogados.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">6. Derecho de Acceso, Rectificación y Supresión</h3>
              <p>
                Tienes derecho a acceder, rectificar o solicitar la supresión de tus datos personales en cualquier momento. Para ejercer estos derechos, contáctanos a través de:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Email: escalanteyestevezabogados@gmail.com</li>
                <li>WhatsApp: +54 (230) 448-5586</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">7. Derecho de Baja y Revocación del Consentimiento</h3>
              <p>
                Puedes revocar tu consentimiento y solicitar la eliminación de tus datos en cualquier momento. Para darte de baja de nuestras comunicaciones o solicitar la eliminación de tu información, contáctanos directamente:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                <p className="font-semibold text-blue-900">Solicitud de Baja:</p>
                <p className="text-blue-800 mt-1">
                  Envía un email a <strong>escalanteyestevezabogados@gmail.com</strong> con el asunto "Solicito Baja de Datos" indicando tu nombre y email, y procederemos a eliminar tu información en un plazo de 5 días hábiles.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">8. Compartición de Datos</h3>
              <p>
                Tus datos personales no serán compartidos con terceros sin tu consentimiento explícito, excepto cuando sea requerido por ley o para el cumplimiento de obligaciones legales.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">9. Duración del Almacenamiento</h3>
              <p>
                Conservaremos tus datos personales durante el tiempo necesario para prestar nuestros servicios y cumplir con las obligaciones legales. Después de finalizada la relación profesional, tus datos se conservarán según lo requerido por la ley.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">10. Cambios en esta Política</h3>
              <p>
                Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en nuestro sitio web.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">11. Contacto</h3>
              <p>
                Si tienes preguntas sobre esta política de privacidad o sobre cómo tratamos tus datos, contáctanos:
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mt-3">
                <p><strong>Escalante & Estévez Abogados</strong></p>
                <p>Email: escalanteyestevezabogados@gmail.com</p>
                <p>WhatsApp: +54 (230) 448-5586</p>
              </div>
            </div>
          </div>
        </section>

        {/* Términos y Condiciones */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Términos y Condiciones de Uso</h2>

          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Aceptación de Términos</h3>
              <p>
                Al utilizar este sitio web y completar nuestros formularios de diagnóstico, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna parte, te recomendamos no utilizar este sitio.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Naturaleza de la Información</h3>
              <p>
                Los diagnósticos y análisis proporcionados en este sitio son de carácter informativo y educativo. No constituyen asesoramiento legal profesional. Para obtener asesoramiento legal personalizado, debes contactar directamente con nuestro equipo de abogados.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Formularios de Diagnóstico</h3>
              <p>
                Al completar nuestros formularios de diagnóstico, proporcionas información que será utilizada exclusivamente para:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Generar un diagnóstico preliminar de tu situación</li>
                <li>Contactarte para ofrecer nuestros servicios profesionales</li>
                <li>Coordinar una consulta inicial</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Responsabilidad Limitada</h3>
              <p>
                Escalante & Estévez Abogados no se responsabiliza por:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Decisiones tomadas basadas únicamente en los diagnósticos del sitio</li>
                <li>Daños indirectos derivados del uso de este sitio</li>
                <li>Interrupciones o errores técnicos del sitio web</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">5. Propiedad Intelectual</h3>
              <p>
                Todo el contenido de este sitio web (textos, diseños, imágenes, logos) es propiedad de Escalante & Estévez Abogados. No está permitida la reproducción, distribución o modificación sin autorización expresa.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">6. Modificaciones del Sitio</h3>
              <p>
                Nos reservamos el derecho de modificar, suspender o discontinuar este sitio web en cualquier momento sin previo aviso.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">7. Ley Aplicable</h3>
              <p>
                Estos términos y condiciones se rigen por las leyes de la República Argentina. Cualquier disputa será resuelta en los tribunales competentes de la jurisdicción correspondiente.
              </p>
            </div>
          </div>
        </section>

        {/* Información de Contacto */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Preguntas sobre Privacidad?</h2>
          <p className="text-gray-700 mb-4">
            Si tienes dudas sobre nuestra política de privacidad o deseas ejercer tus derechos de acceso, rectificación o baja, no dudes en contactarnos:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-blue-600">escalanteyestevezabogados@gmail.com</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-semibold text-gray-800">WhatsApp</p>
              <p className="text-blue-600">+54 (230) 448-5586</p>
            </div>
          </div>
        </section>

        {/* Última actualización */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Última actualización: Abril 2026</p>
        </div>
      </div>
    </div>
  );
}
