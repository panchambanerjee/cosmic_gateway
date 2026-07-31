import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-void-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="group">
          <div className="font-display text-xl tracking-tight text-star-50 md:text-2xl">
            Cosmic Gateway
          </div>
          <p className="mt-0.5 max-w-xl text-xs text-star-200/70 md:text-sm">
            A daily gateway from astronomy discoveries to genuine understanding.
          </p>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-star-100/80">
          <Link href="/discoveries" className="hover:text-nebula-400">
            Discoveries
          </Link>
          <Link href="/admin" className="hover:text-nebula-400">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
