import { KeyRound } from "lucide-react";

export function SecretCard({
    name,
    created_at,
    color,
    env,
}: {
    name: string;
    created_at: Date | null;
    color: string;
    env: string;
}) {
    return (
        <article className="rounded-xl border border-white/10 bg-[#0d1513] p-5 transition hover:border-white/20">
            <div className="flex items-start justify-between">
                <span
                    className={`flex size-9 items-center justify-center rounded-lg ${color}`}
                >
                    <KeyRound className="size-4" />
                </span>
                <button
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
