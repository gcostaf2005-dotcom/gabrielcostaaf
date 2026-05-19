"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Wallet, Calendar } from "lucide-react";

const links = [
  { href: "/", label: "Início", icon: Home },
  { href: "/treinos", label: "Treinos", icon: Dumbbell },
  { href: "/financas", label: "Finanças", icon: Wallet },
  { href: "/agenda", label: "Agenda", icon: Calendar },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar desktop */}
      <nav className="hidden md:flex flex-col w-64 bg-card border-r border-border p-6 gap-2">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Sistema Pessoal</h1>
          <p className="text-sm text-foreground/60">Gabriel</p>
        </div>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active ? "bg-primary text-white" : "hover:bg-border/50"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around items-center h-16 z-50">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full ${
                active ? "text-primary" : "text-foreground/60"
              }`}
            >
              <Icon size={22} />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
