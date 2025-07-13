import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground-hover",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:
          "border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-900/50",
        ghost:
          "text-gray-900 hover:bg-gray-100 focus:ring-gray-900/50 shadow-none",
      },
      size: {
        sm: "h-7 px-3 text-sm",
        md: "h-8 px-4 text-sm",
        lg: "h-10 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
