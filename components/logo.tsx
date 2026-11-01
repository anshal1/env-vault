import { Terminal } from "lucide-react";

export function Logo() {
  return (
    <a
      href="#home"
      className="flex items-center gap-2.5 font-semibold tracking-tight text-white"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-400 text-[#07100d] shadow-[0_0_24px_rgba(52,211,153,0.2)]">
        <Terminal className="size-4" strokeWidth={2.5} />
      </span>
      <span>EnvVault</span>
    </a>
  );
}
