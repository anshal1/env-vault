import jwt from "jsonwebtoken";
import bc from "bcrypt";
import { cookies } from "next/headers";

export type Result<R> = {
    data?: R;
    err?: { message: string; code?: number };
};

export class ApiError extends Error {
    code: number | undefined;
    constructor(message: string, code: number | undefined) {
        super(message);
        this.code = code;
    }
}

export async function trycatchAction<R, A>(
    fn: () => Promise<R>,
): Promise<Result<R>> {
    try {
        const res = await fn();
        return { data: res, err: undefined };
    } catch (e) {
        console.log(e);
        if (e instanceof Error) {
            return { err: { message: e.message, code: 500 } };
        } else if (e instanceof ApiError) {
            return { err: { message: e.message, code: e.code } };
        }
        return { err: { message: "Something went wrong", code: 500 } };
    }
}

export function sign(plainText: string, secret_key?: string) {
    return jwt.sign({ plainText }, secret_key ?? process.env.SECRET!, {
        expiresIn: "7d",
    });
}

export function verify(hash: string) {
    return jwt.verify(hash, process.env.SECRET!);
}

export function hashPass(plainPassword: string) {
    const salt = bc.genSaltSync(10);
    return bc.hashSync(plainPassword, salt);
}

export function comparePass(plainPassword: string, hashPassword: string) {
    return bc.compareSync(plainPassword, hashPassword);
}

export async function getCookie(name: string) {
    const store = await cookies();
    return store.get(name)?.value;
}
