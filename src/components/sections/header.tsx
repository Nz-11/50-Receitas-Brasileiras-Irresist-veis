"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navItems } from "@/content/landing";
import { Close, Menu } from "@/components/ui/icons";
import { CheckoutButton } from "@/components/ui/checkout-button";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !open);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? "-110%" : 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: hidden ? 0 : 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full pl-5 pr-2 transition-all duration-700 ease-[var(--ease-cinematic)] sm:h-16 sm:pl-7 ${
          scrolled || open
            ? "border border-cream/10 bg-ink/80 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <a href="#topo" className="group flex items-baseline gap-2" aria-label="50 Receitas Brasileiras, voltar ao topo">
          <span className="font-display text-2xl font-semibold italic leading-none text-gold">50</span>
          <span className="text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.28em] text-cream/90">
            Receitas
            <br />
            Brasileiras
          </span>
        </a>

        <nav aria-label="Seções" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative rounded-full px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream/70 transition-colors duration-300 hover:text-cream after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <CheckoutButton size="md" />
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-cream/15 text-cream md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-cream/10 bg-ink/90 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl text-cream hover:bg-cream/5"
                  >
                    {item.label}
                    <span className="text-xs text-gold">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-2 grid">
              <CheckoutButton size="md" className="w-full" noticeAlign="center" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
