"use client";

import React from "react"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

interface PaymentFormProps {
  vin: string;
  email: string;
  onBack: () => void;
  onPayment: () => void;
}

type ProcessingStep = "idle" | "validating" | "processing" | "confirming" | "success";

const processingMessages: Record<ProcessingStep, string> = {
  idle: "",
  validating: "Validando datos de la tarjeta...",
  processing: "Procesando pago...",
  confirming: "Confirmando transacción...",
  success: "Pago confirmado",
};

export function PaymentForm({ vin, email, onBack, onPayment }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [processingStep, setProcessingStep] = useState<ProcessingStep>("idle");
  const isProcessing = processingStep !== "idle";

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de proceso de pago realista
    setProcessingStep("validating");
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setProcessingStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setProcessingStep("confirming");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setProcessingStep("success");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onPayment();
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-4 space-y-1">
        <p className="text-sm text-muted-foreground">Informe para:</p>
        <p className="font-semibold text-foreground">{vin}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      <div className="flex items-center justify-between bg-accent/10 rounded-lg p-4 border border-accent/20">
        <span className="text-foreground font-medium">Total a pagar</span>
        <span className="text-2xl font-bold text-foreground">8,00 €</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">
            Nombre en la tarjeta
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Juan García"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isProcessing}
            className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground disabled:opacity-60"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="card" className="text-foreground font-medium">
            Número de tarjeta
          </Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="card"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              disabled={isProcessing}
              className="pl-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground disabled:opacity-60"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry" className="text-foreground font-medium">
              Fecha de expiración
            </Label>
            <Input
              id="expiry"
              type="text"
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              maxLength={5}
              disabled={isProcessing}
              className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground disabled:opacity-60"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc" className="text-foreground font-medium">
              CVC
            </Label>
            <Input
              id="cvc"
              type="text"
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ""))}
              maxLength={4}
              disabled={isProcessing}
              className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground disabled:opacity-60"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base disabled:opacity-100"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              {processingStep === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-accent" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {processingMessages[processingStep]}
            </span>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Pagar 8,00 €
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isProcessing}
          className="w-full text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver atrás
        </Button>
      </form>

      <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
        <Lock className="h-3 w-3" />
        Pago seguro encriptado con SSL
      </p>
    </div>
  );
}
