export async function POST(req: Request) {
  const body = await req.json();
  
  console.log("Nueva solicitud de informe:");
  console.log("VIN:", body.vin);
  console.log("Email:", body.email);
  console.log("Timestamp:", new Date().toISOString());

  // Aquí podrías:
  // - Guardar en base de datos
  // - Enviar email con el informe
  // - Integrar con API de historial de vehículos
  // - Procesar el pago con Stripe

  return Response.json({ 
    ok: true, 
    message: "Solicitud recibida",
    vin: body.vin,
    email: body.email 
  });
}
