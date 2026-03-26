import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    toast.success("¡Gracias por tu consulta! Me pondré en contacto pronto.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Contacto
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Solicita tu consulta y comencemos a proteger tu patrimonio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <Card className="p-8 text-center hover:shadow-lg transition-all border border-border">
            <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="text-accent" size={28} />
            </div>
            <h3 className="font-bold text-primary mb-2">Teléfono</h3>
            <p className="text-foreground font-semibold">+54 9 230 448-5586</p>
            <p className="text-sm text-muted-foreground mt-2">WhatsApp disponible</p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-all border border-border">
            <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="text-accent" size={28} />
            </div>
            <h3 className="font-bold text-primary mb-2">Email</h3>
            <p className="text-foreground font-semibold">escalanteyestevezabogados@gmail.com</p>
            <p className="text-sm text-muted-foreground mt-2">Respuesta en 24 horas</p>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-all border border-border">
            <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-accent" size={28} />
            </div>
            <h3 className="font-bold text-primary mb-2">Ubicación</h3>
            <p className="text-foreground font-semibold">Rivadavia 576, Pte. Derqui</p>
            <p className="text-sm text-muted-foreground mt-2">Pilar, Buenos Aires, Argentina</p>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto p-12 bg-white border border-border">
          <h3 className="text-2xl font-bold text-primary mb-8">
            Solicita tu Consulta
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+54 (11) XXXX-XXXX"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Servicio de Interés
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="due-diligence">Due Diligence Inmobiliaria</option>
                  <option value="fideicomisos">Fideicomisos</option>
                  <option value="sucesiones">Sucesiones</option>
                  <option value="planificacion">Planificación Patrimonial</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Mensaje
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntame sobre tu situación..."
                rows={5}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg text-lg"
            >
              Enviar Consulta
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Respetamos tu privacidad. Tus datos serán tratados con confidencialidad absoluta.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
