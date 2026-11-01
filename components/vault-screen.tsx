import { Cloud, Plus, Search } from "lucide-react";
import { SectionLabel } from "./section-label";
import { SecretCard } from "./secret-card";

const secrets = [
  {
    name: "Production API",
    date: "Oct 24, 2024",
    color: "bg-emerald-400/10 text-emerald-400",
  },
  {
    name: "Staging Services",
    date: "Oct 18, 2024",
    color: "bg-indigo-400/10 text-indigo-400",
  },
  {
    name: "Local Development",
    date: "Sep 30, 2024",
    color: "bg-amber-400/10 text-amber-400",
  },
];

export function VaultScreen() {
  return (
    <section
      id="vault"
      className="border-t border-white/[0.07] px-5 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Your vault</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Saved secrets
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              3 encrypted entries, only accessible with your keys.
            </p>
          </div>
          <div className="flex gap-3">
            <label className="relative flex-1 sm:w-56">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-600"
              />
              <input
                aria-label="Search secrets"
                placeholder="Search secrets..."
                className="h-10 w-full rounded-lg border border-white/10 bg-[#0d1513] pl-9 pr-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
              />
            </label>
            <a
              href="#store"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-400 px-3.5 text-sm font-semibold text-[#07100d]"
            >
              <Plus className="size-4" />{" "}
              <span className="hidden sm:inline">New Secret</span>
            </a>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {secrets.map((secret) => (
            <SecretCard key={secret.name} {...secret} />
          ))}
        </div>
        <div className="mt-20 rounded-xl border border-dashed border-white/10 bg-white/[0.015] px-6 py-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-600">
            <Cloud className="size-5" />
          </div>
          <h3 className="mt-4 text-sm font-medium text-zinc-300">
            No secrets stored yet
          </h3>
          <p className="mx-auto mt-1.5 max-w-xs text-xs leading-5 text-zinc-600">
            Your empty vault will look like this before your first secret is
            added.
          </p>
        </div>
      </div>
    </section>
  );
}
