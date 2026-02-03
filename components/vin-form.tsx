"use client";

import React from "react"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Car, Mail, ArrowRight } from "lucide-react";

interface VinFormProps {
  onSubmit: (vin: string, email: string) => void;
}

export function VinForm({ onSubmit }: VinFormProps) {
  const [vin, setVin] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin && email) {
      onSubmit(vin, email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="vin" className="text-foreground font-medium">
          VIN o Patente del vehículo
        </Label>
        <div className="relative">
          <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="vin"
            type="text"
            placeholder="Ej: WVWZZZ3CZWE123456"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-medium">
          Correo electrónico
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
      >
        Continuar al pago
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
}
