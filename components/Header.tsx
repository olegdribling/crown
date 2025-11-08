// app/components/Header.tsx (обновленный с поиском)
import Link from "next/link";
import fs from "fs";
import path from "path";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

function getIndustries(): string[] {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) return [];
  return fs
    .readdirSync(dataDir)
    .filter(f => f.startsWith("for_site_") && f.endsWith(".csv"))
    .map(f => f.replace("for_site_", "").replace(".csv", ""))
    .sort((a, b) => a.localeCompare(b));
}

const Title = ({ slug }: { slug: string }) =>
  <>{slug.charAt(0).toUpperCase() + slug.slice(1)}</>;

export default function Header() {
  const industries = getIndustries();
  
  return (
    <header className="bg-black text-white">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Лого */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="/only_logo.png"
              alt="Crown Logo"
              className="h-8 w-auto md:h-12"
            />
          </Link>

          {/* Поиск (скрыт на мобильных) */}
          <div className="hidden md:flex flex-grow max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Десктоп-меню */}
          <nav className="hidden md:flex items-center gap-6 text-sm flex-shrink-0">
            <Link href="/how-it-works" className="hover:text-[#EDBF4A]">How It Works</Link>
            <div className="relative group">
              <div className="cursor-pointer px-2 py-1">Select Industry ▾</div>
              <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg min-w-[220px]
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {industries.map(slug => (
                    <Link
                      key={slug}
                      href={`/industries/${slug}`}
                      className="block px-4 py-2 hover:bg-[#EDBF4A] hover:text-white whitespace-nowrap"
                    >
                      Crown of <Title slug={slug} /> Industry
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/contact" className="hover:text-[#EDBF4A]">Contact</Link>
            <Link href="/terms" className="hover:text-[#EDBF4A]">Terms</Link>
          </nav>

          {/* Мобильный бургер */}
          <MobileMenu industries={industries} />
        </div>

        {/* Поиск на мобильных (под хедером) */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
