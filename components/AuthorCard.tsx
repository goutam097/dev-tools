import Link from "next/link";
import { SITE_BRAND } from "@/lib/site";

type AuthorCardProps = {
  title: string;
  description: string;
  experience: string;
  stack: string[];
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
};

export default function AuthorCard({
  title,
  description,
  experience,
  stack,
  publishedAt,
  updatedAt,
  readingMinutes,
}: AuthorCardProps) {
  return (
    <section className="mt-8 rounded-3xl border border-(--border) bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--ink) text-lg font-semibold text-(--bg)">
            {SITE_BRAND.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted)">Author</p>
            <h2 className="mt-1 font-serif text-2xl italic text-(--ink)">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-(--muted)">{description}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-(--border) bg-(--surface) p-4 text-sm text-(--muted)">
          <p className="font-semibold text-(--ink)">Experience</p>
          <p className="mt-1">{experience}</p>
          <p className="mt-3 font-semibold text-(--ink)">Stack</p>
          <p className="mt-1">{stack.join(" • ")}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-(--muted)">
        <span>Published {publishedAt}</span>
        <span>•</span>
        <span>Updated {updatedAt}</span>
        <span>•</span>
        <span>{readingMinutes} min read</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/about" className="rounded-lg border border-(--border) px-3 py-2 text-sm text-(--ink)">
          About the publisher
        </Link>
        <Link href="/contact" className="rounded-lg border border-(--border) px-3 py-2 text-sm text-(--ink)">
          Contact the team
        </Link>
      </div>
    </section>
  );
}
