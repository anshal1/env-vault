import {
  CircleAlert,
  CircleCheck,
  FileKey2,
  Lock,
  Vault,
  X,
} from "lucide-react";
import { SectionLabel } from "./section-label";
import { TextField } from "./text-field";
import { User } from "@/app/db/schema/users";
import Link from "next/link";

export function StoreScreen({ user }: { user: User["username"] | null }) {
  return (
    <section
      id="store"
      className="border-t border-white/[0.07] bg-[#09100e] px-5 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <SectionLabel>Store a secret</SectionLabel>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Add to your vault
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Keep your environment variables close, and your secrets closer.
            </p>
          </div>
          <FileKey2 className="hidden size-8 text-emerald-400/60 sm:block" />
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0d1513] p-5 shadow-2xl shadow-black/20 sm:p-7">
          <div className="flex flex-col gap-5">
            <TextField label="Name or label" value="Production API" />
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-300">
              Environment variables
              <textarea
                aria-label="Environment variables"
                defaultValue={
                  "DATABASE_URL=postgres://user:password@host/db\nSTRIPE_SECRET_KEY=sk_live_••••••••••\nNEXT_PUBLIC_APP_URL=https://app.example.com"
                }
                className="min-h-40 resize-y rounded-lg border border-white/10 bg-[#0a100f] p-3.5 font-mono text-xs leading-6 text-zinc-300 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10"
              />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                label="Secret key"
                type="password"
                value="vault-key-••••••"
                eye
                mono
              />
              <TextField
                label="Confirm secret key"
                type="password"
                value="vault-key-••••••"
                eye
                mono
              />
            </div>
            <p className="-mt-1 flex items-center gap-2 text-xs text-zinc-500">
              <CircleAlert className="size-3.5" /> Lose your secret key and the
              env cannot be recovered.
            </p>
            {!user ? (
              <Link
                href={"/initiate"}
                className="inline-flex h-11 items-center justify-center cursor-pointer"
              >
                <button className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-semibold text-[#07100d] transition hover:bg-emerald-300">
                  Create A Vault First <Vault className="size-4" />
                </button>
              </Link>
            ) : (
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-semibold text-[#07100d] transition hover:bg-emerald-300">
                Encrypt &amp; Store <Lock className="size-4" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-emerald-300">
                Secret stored securely
              </p>
              <p className="mt-1 text-xs leading-5 text-emerald-300/60">
                Your environment was encrypted and added to the vault.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-lg border border-red-400/20 bg-red-400/[0.05] p-4">
            <X className="mt-0.5 size-4 shrink-0 text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-300">
                Could not store secret
              </p>
              <p className="mt-1 text-xs leading-5 text-red-300/60">
                The secret keys do not match. Try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
