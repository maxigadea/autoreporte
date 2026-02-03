"use client";

import { useState } from "react";
import { Car, Shield, Star } from "lucide-react";
import { VinForm } from "@/components/vin-form";
import { PaymentForm } from "@/components/payment-form";
import { LoadingReport } from "@/components/loading-report";
import { ReportSuccess } from "@/components/report-success";
import { Features } from "@/components/features";

type Step = "form" | "payment" | "loading" | "success";

export default function Home() {
  const [step, setStep] = useState<Step>("form");
  const [vin, setVin] = useState("");
  const [email, setEmail] = useState("");

  const handleFormSubmit = (vinValue: string, emailValue: string) => {
    setVin(vinValue);
    setEmail(emailValue);
    setStep("payment");
  };

  const handlePayment = async () => {
    setStep("loading");
    
    // Enviar datos al backend
    try {
      await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin, email }),
      });
    } catch (error) {
      console.log("[v0] Error sending data:", error);
    }
  };

  const handleLoadingComplete = () => {
    setStep("success");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Autoreporte</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Datos verificados
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              +50.000 informes
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                Informe completo por solo 8€
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                Conoce el historial completo de cualquier vehículo
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Obtén información verificada sobre accidentes, kilometraje real,
                propietarios anteriores, embargos y mucho más. Toma decisiones
                informadas antes de comprar.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Informe instantáneo
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Datos oficiales
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Pago seguro
                </span>
              </div>
            </div>

            {/* Right Column - Form Card */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              {step === "form" && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-1">
                      Genera tu informe
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Introduce el VIN o patente del vehículo
                    </p>
                  </div>
                  <VinForm onSubmit={handleFormSubmit} />
                </>
              )}

              {step === "payment" && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-1">
                      Completa tu pago
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Pago seguro con tarjeta de crédito o débito
                    </p>
                  </div>
                  <PaymentForm
                    vin={vin}
                    email={email}
                    onBack={() => setStep("form")}
                    onPayment={handlePayment}
                  />
                </>
              )}

              {step === "loading" && (
                <LoadingReport onComplete={handleLoadingComplete} />
              )}

              {step === "success" && (
                <ReportSuccess email={email} vin={vin} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Car className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Autoreporte</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Autoreporte. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
