import { ChevronRight } from "lucide-react";
import { Logo } from "./logo";

export function Navbar() {
  return (
    <header className="border-b border-white/[0.07]">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav
          className="hidden items-center gap-8 text-sm text-zinc-400 md:flex"
          aria-label="Main navigation"
        >
          <a className="transition-colors hover:text-white" href="#store">
            Store
          </a>
          <a className="transition-colors hover:text-white" href="#vault">
            Vault
          </a>
          <a
            className="transition-colors hover:text-white"
            href="#how-it-works"
          >
            How it works
          </a>
        </nav>
        <a
          href="#vault"
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
        >
          Open Vault <ChevronRight className="size-3.5" />
        </a>
      </div>
    </header>
  );
}
