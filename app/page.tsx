// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

function getIndustries(): string[] {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) return [];
  return fs
    .readdirSync(dataDir)
    .filter(f => f.startsWith("for_site_") && f.endsWith(".csv"))
    .map(f => f.replace("for_site_", "").replace(".csv", ""))
    .sort((a, b) => a.localeCompare(b));
}

function formatIndustryName(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default function Home() {
  const industries = getIndustries();

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black opacity-90"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/crown_logo.png"
              alt="CROWN Industry Leaders"
              width={400}
              height={200}
              priority
              className="drop-shadow-2xl"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-12 bg-gradient-to-r from-[#EDBF4A] via-yellow-300 to-[#EDBF4A] bg-clip-text text-transparent tracking-wider">
  Industry Leaders
</h1>



          <p className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto">
            Discover the top-rated businesses across Australia. 
            We crown the best in each industry based on customer reviews and ratings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <Link
              href="#industries"
              className="inline-block px-8 py-4 border-2 border-[#EDBF4A] text-[#EDBF4A] font-bold rounded-lg hover:bg-[#EDBF4A] hover:text-black transition-all"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>


     {/* Crown Industry Leaders */}

        <section id="leaders" className="bg-[#f9fafb] py-20 px-4 text-center text-neutral-800">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Левая колонка — телефон */}
            <div className="flex justify-center">
              <img
                src="/phone.png"
                alt="Crown App"
                className="w-56 md:w-72 drop-shadow-xl"
              />
            </div>

            {/* Правая колонка — текст */}
            <div>
              <h3 className="text-[#EDBF4A] text-xl font-bold mb-2">
                Crown Industry Leaders
              </h3>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                WHO ARE THE LAUREATES
              </h2>
              <p className="leading-relaxed text-base text-neutral-600 mb-6">
                The Crown Industry Leaders program was created to recognise the very
                best businesses in each industry — those who set the standards, drive
                innovation, and constantly improve to meet the needs of their customers.
              </p>
              <p className="leading-relaxed text-base text-neutral-600">
                Unlike many award programs where participation simply requires a payment,
                Crown stands for transparency and credibility. Our rankings are based
                entirely on genuine customer feedback and online reviews — so every
                recognition truly reflects the voice of the people.
              </p>
            </div>
          </div>

          {/* Вторая секция */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-24">
            {/* Текст слева */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                CUSTOMERS’ CHOICE
              </h2>
              <p className="leading-relaxed text-base text-neutral-600">
                Our ranking is based entirely on ratings and reviews published across
                the most popular online platforms. Each award reflects real customer
                experiences and opinions — not paid promotions or internal votes.
              </p>
            </div>

            {/* Монитор справа */}
            <div className="flex justify-center">
              <img
                src="/computer.png"
                alt="Crown Display"
                className="w-72 md:w-96 drop-shadow-xl"
              />
            </div>
          </div>
        </section>




      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[#EDBF4A] text-3xl md:text-5xl font-bold text-black mb-4">
              Why Trust Our Rankings?
            </h2>
            <p className="text-lg text-neutral-600 mb-14 max-w-2xl mx-auto">
              We analyze thousands of customer reviews to identify the true leaders in each industry.
            </p>

          </div>

     

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="mb-6 mx-auto flex items-center justify-center">
                <Image
                  src="/opinion1.png"
                  alt="Verified Reviews"
                  width={250}
                  height={250}
                  className="inline-block align-middle"
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Verified Reviews</h3>
              <p className="text-neutral-600 text-center">
                We collect verified ratings from leading online platforms and industry-specific review sites to ensure every score reflects genuine customer feedback.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="mb-6 mx-auto flex items-center justify-center">
                <Image
                  src="/diamond1.png"
                  alt="The 10-Point Standardy​"
                  width={250}
                  height={250}
                  className="inline-block align-middle"
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">The 10-Point Standardy​</h3>
              <p className="text-neutral-600 text-center">
                To qualify for the Crown program, a business must achieve a minimum average rating of 8 out of 10 based on real customer reviews
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-neutral-100">
              <div className="mb-6 mx-auto flex items-center justify-center">
                <Image
                  src="/deskopt1.png"
                  alt="formula"
                  width={250}
                  height={250}
                  className="inline-block align-middle"
                />
                              </div>
              <h3 className="text-xl font-bold text-center mb-4">Fair Score Formula</h3>
              <p className="text-neutral-600 text-center">
                All collected ratings are combined using a weighted average formula. The final score is presented on a 10-point scale, ensuring a fair and transparent result.
              </p>
            </div>
          </div>
        </div>
      </section>

   


         {/* WHAT IS THE CROWN PROGRAM */}

        <section className="relative bg-black text-white py-20 px-6 text-center">
          <div className="absolute inset-0 bg-[url('/hands_bg.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="relative max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-[#EDBF4A]">
              WHAT IS THE CROWN PROGRAM
            </h2>

            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong>Crown – Industry Leaders</strong> is a unique recognition program that celebrates
              only the very best businesses — those that stand out for their professionalism, quality of
              service, and commitment to excellence.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              Joining the Crown program is a powerful way for a business to show that it operates at the
              highest industry standards. Here, the most important voices belong to customers — their
              reviews and recommendations drive the entire process and serve as the ultimate jury.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              The <strong>Crown Awards</strong> were created to distinguish the top-performing companies
              from the average ones. Winners are those who continuously grow, invest in improvement, and
              deliver outstanding customer satisfaction.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              Unlike programs that rely on entry fees or closed evaluations, <strong>Crown</strong> is built
              on transparency and credibility. The results are determined solely by genuine customer reviews
              collected from major online platforms.
            </p>

            <p className="text-neutral-300 leading-relaxed mb-4">
              Using advanced data aggregation and verification technologies — similar to those employed by
              global leaders like Google and Facebook — we analyse thousands of ratings and calculate results
              on a 10-point scale.
            </p>

            <p className="text-neutral-300 leading-relaxed">
              Our proprietary credibility algorithm ensures that each score accurately reflects both quality
              and consistency across reviews.
            </p>
          </div>
        </section>






      {/* Industries Grid */}
      <section id="industries" className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Browse by Industry
            </h2>
            <p className="text-lg text-neutral-600">
              Select an industry to see the top-rated businesses
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map(slug => (
              <Link
                key={slug}
                href={`/industries/${slug}`}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-neutral-200 hover:border-[#EDBF4A]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Image
                        src="/ico.png"
                        alt="Crown Icon"
                        width={32}
                        height={32}
                        className="w-14 h-14"
                      />
                    </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black group-hover:text-[#EDBF4A] transition-colors">
                      {formatIndustryName(slug)}
                    </h3>
                    <p className="text-sm text-neutral-500">View leaders →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Find the Best?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Start exploring Australia's top-rated businesses today
          </p>
          <Link
            href="/industries"
            className="inline-block px-10 py-5 bg-[#EDBF4A] text-black font-bold text-lg rounded-lg hover:bg-[#d3a93b] transition-all transform hover:scale-105 shadow-xl"
          >
            Explore All Industries
          </Link>
        </div>
      </section>
    </main>
  );
}
