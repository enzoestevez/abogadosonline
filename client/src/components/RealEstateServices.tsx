import { Card } from "@/components/ui/card";
import { CheckCircle2, Building2, FileText, TrendingUp, Users } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Análisis de Títulos y Cargas",
    description: "Revisión exhaustiva de títulos de propiedad, gravámenes, hipotecas y cualquier carga que afecte el inmueble. Identificamos riesgos legales antes de cualquier operación.",
    highlights: ["Análisis de títulos", "Identificación de gravámenes", "Certificado de dominio"],
    honorarios: "5 a 10 UMA/JUS",
  },
  {
    icon: Building2,
    title: "Compraventa de Inmuebles",
    description: "Redacción y asesoramiento en boletos de compraventa, escrituras públicas y contratos inmobiliarios con cláusulas de protección para ambas partes.",
    highlights: ["Boletos de compraventa", "Escrituras públicas", "Protección contractual"],
    honorarios: "1% a 5% de la operación",
  },
  {
    icon: FileText,
    title: "Contratos de Locación",
    description: "Elaboración de contratos de alquiler con cláusulas claras, protección de derechos del propietario y cumplimiento de normativas vigentes.",
    highlights: ["Contratos comerciales", "Locaciones residenciales", "Garantías"],
    honorarios: "Honorario fijo según complejidad",
  },
  {
    icon: TrendingUp,
    title: "Asesoramiento Inmobiliario",
    description: "Consultoría integral para operaciones inmobiliarias, análisis de viabilidad legal y estrategia para maximizar protección patrimonial.",
    highlights: ["Análisis de operaciones", "Evaluación de riesgos", "Estrategia legal"],
    honorarios: "Honorario fijo o por hito",
  },
];

export default function RealEstateServices() {
  return (
    <section id="servicios-inmobiliarios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Servicios Inmobiliarios
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluciones legales integrales para proteger tus inversiones inmobiliarias y optimizar tus operaciones
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card
                key={idx}
                className="p-8 hover:shadow-lg transition-all border border-border hover:border-accent/50 group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <Icon className="text-primary group-hover:text-accent transition-colors" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                    <p className="text-sm text-accent font-semibold mt-1">{service.honorarios}</p>
                  </div>
                </div>

                <p className="text-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="text-accent flex-shrink-0" size={18} />
                      <span className="text-sm text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Key Benefits */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">
            Por qué elegirnos
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-accent" size={24} />
              </div>
              <h4 className="font-bold text-primary mb-2">Experiencia Probada</h4>
              <p className="text-sm text-muted-foreground">
                Más de 29 años asesorando en operaciones inmobiliarias de alto valor
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-accent" size={24} />
              </div>
              <h4 className="font-bold text-primary mb-2">Prevención de Riesgos</h4>
              <p className="text-sm text-muted-foreground">
                Identificamos y mitigamos riesgos legales antes de que se conviertan en problemas
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-accent" size={24} />
              </div>
              <h4 className="font-bold text-primary mb-2">Asesoramiento Integral</h4>
              <p className="text-sm text-muted-foreground">
                Soluciones personalizadas adaptadas a tus necesidades específicas y objetivos patrimoniales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
