import { X } from "lucide-react";
import React from "react";

export default function Error({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-red-400/20 bg-red-400/[0.05] p-4">
      <X className="mt-0.5 size-4 shrink-0 text-red-400" />
      <div>
        <p className="text-sm font-medium text-red-300">{title}</p>
        <p className="mt-1 text-xs leading-5 text-red-300/60">{message}</p>
      </div>
    </div>
  );
}
