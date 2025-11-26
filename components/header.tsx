"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full border-b bg-background/70 backdrop-blur-lg sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold gradient-title select-none">
          ConvertX
        </h1>

        {/* Bouton theme */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Changer de thème"
        >
          {theme === "dark" ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
