"use server";

import {
    ApiError,
    comparePass,
    getCookie,
    hashPass,
    sign,
    trycatchAction,
    verify,
} from "@/lib/server-utils";
import { User, Users } from "../db/schema/users";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function userNameAlreadyTaken(username: string) {
    const [userExists] = await db
        .select({
            username: Users.username,
            password: Users.password,
            id: Users.id,
        })
        .from(Users)
        .where(eq(Users.username, username));
    return userExists ?? null;
}

export async function getCurrentUser() {
    return trycatchAction(async () => {
        const token = await getCookie("token");
        if (!token) return null;
        const username = verify(token) as {
            plainText: string;
            iat: number;
            exp: number;
        };
        const user = await userNameAlreadyTaken(username.plainText);
        if (!user) return null;
        return { username: user.username, id: user.id };
    });
}

export async function login(user: User) {
    if (!user.username) throw new ApiError("Username is required", 400);
    if (!user.password) throw new ApiError("Password is required", 400);
    const userNameExists = await userNameAlreadyTaken(user.username);
    if (!userNameExists)
        throw new ApiError("Invalid username or password", 400);
    if (!comparePass(user.password, userNameExists.password)) {
        throw new ApiError("Invalid username or password", 400);
    }
    const token = sign(userNameExists.username);
    return { token };
}

export async function createNewUser(user: User) {
    return trycatchAction(async () => {
        if (!user.username) throw new ApiError("Username is required", 400);
        if (!user.password) throw new ApiError("Password is required", 400);
        if (user.password.length < 6)
            throw new ApiError(
                "Password must be atleast 6 characters long",
                400,
            );
        const userNameExists = await userNameAlreadyTaken(user.username);
        if (userNameExists) {
            return login(user);
        }
        const [addUser] = await db
            .insert(Users)
            .values({ ...user, password: hashPass(user.password) })
            .returning({ username: Users.username });

        const token = sign(addUser.username);
        return { token };
    });
}
