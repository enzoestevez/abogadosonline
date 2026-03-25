import { Card } from "@/components/ui/card";
import { CheckCircle2, Heart, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Sucesiones Judiciales y Extrajudiciales",
    description: "Tramitación completa de sucesiones ab intestato o testamentarias con gestión de tracto abreviado para venta.",
    highlights: ["Declaratoria de herederos", "Inscripción de bienes", "Tracto abreviado"],
    honorarios: "6% a 15% del valor de bienes",
  },
  {
    icon: Heart,
    title: "Partición Privada de Herencia",
    description: "Negociación y redacción de acuerdos entre coherederos, evitando procesos judiciales contenciosos.",
    highlights: ["Acuerdos entre herederos", "Adjudicación ágil", "Sin conflictos"],
    honorarios: "2% a 4% del patrimonio",
  },
  {
    icon: Zap,
    title: "Planificación Sucesoria Preventiva",
    description: "Diseño de estrategias para transmisión ordenada del patrimonio en vida, con donaciones y fideicomisos.",
    highlights: ["Donaciones con usufructo", "Testamentos estratégicos", "Fideicomisos familiares"],
    honorarios: "Monto fijo por estrategia",
  },
  {
    icon: Shield,
    title: "Gestión Patrimonial Familiar",
    description: "Asesoramiento continuo post-sucesión sobre administración de bienes y reinversión de capital.",
    highlights: ["Administración de bienes", "Contratos de locación", "Reinversión"],
    honorarios: "Abono mensual o por operación",
  },
];

export default function SuccessionServices() {
  return (
    <section id="sucesiones" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Servicios de Sucesiones
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Planificación y tramitación de sucesiones que protegen a tu familia y evitan conflictos futuros
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card
                key={idx}
                className="p-8 hover:shadow-lg transition-all border border-border hover:border-accent/50 group bg-white"
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

        {/* Process Flow */}
        <div className="bg-white border border-border rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-primary mb-12 text-center">
            Nuestro Proceso de Planificación
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Consulta Inicial", desc: "Análisis de tu situación patrimonial" },
              { step: "2", title: "Diseño Estratégico", desc: "Propuesta personalizada de planificación" },
              { step: "3", title: "Implementación", desc: "Redacción de documentos y estructuras" },
              { step: "4", title: "Seguimiento", desc: "Asesoramiento continuo y actualizaciones" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-primary text-lg">
                  {item.step}
                </div>
                <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
