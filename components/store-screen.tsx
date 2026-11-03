"use client";
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
import { SubmitEvent, useState } from "react";
import { sign } from "@/lib/client-utils";
import { saveEnv } from "@/app/actions/env";
import { Button } from "./ui/button";
import Error from "./error";
import Success from "./success";

export function StoreScreen({ user }: { user: User["username"] | null }) {
    const [apiState, setApiState] = useState({
        error: "",
        success: "",
        loading: false,
    });
    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = Object.fromEntries(fd) as {
            env: string;
            label: string;
            secret: string;
            "confirm-secret": string;
        };
        if (data["confirm-secret"] !== data.secret)
            return setApiState((pre) => ({
                ...pre,
                error: "Secret key do not match",
            }));
        try {
            setApiState((prev) => {
                return {
                    ...prev,
                    loading: true,
                };
            });
            const hash = await sign(data.env, data["confirm-secret"]);
            const savedEnv = await saveEnv({ env: hash, label: data.label });
            if (savedEnv.err?.message) {
                setApiState(() => {
                    return {
                        loading: false,
                        error: savedEnv.err?.message ?? "",
                        success: "",
                    };
                });
                return;
            }
            setApiState(() => {
                return {
                    loading: false,
                    error: "",
                    success: "Env saved succesfully",
                };
            });
            e.target.reset();
        } catch (e) {
            setApiState(() => {
                return {
                    loading: false,
                    error: "Something went wrong",
                    success: "",
                };
            });
        }
    };

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
                            Keep your environment variables close, and your
                            secrets closer.
                        </p>
                    </div>
                    <FileKey2 className="hidden size-8 text-emerald-400/60 sm:block" />
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d1513] p-5 shadow-2xl shadow-black/20 sm:p-7">
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label="Name or label"
                            placeholder="Production API"
                            name="label"
                            disabled={apiState.loading}
                        />
                        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-300">
                            Environment variables
                            <textarea
                                aria-label="Environment variables"
                                placeholder="SECRET='34985ndncidfejncpasdae'"
                                name="env"
                                disabled={apiState.loading}
                                className="min-h-40 resize-y rounded-lg border border-white/10 bg-[#0a100f] p-3.5 font-mono text-xs leading-6 text-zinc-300 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10"
                            />
                        </label>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <TextField
                                label="Secret key"
                                type="password"
                                placeholder="************"
                                eye
                                mono
                                name="secret"
                                disabled={apiState.loading}
                            />
                            <TextField
                                label="Confirm secret key"
                                type="password"
                                placeholder="************"
                                eye
                                mono
                                name="confirm-secret"
                                disabled={apiState.loading}
                            />
                        </div>
                        <p className="-mt-1 flex items-center gap-2 text-sm text-red-400 font-medium">
                            <CircleAlert className="size-3.5" /> Lose your
                            secret key and the env cannot be recovered.
                        </p>
                        {!user ? (
                            <Link
                                href={"/initiate"}
                                className="inline-flex h-11 items-center justify-center cursor-pointer"
                            >
                                <span className="w-full cursor-pointer inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-semibold text-[#07100d] transition hover:bg-emerald-300">
                                    Create A Vault First{" "}
                                    <Vault className="size-4" />
                                </span>
                            </Link>
                        ) : (
                            <Button
                                disabled={apiState.loading}
                                type="submit"
                                className="cursor-pointer inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-semibold text-[#07100d] transition hover:bg-emerald-300"
                            >
                                Encrypt &amp; Store <Lock className="size-4" />
                            </Button>
                        )}
                    </form>
                </div>
                <div className="mt-6 grid gap-3 grid-cols-1">
                    {apiState.error ? (
                        <Error
                            title="Something Went Wrong"
                            message={apiState.error}
                        />
                    ) : null}
                    {apiState.success ? (
                        <Success title="Success" message={apiState.success} />
                    ) : null}
                </div>
            </div>
        </section>
    );
}
