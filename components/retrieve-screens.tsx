import { CircleAlert, Clipboard, Download, Lock, Unlock } from "lucide-react";
import { SectionLabel } from "./section-label";
import { TextField } from "./text-field";
import { Button } from "./ui/button";

export function RetrieveScreens() {
    return (
        <section className="border-t border-white/[0.07] bg-[#09100e] px-5 py-24 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
                <div
                    id="retrieve"
                    className="rounded-xl border border-white/10 bg-[#0d1513] p-6 sm:p-8"
                >
                    <SectionLabel>Retrieve secret · locked</SectionLabel>
                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                        <Lock className="size-5" />
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold text-white">
                        Unlock Production API
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                        Enter the secret key you created for this environment.
                    </p>
                    <div className="mt-7 flex flex-col gap-4">
                        <TextField
                            label="Secret key"
                            type="password"
                            eye
                            mono
                        />
                        <Button className="h-11 rounded-lg bg-emerald-400 text-sm font-semibold text-[#07100d]">
                            Unlock vault
                        </Button>
                    </div>
                    <div className="mt-4 flex gap-2 rounded-lg border border-red-400/20 bg-red-400/[0.05] p-3 text-xs text-red-300">
                        <CircleAlert className="size-4 shrink-0" /> Incorrect
                        secret key. Please try again.
                    </div>
                </div>
                <div
                    id="unlocked"
                    className="rounded-xl border border-emerald-400/20 bg-[#0d1513] p-6 shadow-[0_0_50px_rgba(52,211,153,0.04)] sm:p-8"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <SectionLabel>
                                Retrieve secret · unlocked
                            </SectionLabel>
                            <h2 className="text-2xl font-semibold text-white">
                                Production API
                            </h2>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-400">
                            <Unlock className="size-3" /> Unlocked
                        </span>
                    </div>
                    <div className="mt-7 overflow-hidden rounded-lg border border-white/10 bg-[#080d0c]">
                        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                            <span className="font-mono text-xs text-zinc-600">
                                .env.production
                            </span>
                            <button
                                aria-label="Copy environment file"
                                className="text-zinc-500 hover:text-white"
                            >
                                <Clipboard className="size-4" />
                            </button>
                        </div>
                        <pre className="overflow-x-auto p-4 font-mono text-xs leading-7 text-zinc-400">
                            <code>
                                <span className="text-emerald-400">
                                    DATABASE_URL
                                </span>
                                =
                                <span className="text-zinc-300">
                                    postgres://user:••••@host/db
                                </span>
                                {"\n"}
                                <span className="text-emerald-400">
                                    STRIPE_SECRET_KEY
                                </span>
                                =
                                <span className="text-zinc-300">
                                    sk_live_••••••••••
                                </span>
                                {"\n"}
                                <span className="text-emerald-400">
                                    NEXT_PUBLIC_APP_URL
                                </span>
                                =
                                <span className="text-zinc-300">
                                    https://app.example.com
                                </span>
                            </code>
                        </pre>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-400 px-3.5 text-xs font-semibold text-[#07100d]">
                            <Clipboard className="size-3.5" /> Copy
                        </button>
                        <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-3.5 text-xs font-medium text-zinc-300">
                            <Download className="size-3.5" /> Download .env
                        </button>
                        <button className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-3.5 text-xs font-medium text-zinc-400">
                            <Lock className="size-3.5" /> Lock again
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
