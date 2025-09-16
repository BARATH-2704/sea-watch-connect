import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Coastal Sentinel custom variants
        hero: "bg-gradient-hero text-white shadow-ocean hover:shadow-lg hover:scale-105 transition-all duration-300",
        emergency: "bg-gradient-emergency text-white shadow-emergency hover:animate-emergency-blink",
        success: "bg-gradient-success text-white hover:bg-seaweed/90",
        ocean: "bg-ocean-mid text-white hover:bg-ocean-deep transition-colors duration-300",
        hazard: "bg-card border-2 border-primary/20 hover:border-primary/40 hover:shadow-ocean transition-all duration-200",
        floating: "bg-white/90 backdrop-blur-sm text-ocean-deep shadow-ocean hover:bg-white hover:shadow-lg transition-all duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);