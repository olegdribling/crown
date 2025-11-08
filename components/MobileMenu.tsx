// app/components/MobileMenu.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const Title = ({ slug }: { slug: string }) =>
  <>{slug.charAt(0).toUpperCase() + slug.slice(1)}</>;

export default function MobileMenu({ industries }: { industries: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    setIsIndustryOpen(false);
  };

  return (
    <div className="md:hidden relative">
      {/* Бургер-кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center cursor-pointer"
        aria-label="Toggle menu"
      >
        <span className="w-6 h-[2px] bg-white"></span>
        <span className="w-6 h-[2px] bg-white mt-1"></span>
        <span className="w-6 h-[2px] bg-white mt-1"></span>
      </button>

      {/* Меню */}
      {isOpen && (
        <>
          {/* Overlay для закрытия при клике вне меню */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeMenu}
          />
          
          {/* Само меню */}
          <div className="fixed top-16 left-0 right-0 mx-auto w-64 bg-black text-white rounded-xl shadow-lg p-4 z-50 text-center">
            <div className="flex flex-col gap-3 text-sm items-center">
              <Link href="/" className="hover:text-[#EDBF4A]" onClick={closeMenu}>
                Home
              </Link>
              <Link href="/how-it-works" className="hover:text-[#EDBF4A]" onClick={closeMenu}>
                How It Works
              </Link>
              
              {/* Вложенное меню индустрий */}
              <div className="w-full">
                <button
                  onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                  className="cursor-pointer hover:text-[#EDBF4A] w-full"
                >
                  Select Industry {isIndustryOpen ? "▴" : "▾"}
                </button>
                {isIndustryOpen && (
                  <div className="mt-2 border-t border-white/10 pt-2">
                    {industries.map(slug => (
                      <Link
                        key={slug}
                        href={`/industries/${slug}`}
                        className="block py-1 hover:text-[#EDBF4A]"
                        onClick={closeMenu}
                      >
                        Crown of <Title slug={slug} /> Industry
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact" className="hover:text-[#EDBF4A]" onClick={closeMenu}>
                Contact
              </Link>
              <Link href="/terms" className="hover:text-[#EDBF4A]" onClick={closeMenu}>
                Terms
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
