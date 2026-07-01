import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContactButtons from "./FloatingContactButtons";
import LandingCalendar from "./LandingCalendar";


interface LandingPageProps {
  title: string;
  subtitle: string;
  subtitleColor?: string;
  whyChooseItems?: string[];
  differentiator?: string;
  differentiatorContent?: string | string[];
  testimonials?: Array<{
    name: string;
    text: string;
    result: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  formTitle?: string;
  formFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio';
    required?: boolean;
    options?: { value: string; label: string }[];
  }>;
  formspreeEndpoint?: string;
  consultationType?: string;
  showCalendar?: boolean;
  children?: React.ReactNode;
  miniBlogContent?: {
    title: string;
    paragraphs: string[];
  };
}

export default function LandingPageTemplate({
  title,
  subtitle,
  subtitleColor = "text-red-500",
  whyChooseItems = [],
  differentiator = "",
  differentiatorContent = "",
  testimonials = [],
  faqs = [],
  formTitle = "Completa tu Diagnóstico Gratuito",
  formFields = [],
  formspreeEndpoint = "",
  consultationType = "consulta",
  showCalendar = false,
  children,
  miniBlogContent,
}: LandingPageProps) {
  const [showCalendarSection, setShowCalendarSection] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use brand colors: navy blue and gold
  const navyBlue = "#1e3a5f";
  const gold = "#d4af37";



  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <FloatingContactButtons />
      <main className="flex-1">
        {/* Hero Section */}
        <section style={{ background: `linear-gradient(to bottom, ${navyBlue}, #2d5a8c)` }} className="text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p style={{ color: gold }} className="text-xl font-semibold mb-8">{subtitle}</p>
          </div>
        </section>

        {/* Why Choose Section */}
        {whyChooseItems.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">¿Por qué elegir nuestro estudio?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {whyChooseItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <span style={{ color: navyBlue }} className="font-bold text-lg">✓</span>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Differentiator Section */}
        {differentiator && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">{differentiator}</h2>
              {Array.isArray(differentiatorContent) ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {differentiatorContent.map((item, idx) => (
                    <Card key={idx} className="p-4">
                      <p className="text-gray-700">{item}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-700 text-lg">{differentiatorContent}</p>
              )}
            </div>
          </section>
        )}



        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Lo que dicen nuestros clientes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <Card key={idx} className="p-6">
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-green-600 font-semibold">{testimonial.result}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <Card key={idx} className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mini Blog Section */}
        {miniBlogContent && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">{miniBlogContent.title}</h2>
              <div className="space-y-4 text-gray-700">
                {miniBlogContent.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Custom Content */}
        {children && <section className="py-12 px-4">{children}</section>}

        {/* Coverage Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Cobertura Online en CABA y Provincia de Buenos Aires</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: navyBlue }}>100% Online</div>
                <p className="text-gray-700">No es necesario que te desplaces a nuestro estudio. Realizamos consultas, asesoramientos y trámites completamente virtuales.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: gold }}>Cobertura Total</div>
                <p className="text-gray-700">Atendemos a clientes en toda la Ciudad Autónoma de Buenos Aires y la Provincia de Buenos Aires con la misma calidad y profesionalismo.</p>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-8 text-sm">Videollamadas, consultas por correo electrónico, y tramitación digital disponibles para tu comodidad.</p>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
