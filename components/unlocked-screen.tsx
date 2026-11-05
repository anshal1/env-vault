"use client";
import { Clipboard, Download, Unlock } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SectionLabel } from "./section-label";

export default function UnlockedScreen({
    env,
    title,
    setError,
}: {
    env: string;
    title: string;
    setError: Dispatch<SetStateAction<string>>;
}) {
    const [copied, setCopied] = useState("Copy");
    const convertToKeyValuePair = () => {
        setError("");
        let split = env.split("\n");
        const obj: Record<string, string> = {};
        if (split.length == 0) {
            setError("Invalid keys and value");
            return obj;
        }
        for (let i = 0; i < split.length; i++) {
            if (split[i].length < 3) continue;
            const key_val = split[i].split("=");
            if (key_val.length < 2) {
                obj[key_val[0]] = "";
                continue;
            }
            obj[key_val[0]] = key_val[1];
        }
        return obj;
    };
    const key_val = convertToKeyValuePair();
    return (
        <div
            id="unlocked"
            className="rounded-xl border border-emerald-400/20 bg-[#0d1513] p-6 shadow-[0_0_50px_rgba(52,211,153,0.04)] sm:p-8 min-w-[24rem] max-w-xl"
        >
            <div className="flex items-start justify-between">
                <div>
                    <SectionLabel>Retrieve secret · unlocked</SectionLabel>
                    <h2 className="text-2xl font-semibold text-white">
                        {title}
                    </h2>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-400">
                    <Unlock className="size-3" />
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
                        {Object.keys(key_val).map((key) => {
                            return (
                                <React.Fragment key={key}>
                                    <span className="text-emerald-400">
                                        {key}
                                    </span>
                                    =
                                    <span className="text-zinc-300">
                                        {key_val[key]}
                                    </span>
                                    {"\n"}
                                </React.Fragment>
                            );
                        })}
                    </code>
                </pre>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
                <button
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-400 px-3.5 text-xs font-semibold text-[#07100d]"
                    onClick={async () => {
                        await navigator.clipboard.writeText(env);
                        setCopied("Copied");
                        setTimeout(() => {
                            setCopied("Copy");
                        }, 200);
                    }}
                >
                    <Clipboard className="size-3.5" /> {copied}
                </button>
            </div>
        </div>
    );
}
