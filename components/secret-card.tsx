"use client";
import { CircleAlert, KeyRound, Lock, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "./modal";
import { SectionLabel } from "./section-label";
import { TextField } from "./text-field";
import { Button } from "./ui/button";
import { RetrieveScreens } from "./retrieve-screens";
import { deleteEnv } from "@/app/actions/env";
import { useRouter } from "next/navigation";

export function SecretCard({
    name,
    created_at,
    color,
    env,
    id,
    hint,
}: {
    name: string;
    created_at: Date | null;
    color: string;
    env: string;
    id: number;
    hint: string | null;
}) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setLoading(true);
        const result = await deleteEnv(id);
        setLoading(false);
        if (result.err) {
            alert(result.err.message);
            return;
        }
        setShowDeleteModal(false);
        router.refresh();
    };

    return (
        <article className="rounded-xl border border-white/10 bg-[#0d1513] p-5 transition hover:border-white/20">
            {showModal ? (
                <Modal
                    openModal={showModal}
                    onClose={() => {
                        setShowModal(false);
                    }}
                >
                    <RetrieveScreens hint={hint} title={name} env={env} />
                </Modal>
            ) : null}

            {showDeleteModal ? (
                <Modal
                    openModal={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false);
                    }}
                >
                    <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-[#0d1513] p-8 text-center shadow-2xl">
                        <div className="flex size-12 items-center justify-center rounded-full bg-red-400/10 text-red-400">
                            <CircleAlert className="size-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                                Delete Secret?
                            </h3>
                            <p className="text-sm text-zinc-500">
                                Are you sure you want to delete{" "}
                                <span className="text-zinc-300 font-medium">
                                    {name}
                                </span>
                                ? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setShowDeleteModal(false)}
                                variant={"ghost"}
                                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.06]"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                disabled={loading}
                                className="rounded-lg bg-red-400 px-4 py-2 text-sm font-semibold text-red-950 transition hover:bg-red-300"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            ) : null}

            <div className="flex items-start justify-between">
                <span
                    className={`flex size-9 items-center justify-center rounded-lg ${color}`}
                >
                    <KeyRound className="size-4" />
                </span>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setShowDeleteModal(true)}
                        aria-label={`Delete ${name}`}
                        className="rounded-md bg-red-500 border border-white/10 p-1.5 text-white transition hover:bg-red-400 hover:border-red-400/30"
                    >
                        <Trash2 className="size-4" />
                    </Button>
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
            </div>
            <h3 className="mt-5 text-sm font-medium text-white">{name}</h3>
            <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                <span>{created_at?.toDateString()}</span>
                <span className="font-mono tracking-widest">••••••••</span>
            </div>
        </article>
    );
}
