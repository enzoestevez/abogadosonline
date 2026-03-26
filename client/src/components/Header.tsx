import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Servicios Inmobiliarios", href: "#servicios-inmobiliarios" },
    { label: "Sucesiones", href: "#sucesiones" },
    { label: "Sobre Nosotros", href: "#about" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663434619169/CQG6oQ9beN45qyBHBoNTJu/escalante-estevez-logo_8c651fd4.jpg" alt="Escalante & Estévez Abogados" className="w-12 h-12 rounded-full" />
          <div>
            <h1 className="text-lg font-bold text-primary">Escalante & Estévez</h1>
            <p className="text-xs text-muted-foreground">Abogados</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <a href="/diagnostico">
            <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold">
              Diagnóstico
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-secondary border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="/diagnostico" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold">
                Diagnóstico
              </Button>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
