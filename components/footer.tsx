import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-5 py-8 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <span>Private by design. Built for developers.</span>
      </div>
    </footer>
  );
}
