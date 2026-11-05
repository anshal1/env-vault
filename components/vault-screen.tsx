import { ArrowLeft, ArrowRight, Cloud, Plus, Search } from "lucide-react";
import { SectionLabel } from "./section-label";
import { SecretCard } from "./secret-card";
import Link from "next/link";
import { Button } from "./ui/button";
import { getUserEnv } from "@/app/actions/env";
import SearchInput from "./search-input";

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

const colors = [
    "bg-emerald-400/10 text-emerald-400",
    "bg-indigo-400/10 text-indigo-400",
    "bg-amber-400/10 text-amber-400",
];

export async function VaultScreen({
    page,
    query,
}: {
    page: string;
    query: string;
}) {
    const envs = await getUserEnv(Number(page ?? 1), query);
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
                            {envs.data?.envs.length} encrypted entries, only
                            accessible with your keys.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <SearchInput />
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
                    {envs.data?.envs.map((secret) => (
                        <SecretCard
                            hint={secret.hint}
                            id={secret.id}
                            key={secret.label}
                            name={secret.label}
                            created_at={secret.created_at}
                            env={secret.env}
                            color={
                                colors[
                                    Math.round(
                                        Math.random() * colors.length - 1,
                                    )
                                ]
                            }
                        />
                    ))}
                </div>

                {!envs.data?.envs.length ? (
                    <div className="mt-8 rounded-xl border border-dashed border-white/10 bg-white/[0.015] px-6 py-12 text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-600">
                            <Cloud className="size-5" />
                        </div>
                        <h3 className="mt-4 text-sm font-medium text-zinc-300">
                            No secrets stored yet
                        </h3>
                        <p className="mx-auto mt-1.5 max-w-xs text-xs leading-5 text-zinc-600">
                            Your empty vault will look like this before your
                            first secret is added.
                        </p>
                    </div>
                ) : null}
                {envs.data?.isNextPage ? (
                    <div className="mt-8">
                        {envs.data?.envs.length ? (
                            <section className="flex items-center justify-center mt-3">
                                <Link
                                    href={`?page=${Number(page ?? 0) + 1}&query=${query}`}
                                    className="block cursor-pointer"
                                    scroll={false}
                                >
                                    <Button className={"h-11 cursor-pointer"}>
                                        Load More <ArrowRight />
                                    </Button>
                                </Link>
                            </section>
                        ) : (
                            <section className="flex items-center justify-center mt-3">
                                <Link
                                    href={`?page=${Number(page ?? 2) - 1}&query=${query}`}
                                    className="block cursor-pointer"
                                    scroll={false}
                                >
                                    <Button className={"h-11 cursor-pointer"}>
                                        <ArrowLeft /> Go Back
                                    </Button>
                                </Link>
                            </section>
                        )}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
