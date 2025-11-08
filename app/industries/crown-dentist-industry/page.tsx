// app/industries/crown-dentist-industry/page.tsx
import Image from "next/image";
import CompanyCard from "@/components/CompanyCard";
import { getDentistData } from "@/lib/getDentistData";

export const dynamic = "force-static"; // собираем статикой

export default async function Page() {
  const companies = await getDentistData();

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Хедер-блок */}
      <section className="bg-black text-center text-white py-16 md:py-20 min-h-[60vh] flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Image
              src="/crown_logo.png"
              alt="CROWN"
              width={320}
              height={160}
              priority
            />
          </div>
          <h1 className="mt-8 text-3xl md:text-5xl font-extrabold text-yellow-400">
            Liders of Dentist Industry
          </h1>
        </div>
      </section>

      {/* Список компаний */}
      <section className="container mx-auto px-4 max-w-4xl mt-16 py-8 md:py-12" style={{ marginTop: "40px" }}>
        <div className="grid gap-4 md:gap-5">
          {companies.map((item, index) => (
            <CompanyCard
                 key={`${item.company}-${item.rating}`}
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

