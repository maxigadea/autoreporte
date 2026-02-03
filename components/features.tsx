import { Shield, FileSearch, Clock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Historial completo",
    description: "Accidentes, reparaciones, kilometraje real y propietarios anteriores.",
  },
  {
    icon: Shield,
    title: "Datos verificados",
    description: "Información de fuentes oficiales y bases de datos gubernamentales.",
  },
  {
    icon: Clock,
    title: "Informe instantáneo",
    description: "Recibe tu informe en segundos directamente en tu correo.",
  },
  {
    icon: CheckCircle,
    title: "Compra segura",
    description: "Evita sorpresas y toma decisiones informadas antes de comprar.",
  },
];

export function Features() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
          Todo lo que necesitas saber sobre tu vehículo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
