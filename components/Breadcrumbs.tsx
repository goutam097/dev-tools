import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-(--muted)">
      <Link href="/" className="transition hover:text-(--ink)">
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {isLast || !item.href ? (
              <span aria-current="page" className="text-(--ink)">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="transition hover:text-(--ink)">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
