"use client";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const navigate = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const timerRef = useRef<null | NodeJS.Timeout>(null);

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("query", searchTerm);
            navigate.push(`?${newSearchParams.toString()}`, { scroll: false });
        }, 300);
    }, [searchTerm]);

    return (
        <label className="relative flex-1 sm:w-56">
            <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-600"
            />
            <input
                aria-label="Search secrets"
                placeholder="Search secrets..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
                className="h-10 w-full rounded-lg border border-white/10 bg-[#0d1513] pl-9 pr-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-emerald-400/60"
            />
        </label>
    );
}
