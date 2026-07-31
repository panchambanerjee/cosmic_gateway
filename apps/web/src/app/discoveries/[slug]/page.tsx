import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DiscoveryReader } from "@/components/discovery-reader";
import { toDiscoveryDetail } from "@/lib/content";
import { getDiscoveryBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const discovery = await getDiscoveryBySlug(slug);
  if (!discovery || discovery.status !== "published") {
    return { title: "Discovery not found" };
  }
  return {
    title: discovery.seoTitle ?? discovery.title,
    description: discovery.seoDescription ?? discovery.subtitle ?? undefined,
  };
}

export default async function DiscoveryDetailPage({ params }: Props) {
  const { slug } = await params;
  const discovery = await getDiscoveryBySlug(slug);

  if (!discovery || discovery.status !== "published") {
    notFound();
  }

  const detail = toDiscoveryDetail(discovery);
  if (!detail) {
    notFound();
  }

  return <DiscoveryReader discovery={detail} />;
}
