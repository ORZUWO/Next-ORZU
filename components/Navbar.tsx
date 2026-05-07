"use client";

import { Link, usePathname, useRouter } from "@/src/i18n/navigation";
import { useParams } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = params.locale as string;

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;

    router.replace(pathname, { locale });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/10 bg-slate-950/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[84px] max-w-[1240px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 shadow-lg shadow-blue-500/25 transition duration-300 group-hover:scale-105"></div>

          <div className="leading-none">
            <h1 className="text-[22px] font-black tracking-[-0.04em] text-white">
              ORZU
            </h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_20px_80px_rgba(15,23,42,0.45)] md:flex">
          <Link
            href="/"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            About
          </Link>

          <Link
            href="/product"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Product
          </Link>

          <Link
            href="/contact"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Contact
          </Link>
        </nav>

        <select
          value={currentLocale}
          onChange={changeLanguage}
          className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm font-semibold text-white outline-none"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>

        <Link
          href="/login"
          className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/25"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            Login
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;