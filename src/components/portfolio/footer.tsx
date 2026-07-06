"use client";

import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4 text-brand" />
            <span>
              Claude<span className="text-foreground font-semibold"> Girardet</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Développeur Fullstack</span>
          </div>

          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Claude Girardet. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
