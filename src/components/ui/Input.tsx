import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-foreground/70">{label}</label>}
      <input
        ref={ref}
        className={`bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary transition-colors ${className}`}
        {...props}
      />
    </div>
  )
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-foreground/70">{label}</label>}
      <textarea
        ref={ref}
        className={`bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary transition-colors min-h-[80px] ${className}`}
        {...props}
      />
    </div>
  )
);
Textarea.displayName = "Textarea";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className = "", children, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-foreground/70">{label}</label>}
      <select
        ref={ref}
        className={`bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary transition-colors ${className}`}
        {...(props as object)}
      >
        {children}
      </select>
    </div>
  )
);
Select.displayName = "Select";
