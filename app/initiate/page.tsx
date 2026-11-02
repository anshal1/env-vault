import { InitiateScreen } from "@/components/initiate-screen";
import { getCookie } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function InitiatePage() {
  const token = await getCookie("token");
  if (token) return redirect("/");
  return (
    <main className="min-h-screen bg-[#080d0c] text-zinc-100 selection:bg-emerald-400/20">
      <InitiateScreen />
    </main>
  );
}
