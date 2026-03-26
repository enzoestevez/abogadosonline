import { Mail, Phone, MapPin, Linkedin, MessageCircle, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "5492304485586";
  const whatsappMessage = "Hola, me gustaría consultar sobre vuestros servicios de sucesiones y operaciones inmobiliarias.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const instagramUrl = "https://instagram.com/escalanteyestevezabogados";

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663434619169/CQG6oQ9beN45qyBHBoNTJu/escalante-estevez-logo_8c651fd4.jpg" alt="Escalante & Estévez" className="w-12 h-12 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold leading-tight">Escalante &<br />Estévez</h3>
                <p className="text-xs text-white/70">Abogados</p>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Especialistas en Derecho Inmobiliario, Sucesiones y Planificación Patrimonial. 29 años de experiencia al servicio de tu patrimonio.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#servicios-inmobiliarios" className="hover:text-accent transition-colors">
                  Operaciones Inmobiliarias
                </a>
              </li>
              <li>
                <a href="#sucesiones" className="hover:text-accent transition-colors">
                  Sucesiones
                </a>
              </li>
              <li>
                <a href="#sucesiones" className="hover:text-accent transition-colors">
                  Planificación Patrimonial
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <span>+54 9 230 448-5586</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <span>escalanteyestevezabogados@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span>Rivadavia 576, Pte. Derqui</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Contacto Directo</h4>
            <div className="flex gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
                title="Contactar por WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg flex items-center justify-center transition-colors"
                title="Seguir en Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <p className="text-sm text-white/80 mt-6">
              Disponible para consultas presenciales y virtuales.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
            <p>
              &copy; {currentYear} Escalante & Estévez Abogados. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 md:justify-end">
              <a href="#" className="hover:text-accent transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
