import Link from "next/link";
import { Dumbbell, Wallet, Calendar } from "lucide-react";

export default function Home() {
  const modules = [
    {
      href: "/treinos",
      title: "Treinos",
      description: "Registre séries, cargas e veja sua evolução",
      icon: Dumbbell,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    {
      href: "/financas",
      title: "Finanças",
      description: "Controle entradas, saídas e categorias",
      icon: Wallet,
      color: "bg-green-500/10 text-green-400 border-green-500/30",
    },
    {
      href: "/agenda",
      title: "Agenda",
      description: "Eventos, tarefas e Google Calendar",
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Olá, Gabriel</h1>
        <p className="text-foreground/60">O que vamos atacar hoje?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map(({ href, title, description, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className={`p-6 rounded-xl border ${color} hover:scale-[1.02] transition-transform`}
          >
            <Icon size={32} className="mb-4" />
            <h2 className="text-xl font-semibold mb-1">{title}</h2>
            <p className="text-sm text-foreground/60">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
