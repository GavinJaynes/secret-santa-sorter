import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        candyCane:
          "relative overflow-hidden bg-white text-red-500 hover:text-white transition-colors duration-300 ease-in-out border-4 border-red-500 rounded-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#dc2626_10px,#dc2626_20px)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:z-[1] after:content-[''] after:absolute after:inset-0 after:bg-red-500 after:opacity-0 hover:after:opacity-70 after:transition-opacity after:duration-300 after:z-[2] [&>*]:relative [&>*]:z-[3]",
        giftWrapped:
          "relative bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out border-4 border-gold rounded-lg before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-0.5 before:bg-gold after:content-[''] after:absolute after:top-0 after:left-1/2 after:w-0.5 after:h-full after:bg-gold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
