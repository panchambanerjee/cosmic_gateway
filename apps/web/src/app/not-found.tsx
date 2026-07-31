import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-display text-3xl text-star-50">Not found</h1>
      <p className="mt-3 text-star-200/70">
        That page does not exist or is not published yet.
      </p>
      <Link href="/" className="mt-6 inline-block text-nebula-400 hover:underline">
        Back home
      </Link>
    </div>
  );
}
