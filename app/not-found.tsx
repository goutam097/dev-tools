import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-(--muted)">404</p>
      <h1 className="mt-3 font-serif text-3xl italic text-(--ink)">Page not found</h1>
      <p className="mt-3 text-sm leading-6 text-(--muted)">The address may be incorrect or the page may have moved.</p>
      <nav aria-label="Suggested pages" className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-lg bg-(--ink) px-4 py-2 text-sm text-(--bg)">Home</Link>
        <Link href="/tools" className="rounded-lg border border-(--border) px-4 py-2 text-sm">Browse tools</Link>
        <Link href="/blog" className="rounded-lg border border-(--border) px-4 py-2 text-sm">Read guides</Link>
      </nav>
    </main>
  );
}
