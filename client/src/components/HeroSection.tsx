import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Briefcase } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Protege tu patrimonio con seguridad jurídica
              </h1>
              <p className="text-xl text-white/90 font-light">
                Asesoramiento integral en operaciones inmobiliarias, sucesiones y planificación patrimonial. 29 años de experiencia al servicio de tu familia y tu negocio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/diagnostico">
                <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg rounded-lg shadow-lg">
                  Diagnóstico Gratuito <ArrowRight className="ml-2" size={20} />
                </Button>
              </a>
              <a href="#servicios-inmobiliarios">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
                >
                  Conocer Servicios
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold text-accent">29+</p>
                <p className="text-sm text-white/80">Años de Experiencia</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">500+</p>
                <p className="text-sm text-white/80">Clientes Satisfechos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">100%</p>
                <p className="text-sm text-white/80">Confidencialidad</p>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="hidden md:flex flex-col gap-6">
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Operaciones Inmobiliarias</h3>
                  <p className="text-sm text-white/80 mt-2">
                    Análisis de títulos, compraventa y asesoramiento en operaciones inmobiliarias
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Sucesiones</h3>
                  <p className="text-sm text-white/80 mt-2">
                    Planificación preventiva y tramitación de herencias sin conflictos
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Patrimonio</h3>
                  <p className="text-sm text-white/80 mt-2">
                    Estrategias integrales de protección y gestión de activos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
