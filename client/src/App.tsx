import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RealEstateServices from "./components/RealEstateServices";
import SuccessionServices from "./components/SuccessionServices";
import LandingPagesGrid from "./components/LandingPagesGrid";
import AboutSection from "./components/AboutSection";

import CalendarBooking from "./components/CalendarBooking";
import Footer from "./components/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons";
import DiagnosticPage from "./pages/DiagnosticPage";
import SuccessionPage from "./pages/SuccessionPage";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import NotFound from "./pages/NotFound";
import SuccesionesLanding from "./pages/SuccesionesLanding";
import HereciasLanding from "./pages/HereciasLanding";
import TestamentoLanding from "./pages/TestamentoLanding";
import DivorciosLanding from "./pages/DivorciosLanding";
import CuotaAlimentariaLanding from "./pages/CuotaAlimentariaLanding";
import FideicomisosLanding from "./pages/FideicomisosLanding";
import PlanificacionPatrimonialLanding from "./pages/PlanificacionPatrimonialLanding";
import InmobiliarioLanding from "./pages/InmobiliarioLanding";
import ConsultaConfirmada from "./pages/ConsultaConfirmada";
import GraciasTurno from "./pages/GraciasTurno";
import GraciasDiagnostico from "./pages/GraciasDiagnostico";

function App() {
  // make sure to consider if you need authentication for certain routes
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <FloatingContactButtons />
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/diagnostico" component={DiagnosticPage} />
          <Route path="/sucesion" component={SuccessionPage} />
          <Route path="/terms" component={TermsAndPrivacy} />
          <Route path="/sucesiones" component={SuccesionesLanding} />
          <Route path="/herencias" component={HereciasLanding} />
          <Route path="/testamento" component={TestamentoLanding} />
          <Route path="/testamentos" component={TestamentoLanding} />
          <Route path="/divorcios" component={DivorciosLanding} />
          <Route path="/alimentos" component={DivorciosLanding} />
          <Route path="/cuota-alimentaria" component={CuotaAlimentariaLanding} />
          <Route path="/cuota" component={CuotaAlimentariaLanding} />
          <Route path="/fideicomisos" component={FideicomisosLanding} />
          <Route path="/planificacion-patrimonial" component={PlanificacionPatrimonialLanding} />
          <Route path="/patrimonial" component={PlanificacionPatrimonialLanding} />
          <Route path="/inmobiliario" component={InmobiliarioLanding} />
          <Route path="/consulta-confirmada" component={ConsultaConfirmada} />
          <Route path="/gracias-turno" component={GraciasTurno} />
          <Route path="/gracias-diagnostico" component={GraciasDiagnostico} />
          <Route path="/contacto" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </ThemeProvider>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <RealEstateServices />
        <SuccessionServices />
        <LandingPagesGrid />
        <DiagnosticPage />
        <AboutSection />
        <CalendarBooking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
