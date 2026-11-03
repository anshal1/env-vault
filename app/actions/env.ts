"use server";
import { ApiError, trycatchAction } from "@/lib/server-utils";
import { Env, EnvInsert } from "../db/schema/env";
import { getCurrentUser } from "./user";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function saveEnv(env: EnvInsert) {
    return trycatchAction(async () => {
        const user = await getCurrentUser();
        if (!user.data) {
            throw new ApiError("Vault not found", 404);
        }
        if (!env.env || !env.label)
            throw new ApiError("Env label and env are required", 400);

        const savedEnv = (
            await db
                .insert(Env)
                .values({ ...env, vault: user.data.id })
                .returning({ id: Env.id })
        )[0];
        if (!savedEnv) throw new ApiError("Unable to save the env", 500);
        return { id: savedEnv.id };
    });
}

export async function getUserEnv(page: number) {
    return trycatchAction(async () => {
        if (page <= 0) throw new ApiError("Invalid page number", 400);
        const LIMIT = 5;
        const user = await getCurrentUser();
        if (!user.data?.id) return { envs: [] };
        const envs = await db
            .select({
                env: Env.env,
                label: Env.label,
                created_at: Env.created_at,
            })
            .from(Env)
            .where(eq(Env.vault, user.data.id))
            .limit(LIMIT)
            .offset(LIMIT * (page - 1));
        return { envs };
    });
}
