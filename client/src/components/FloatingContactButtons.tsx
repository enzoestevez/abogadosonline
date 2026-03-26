import { MessageCircle } from "lucide-react";

export default function FloatingContactButtons() {
  const whatsappNumber = "5492304485586";
  const whatsappMessage = "Hola, me gustaría consultar sobre vuestros servicios de sucesiones y operaciones inmobiliarias.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* WhatsApp Button - Floating */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        title="Contactar por WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </div>
  );
}
