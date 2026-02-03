"use client";

import { useEffect, useState, useRef } from "react";
import { FileSearch, CheckCircle2, Car, FileText, Shield, Loader2 } from "lucide-react";

const steps = [
  { icon: Car, text: "Verificando VIN del vehículo..." },
  { icon: FileSearch, text: "Consultando bases de datos..." },
  { icon: Shield, text: "Verificando historial de accidentes..." },
  { icon: FileText, text: "Generando informe completo..." },
];

interface LoadingReportProps {
  onComplete: () => void;
}

export function LoadingReport({ onComplete }: LoadingReportProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [waitingForServer, setWaitingForServer] = useState(false);
  const hasCalledComplete = useRef(false);

  // Animación de pasos visuales
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          setCompletedSteps((completed) => [...completed, prev]);
          return prev + 1;
        } else {
          clearInterval(interval);
          setCompletedSteps((completed) => [...completed, prev]);
          setWaitingForServer(true);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Polling al servidor esperando estado "finish"
  useEffect(() => {
    if (!waitingForServer) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch("/api/ui-state");
        const { state } = await res.json();

        if (state === "finish" && !hasCalledComplete.current) {
          hasCalledComplete.current = true;
          clearInterval(pollInterval);
          onComplete();
        }
      } catch (error) {
        console.log("[v0] Error polling state:", error);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, [waitingForServer, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-muted border-t-primary animate-spin" />
        <Car className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          Obteniendo tu informe
        </h3>
        <p className="text-muted-foreground">
          Por favor espera, esto puede tardar unos segundos...
        </p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index && !isCompleted;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isCompleted
                  ? "bg-accent/10 text-accent"
                  : isCurrent
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-accent" />
              ) : (
                <Icon className={`h-5 w-5 ${isCurrent ? "animate-pulse" : ""}`} />
              )}
              <span className={`text-sm ${isCurrent ? "font-medium" : ""}`}>
                {step.text}
              </span>
            </div>
          );
        })}
      </div>

      {waitingForServer && (
        <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Esperando confirmación del servidor...</span>
        </div>
      )}
    </div>
  );
}
