import { CircleCheck } from "lucide-react";
import React from "react";

export default function Success({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
      <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
      <div>
        <p className="text-sm font-medium text-emerald-300">{title}</p>
        <p className="mt-1 text-xs leading-5 text-emerald-300/60">{message}</p>
      </div>
    </div>
  );
}
