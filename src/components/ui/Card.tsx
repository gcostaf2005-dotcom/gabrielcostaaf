import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }: CardProps) {
  return <h2 className={`text-lg font-semibold mb-3 ${className}`}>{children}</h2>;
}
