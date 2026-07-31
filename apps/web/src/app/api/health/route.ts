export async function GET() {
  return Response.json({
    status: "ok",
    service: "cosmic-gateway-web",
    time: new Date().toISOString(),
  });
}
