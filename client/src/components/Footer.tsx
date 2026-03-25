import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">⚖</span>
              </div>
              <h3 className="text-lg font-bold">Abogada</h3>
            </div>
            <p className="text-white/80 text-sm">
              Especializada en Derecho Inmobiliario y Sucesiones. 29 años de experiencia al servicio de tu patrimonio.
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
                <span>+54 (11) XXXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <span>consultas@abogada.com.ar</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Sígueme</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
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
              &copy; {currentYear} Abogada Especializada en Derecho Inmobiliario y Sucesiones. Todos los derechos reservados.
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
