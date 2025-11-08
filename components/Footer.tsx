import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-12 py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/only_logo.png"
            alt="Crown"
            width={36}
            height={36}
            className="object-contain"
          />
        </div>

        <nav className="flex gap-6 text-sm">
          <Link href="/terms" className="hover:text-[#EDBF4A] transition">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-[#EDBF4A] transition">
            Privacy
          </Link>
          
        
           <Link href="https://facebook.com" target="_blank" className="hover:text-[#EDBF4A] transition">
           Facebook
           </Link>
          
        </nav>

        <p className="text-sm text-gray-400 mt-2 md:mt-0">
          © 2025 Crown Industry Leaders. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
