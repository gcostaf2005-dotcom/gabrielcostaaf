"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Wallet, Calendar, Wallet2 } from "lucide-react";

const links = [
  { href: "/", label: "Início", icon: Home },
  { href: "/treinos", label: "Treinos", icon: Dumbbell },
  { href: "/financas", label: "Finanças", icon: Wallet },
  { href: "/patrimonio", label: "Patrimônio", icon: Wallet2 },
  { href: "/agenda", label: "Agenda", icon: Calendar },
];

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Sidebar desktop */}
      <nav className="hidden md:flex flex-col w-60 bg-card/40 border-r border-border p-6 gap-1">
        <div className="mb-10 px-2">
          <h1 className="text-lg font-semibold tracking-tight">Sistema Pessoal</h1>
          <p className="text-xs text-muted mt-0.5">Gabriel</p>
        </div>
        {links.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                active
                  ? "bg-primary/15 text-primary"
                  : "text-foreground/70 hover:bg-card hover:text-foreground"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-border flex justify-around items-center h-16 z-50">
        {links.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                active ? "text-primary" : "text-muted"
              }`}
            >
              <Icon size={20} strokeWidth={2} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
