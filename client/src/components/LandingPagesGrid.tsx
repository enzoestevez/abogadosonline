import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Heart, 
  ScrollText, 
  Users, 
  Baby, 
  TrendingUp, 
  PieChart, 
  Building2 
} from "lucide-react";

interface LandingPageItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

const landingPages: LandingPageItem[] = [
  {
    id: "sucesiones",
    title: "Sucesiones",
    description: "Planificación preventiva y tramitación de herencias sin conflictos",
    icon: <FileText className="w-8 h-8" />,
    path: "/sucesiones",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "herencias",
    title: "Herencias",
    description: "Reclamación y defensa de derechos hereditarios",
    icon: <Heart className="w-8 h-8" />,
    path: "/herencias",
    color: "from-red-500 to-red-600"
  },
  {
    id: "testamento",
    title: "Testamento",
    description: "Redacción y validación de testamentos seguros",
    icon: <ScrollText className="w-8 h-8" />,
    path: "/testamento",
    color: "from-amber-500 to-amber-600"
  },
  {
    id: "divorcios",
    title: "Divorcios",
    description: "Tramitación rápida y eficiente de divorcios",
    icon: <Users className="w-8 h-8" />,
    path: "/divorcios",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "custodia",
    title: "Custodia de Hijos",
    description: "Protección de derechos de menores en conflictos familiares",
    icon: <Baby className="w-8 h-8" />,
    path: "/custodia-hijos",
    color: "from-pink-500 to-pink-600"
  },
  {
    id: "fideicomisos",
    title: "Fideicomisos",
    description: "Estructuras patrimoniales seguras y eficientes",
    icon: <TrendingUp className="w-8 h-8" />,
    path: "/fideicomisos",
    color: "from-green-500 to-green-600"
  },
  {
    id: "planificacion",
    title: "Planificación Patrimonial",
    description: "Estrategias integrales de protección y gestión de activos",
    icon: <PieChart className="w-8 h-8" />,
    path: "/planificacion-patrimonial",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    id: "inmobiliario",
    title: "Conflictos Inmobiliarios",
    description: "Resolución de disputas en operaciones inmobiliarias",
    icon: <Building2 className="w-8 h-8" />,
    path: "/inmobiliario",
    color: "from-slate-500 to-slate-600"
  }
];

export default function LandingPagesGrid() {
  return (
    <section id="landing-pages-grid" className="py-16 bg-gradient-to-b from-background to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Especializaciones
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Accede a nuestras especializaciones y observa nuestros casos de éxito y lee de qué trata el tema. Puedes obtener un diagnóstico gratuito o agendar una consulta con nosotros directamente.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {landingPages.map((page) => (
            <Link key={page.id} href={page.path} asChild>
              <a className="block h-full">
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden">
                  <div className={`h-24 bg-gradient-to-r ${page.color} flex items-center justify-center text-white group-hover:scale-105 transition-transform`}>
                    {page.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {page.description}
                    </p>
                    <div className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-center font-medium">
                      Acceder
                    </div>
                  </div>
                </Card>
              </a>
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
}
