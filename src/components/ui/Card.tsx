import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-card/60 border border-border/60 rounded-2xl p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }: CardProps) {
  return (
    <h2 className={`text-base font-semibold tracking-tight mb-4 ${className}`}>
      {children}
    </h2>
  );
}
