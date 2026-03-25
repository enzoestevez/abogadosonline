import { Card } from "@/components/ui/card";
import { Award, BookOpen, Users, Briefcase } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Sobre Mí
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-4">
                Soy abogada desde 1997, con una trayectoria de casi 30 años dedicada al derecho laboral, donde he representado exitosamente a la parte actora en cientos de casos. Esta experiencia me ha dado una perspectiva única sobre cómo prevenir conflictos y proteger los intereses de mis clientes.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Completé una diplomatura en Planificación Patrimonial, lo que me permitió ampliar mi visión hacia la protección integral del patrimonio familiar y empresarial. Hoy, he decidido reorientar mi práctica hacia el Derecho Inmobiliario y Sucesiones, donde puedo ofrecer soluciones estratégicas, preventivas y de alto valor para familias y empresarios.
              </p>
            </div>

            {/* Key Values */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Award className="text-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-primary">Experiencia</h4>
                  <p className="text-sm text-muted-foreground">29 años en derecho</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="text-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-primary">Formación</h4>
                  <p className="text-sm text-muted-foreground">Diplomatura especializada</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-primary">Clientes</h4>
                  <p className="text-sm text-muted-foreground">500+ satisfechos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="text-accent flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-primary">Enfoque</h4>
                  <p className="text-sm text-muted-foreground">Preventivo e integral</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Highlights */}
          <div className="space-y-6">
            {/* Card 1 */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-primary mb-4">Mi Filosofía</h3>
              <p className="text-foreground leading-relaxed">
                Creo que la mejor asesoría legal es aquella que previene problemas antes de que ocurran. Por eso, mi enfoque se centra en el asesoramiento estratégico, preventivo y en la protección integral del patrimonio de mis clientes.
              </p>
            </Card>

            {/* Card 2 */}
            <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/10 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-primary mb-4">Especialidades</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Real Estate y Derecho Inmobiliario
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Sucesiones y Planificación Patrimonial
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Fideicomisos y Estructuras Patrimoniales
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Asesoramiento Preventivo
                </li>
              </ul>
            </Card>

            {/* Card 3 */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-primary mb-4">Compromiso</h3>
              <p className="text-foreground leading-relaxed">
                Confidencialidad absoluta, transparencia en los honorarios, y plazos de cobro predecibles basados en hitos claros. Tu patrimonio y tu familia merecen la mejor asesoría.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
