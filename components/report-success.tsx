"use client";

import { CheckCircle2, Mail, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportSuccessProps {
  email: string;
  vin: string;
}

export function ReportSuccess({ email, vin }: ReportSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
        <CheckCircle2 className="h-10 w-10 text-accent" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          ¡Informe generado con éxito!
        </h3>
        <p className="text-muted-foreground max-w-sm">
          En unos minutos enviaremos el informe completo del vehículo{" "}
          <span className="font-semibold text-foreground">{vin}</span> a tu correo
          electrónico.
        </p>
      </div>

      <div className="bg-muted rounded-lg p-4 flex items-center gap-3 w-full max-w-sm">
        <Mail className="h-5 w-5 text-muted-foreground" />
        <span className="text-foreground">{email}</span>
      </div>

      <p className="text-sm text-muted-foreground">
        Revisa también tu carpeta de spam si no encuentras el correo.
      </p>
    </div>
  );
}
