"use server";
import { ApiError, trycatchAction } from "@/lib/server-utils";
import { Env, EnvInsert } from "../db/schema/env";
import { getCurrentUser } from "./user";
import { db } from "../db";
import { and, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveEnv(env: EnvInsert) {
    return trycatchAction(async () => {
        if (!env.env || !env.label)
            throw new ApiError("Env label and env are required", 400);
        const user = await getCurrentUser();
        if (!user.data) {
            throw new ApiError("Vault not found", 404);
        }

        const savedEnv = (
            await db
                .insert(Env)
                .values({ ...env, vault: user.data.id })
                .returning({ id: Env.id })
        )[0];
        if (!savedEnv) throw new ApiError("Unable to save the env", 500);
        revalidatePath("/");
        return { id: savedEnv.id };
    });
}

export async function getUserEnv(page: number, query?: string) {
    return trycatchAction(async () => {
        if (page <= 0) throw new ApiError("Invalid page number", 400);
        const LIMIT = 6;
        const user = await getCurrentUser();
        if (!user.data?.id) return { envs: [], isNextPage: false };
        const envs = await db
            .select({
                env: Env.env,
                label: Env.label,
                created_at: Env.created_at,
                id: Env.id,
                hint: Env.hint,
            })
            .from(Env)
            .where(
                and(
                    eq(Env.vault, user.data.id),
                    ilike(Env.label, `%${query ?? ""}%`),
                ),
            )
            .limit(LIMIT + 1)
            .offset(LIMIT * (page - 1));
        return { envs: envs.slice(0, LIMIT), isNextPage: envs.length > LIMIT };
    });
}

export async function deleteEnv(envId: number) {
    return trycatchAction(async () => {
        const user = await getCurrentUser();
        if (!user.data?.id) {
            throw new ApiError("Vault not found", 404);
        }
        const result = await db
            .delete(Env)
            .where(and(eq(Env.id, envId), eq(Env.vault, user.data.id)))
            .returning({ id: Env.id });
        if (result.length === 0) {
            throw new ApiError("Environment not found", 404);
        }
        revalidatePath("/");
        return { success: true };
    });
}
