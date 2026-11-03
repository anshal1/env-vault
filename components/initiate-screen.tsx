"use client";

import { KeyRound, ArrowRight } from "lucide-react";
import { TextField } from "./text-field";
import React, { useState } from "react";
import { User } from "@/app/db/schema/users";
import { createNewUser } from "@/app/actions/user";
import { setCookie } from "@/lib/client-utils";
import Error from "./error";
import Success from "./success";

export function InitiateScreen() {
  const [apiState, setApiState] = useState({
    loading: false,
    error: "",
    success: "",
  });
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata) as unknown as User;
    setApiState((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const res = await createNewUser(data);
    if (res.err?.message) {
      setApiState(() => {
        return {
          loading: false,
          error: res.err?.message ?? "",
          success: "",
        };
      });
      return;
    }
    setApiState(() => ({
      loading: false,
      error: "",
      success: "User Initialization Successfull",
    }));

    if (res.data) {
      setCookie("token", res.data.token);
      window.location.reload();
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080d0c] px-5 py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#0d1513]/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.15)]">
              <KeyRound className="size-7" strokeWidth={2} />
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Initiation
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Establish your vault identity.
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value=""
              name="username"
              placeholder="Choose a username"
              mono
            />
            <TextField
              label="Password"
              type="password"
              value=""
              placeholder="Enter your password"
              name="password"
              eye
              mono
            />

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-semibold text-[#07100d] shadow-[0_8px_30px_rgba(52,211,153,0.15)] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={apiState.loading}
            >
              Begin <ArrowRight className="size-4" />
            </button>

            {apiState.error ? (
              <Error title="Error" message={apiState.error} />
            ) : null}

            {apiState.success ? (
              <Success title="Success" message={apiState.success} />
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
