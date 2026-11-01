import { ArrowRight, ShieldCheck, Unlock } from "lucide-react";
import { SectionLabel } from "./section-label";

export function HomeScreen() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.11),transparent_62%)]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-24 text-center lg:px-8 lg:pt-32">
        <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-xs text-emerald-300">
          <ShieldCheck className="size-3.5" /> Local-first secret storage
        </div>
        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          Your secrets.
          <br />
          <span className="text-emerald-400">Safely in hand.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
          Store environment secrets locally, protected by a key only you know.
          No accounts. No servers. No compromises.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#store"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-[#07100d] shadow-[0_8px_30px_rgba(52,211,153,0.15)] transition hover:bg-emerald-300"
          >
            Store a Secret <ArrowRight className="size-4" />
          </a>
          <a
            href="#vault"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.07]"
          >
            Open Vault <Unlock className="size-4" />
          </a>
        </div>
        <div className="mx-auto mt-20 grid max-w-4xl divide-y divide-white/[0.07] border-y border-white/[0.07] text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            [
              "01",
              "Enter your env",
              "Paste your KEY=value pairs into a private vault.",
            ],
            [
              "02",
              "Set a secret key",
              "Create a key that never leaves your device.",
            ],
            [
              "03",
              "Retrieve anytime",
              "Unlock your secrets whenever you need them.",
            ],
          ].map(([n, title, text]) => (
            <div key={n} className="px-5 py-6 sm:px-7">
              <span className="font-mono text-xs text-emerald-400">{n}</span>
              <h3 className="mt-3 text-sm font-medium text-white">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        id="how-it-works"
        className="border-t border-white/[0.07] bg-white/[0.015]"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <SectionLabel>Built for privacy</SectionLabel>
            <h2 className="text-xl font-medium text-white">
              Encrypted before it leaves your hands.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-500">
            Your secret key is never stored or transmitted. Lose the key and the
            encrypted contents cannot be recovered — by design.
          </p>
        </div>
      </div>
    </section>
  );
}
