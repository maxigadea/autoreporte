// Estado compartido - tú puedes cambiarlo con un POST
let state = "waiting";

export async function GET() {
  return Response.json({ state });
}

export async function POST(req: Request) {
  const { state: newState } = await req.json();
  state = newState;
  console.log("[Autoreporte] Estado actualizado a:", state);
  return Response.json({ ok: true, state });
}
