"use client";
import { CircleAlert, Lock } from "lucide-react";
import { SectionLabel } from "./section-label";
import { TextField } from "./text-field";
import { Button } from "./ui/button";
import { useState, SubmitEvent } from "react";
import { verify } from "@/lib/client-utils";
import UnlockedScreen from "./unlocked-screen";
import Error from "./error";

export function RetrieveScreens({
    title,
    env,
    hint,
}: {
    title: string;
    env: string;
    hint: string | null;
}) {
    const [decodedEnv, setDecodedEnv] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const secret = fd.get("secret");
        if (!secret) return;
        try {
            const decodec = await verify(env, secret?.toString());
            setDecodedEnv(decodec.data as string);
        } catch (e) {
            setError("Incorrect secret key. Please try again.");
        }
    };
    return (
        <div className="bg-transparent rounded-2xl space-y-2 p-1.5">
            {decodedEnv ? (
                <UnlockedScreen
                    title={title}
                    env={decodedEnv}
                    setError={setError}
                />
            ) : (
                <div
                    id="retrieve"
                    className="rounded-xl border border-white/10 bg-[#0d1513] p-6 sm:p-8"
                >
                    <SectionLabel>Retrieve secret · locked</SectionLabel>
                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                        <Lock className="size-5" />
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold text-white">
                        Unlock {title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                        Enter the secret key you created for this environment.
                    </p>

                    <p className=" text-sm font-medium leading-6 text-primary">
                        Hint = {hint ?? "No hint for this env"}
                    </p>
                    <form
                        className="mt-7 flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label="Secret key"
                            type="password"
                            name="secret"
                            eye
                            mono
                        />
                        <Button
                            className="h-11 rounded-lg bg-emerald-400 text-sm font-semibold text-[#07100d] cursor-pointer"
                            type="submit"
                        >
                            Unlock vault
                        </Button>
                    </form>
                </div>
            )}

            {error ? <Error title="Decoding Failed" message={error} /> : null}
        </div>
    );
}
