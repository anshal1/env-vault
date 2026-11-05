"use client";
import { cn } from "@/lib/client-utils";
import React, { ComponentProps, ReactElement, useEffect, useRef } from "react";

interface ModalProps extends ComponentProps<"dialog"> {
    children: React.ReactNode;
    openModal: boolean;
}

export default function Modal({
    children,
    openModal,
    ...rest
}: ModalProps): ReactElement<HTMLDialogElement> {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
        if (openModal) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [openModal]);
    return (
        <dialog
            {...rest}
            ref={dialogRef}
            className={cn(
                "max-w-none max-h-none backdrop:bg-black/80 m-0 bg-transparent overflow-hidden rounded-2xl backdrop-blur-xl w-screen h-screen flex items-center justify-center flex-col",
                rest.className,
            )}
        >
            <span className="text-md font-semibold font-mono">
                [Esc] to close
            </span>
            {children}
        </dialog>
    );
}
