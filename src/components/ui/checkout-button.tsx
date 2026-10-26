"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/config/site";
import { buttonClasses, type ButtonSize } from "./button-styles";
import { ButtonContent } from "./button-content";

type Props = {
  label?: string;
  size?: ButtonSize;
  className?: string;
  /** Alinhamento do aviso de checkout pendente. */
  noticeAlign?: "left" | "center";
};

/**
 * Botão de compra. Com NEXT_PUBLIC_CHECKOUT_URL definida, leva ao checkout externo.
 * Sem ela, mostra um aviso explícito: nenhuma compra é simulada e nenhum dado é coletado aqui.
 */
export function CheckoutButton({ label = "Quero meu e-book", size = "lg", className = "", noticeAlign = "left" }: Props) {
  const url = siteConfig.checkoutUrl;
  const [open, setOpen] = useState(false);
  const noticeId = useId();

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), 7000);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (url) {
    return (
      <a href={url} className={buttonClasses("primary", size, className)} data-checkout>
        <ButtonContent label={label} />
      </a>
    );
  }

  return (
    <div className={`relative inline-flex flex-col ${noticeAlign === "center" ? "items-center" : "items-start"}`}>
      <button
        type="button"
        className={buttonClasses("primary", size, className)}
        aria-describedby={open ? noticeId : undefined}
        onClick={() => setOpen((v) => !v)}
        data-checkout="pendente"
      >
        <ButtonContent label={label} />
      </button>
      <div role="status" aria-live="polite" className="w-full">
        <AnimatePresence>
          {open && (
            <motion.p
              id={noticeId}
              initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`mt-3 max-w-xs rounded-2xl border border-gold/30 bg-coal/95 px-4 py-3 text-left text-xs leading-relaxed text-sand shadow-2xl ${noticeAlign === "center" ? "mx-auto" : ""}`}
            >
              <strong className="block font-semibold text-gold-soft">Checkout ainda não configurado</strong>
              As vendas ainda não foram abertas nesta página.
              {process.env.NODE_ENV === "development" && (
                <span className="mt-1 block text-muted">
                  Dev: defina <code className="text-cream">NEXT_PUBLIC_CHECKOUT_URL</code> em <code>.env.local</code>.
                </span>
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
