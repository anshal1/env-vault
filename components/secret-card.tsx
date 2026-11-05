"use client";
import { CircleAlert, KeyRound, Lock } from "lucide-react";
import { useState } from "react";
import Modal from "./modal";
import { SectionLabel } from "./section-label";
import { TextField } from "./text-field";
import { Button } from "./ui/button";
import { RetrieveScreens } from "./retrieve-screens";

export function SecretCard({
    name,
    created_at,
    color,
    env,
    id,
}: {
    name: string;
    created_at: Date | null;
    color: string;
    env: string;
    id: number;
}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <article className="rounded-xl border border-white/10 bg-[#0d1513] p-5 transition hover:border-white/20">
            {showModal ? (
                <Modal
                    openModal={showModal}
                    onClose={() => {
                        setShowModal(false);
                    }}
                >
                    <RetrieveScreens title={name} env={env} />
                </Modal>
            ) : null}

            <div className="flex items-start justify-between">
                <span
                    className={`flex size-9 items-center justify-center rounded-lg ${color}`}
                >
                    <KeyRound className="size-4" />
                </span>
                <button
                    onClick={() => {
                        setShowModal(true);
                    }}
                    aria-label={`Retrieve ${name}`}
                    className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.06]"
                >
                    Retrieve
                </button>
            </div>
            <h3 className="mt-5 text-sm font-medium text-white">{name}</h3>
            <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                <span>{created_at?.toDateString()}</span>
                <span className="font-mono tracking-widest">••••••••</span>
            </div>
        </article>
    );
}
