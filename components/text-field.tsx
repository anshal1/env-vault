"use client";
import { Eye } from "lucide-react";
import { ComponentProps, useState } from "react";

interface TextFieldPromps extends ComponentProps<"input"> {
  label: string;
  value?: string;
  type?: string;
  eye?: boolean;
  mono?: boolean;
  placeholder?: string;
}

export function TextField({
  label,
  value,
  type = "text",
  eye = false,
  mono = false,
  placeholder,
  ...rest
}: TextFieldPromps) {
  const [inputType, setInputType] = useState(type);
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-zinc-300">
      {label}
      <span className="relative">
        <input
          aria-label={label}
          type={inputType}
          defaultValue={value}
          placeholder={placeholder}
          className={`h-11 w-full rounded-lg border border-white/10 bg-[#0d1513] px-3.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10 ${mono ? "font-mono" : ""} ${eye ? "pr-10" : ""}`}
          {...rest}
        />
        {eye && (
          <Eye
            aria-hidden="true"
            className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-600 cursor-pointer"
            onClick={() => {
              setInputType((pre) => {
                return pre === "text" ? "password" : "text";
              });
            }}
          />
        )}
      </span>
    </label>
  );
}
