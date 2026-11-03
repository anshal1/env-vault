import { clsx, type ClassValue } from "clsx";

import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { twMerge } from "tailwind-merge";

const enc = new TextEncoder();

export function setCookie(name: string, value: string, days = 7) {
    const expires = new Date(
        Date.now() + days * 24 * 60 * 60 * 1000,
    ).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}
export async function sign(plainText: string, secret_key: string) {
    const jwt = await new SignJWT({ data: plainText })
        .setProtectedHeader({ alg: "HS256" })
        .sign(enc.encode(secret_key));
    return jwt;
}

export async function verify(hash: string, secret_key: string) {
    const { payload } = await jwtVerify(hash, enc.encode(secret_key));
    return payload;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
