import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RealEstateServices from "./components/RealEstateServices";
import SuccessionServices from "./components/SuccessionServices";
import AboutSection from "./components/AboutSection";

import CalendarBooking from "./components/CalendarBooking";
import Footer from "./components/Footer";
import FloatingContactButtons from "./components/FloatingContactButtons";
import DiagnosticPage from "./pages/DiagnosticPage";
import SuccessionPage from "./pages/SuccessionPage";
import NotFound from "./pages/NotFound";

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
        <DiagnosticPage />
        <AboutSection />
        <CalendarBooking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
