import { useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onAuthClick: (type: 'signin' | 'signup' | 'admin') => void;
}

export function Navigation({ onAuthClick }: NavigationProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { label: "Live Map", href: "/map" },
    { label: "Report Hazard", href: "/report" },
    { label: "About", href: "/about" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-ocean-deep/95 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              🌊 Coastal Sentinel
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-ocean-deep dark:text-ocean-foam hover:text-ocean-mid transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-ocean-deep dark:text-ocean-foam"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                onClick={() => onAuthClick('signin')}
                className="text-ocean-deep dark:text-ocean-foam"
              >
                Sign In
              </Button>
              <Button 
                variant="ocean" 
                onClick={() => onAuthClick('signup')}
              >
                Sign Up
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAuthClick('admin')}
                className="text-xs border-ocean-mid/50"
              >
                Admin
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-ocean-deep dark:text-ocean-foam"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          isMobileOpen ? "max-h-64 pb-4" : "max-h-0"
        )}>
          <div className="flex flex-col space-y-3 pt-4 border-t border-primary/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-ocean-deep dark:text-ocean-foam hover:text-ocean-mid transition-colors py-2"
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-primary/10">
              <Button 
                variant="ghost" 
                onClick={() => onAuthClick('signin')}
                className="justify-start"
              >
                Sign In
              </Button>
              <Button 
                variant="ocean" 
                onClick={() => onAuthClick('signup')}
                className="justify-start"
              >
                Sign Up
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAuthClick('admin')}
                className="justify-start text-xs"
              >
                Admin Access
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}