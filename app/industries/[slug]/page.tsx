import Image from "next/image";
import fs from "fs";
import path from "path";
import CompanyCard from "@/components/CompanyCard";
import { getIndustryData } from "@/lib/getIndustryData";

export const dynamicParams = true;

export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);

  return files
    .filter(f => f.startsWith("for_site_") && f.endsWith(".csv"))
    .map(f => ({
      slug: f.replace("for_site_", "").replace(".csv", ""),
    }));
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params; // ждём slug из Promise
  console.log("✅ [Page] slug =", slug);

  const data = await getIndustryData(slug);


  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="bg-black text-center text-white py-16 md:py-20 min-h-[80vh] flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Image
              src="/crown_logo.png"
              alt="CROWN"
              width={300}
              height={150}
              priority
            />
          </div>
          <h1 className="mt-8 text-3xl md:text-5xl font-extrabold text-[#EDBF4A]">
            Crown of{" "}
            {slug !== "unknown"
              ? slug.charAt(0).toUpperCase() + slug.slice(1)
              : "Industry"}
          </h1>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-4xl py-12">
        <div className="grid gap-4 md:gap-5">
          {data.map((item, index) => (
            <CompanyCard
              key={`${item.company}-${index}`}
              name={item.company}
              rating={item.rating}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

