import fs from "fs";
import path from "path";
import Link from "next/link";

function humanize(slug: string) {
  return slug
    .split(/[-_]/g)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export const dynamic = "force-static";

export default async function IndustriesIndex() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  const slugs = files
    .filter(n => n.startsWith("for_site_") && n.endsWith(".csv"))
    .map(n => n.replace("for_site_", "").replace(".csv", ""))
    .sort((a, b) => a.localeCompare(b));

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="bg-black text-white py-14 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#EDBF4A]">
          Select Industry
        </h1>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10 grid gap-4 md:grid-cols-2">
        {slugs.map(slug => (
          <Link
            key={slug}
            href={`/industries/${slug}`}
            className="block border rounded-xl bg-white shadow-sm hover:shadow-md transition p-5"
          >
            <div className="text-lg md:text-xl font-bold">
              Crown of {humanize(slug)} Industry
            </div>
            <div className="text-sm text-gray-500 mt-1">
              from /data/for_site_{slug}.csv
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

