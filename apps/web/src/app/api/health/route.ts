import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const time = new Date().toISOString();

  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({
      status: "ok",
      service: "cosmic-gateway-web",
      database: "reachable",
      timestamp: time,
    });
  } catch (error) {
    console.error("[health] database unreachable", error);
    return Response.json(
      {
        status: "degraded",
        service: "cosmic-gateway-web",
        database: "unreachable",
        timestamp: time,
      },
      { status: 503 },
    );
  }
}
