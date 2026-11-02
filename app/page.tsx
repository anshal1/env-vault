import { Footer } from "@/components/footer";
import { HomeScreen } from "@/components/home-screen";
import { Navbar } from "@/components/navbar";
import { RetrieveScreens } from "@/components/retrieve-screens";
import { StoreScreen } from "@/components/store-screen";
import { VaultScreen } from "@/components/vault-screen";
import { getCurrentUser } from "./actions/user";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#080d0c] text-zinc-100 selection:bg-emerald-400/20">
      <Navbar user={user.data?.username ?? null} />
      <HomeScreen />
      <StoreScreen user={user.data?.username ?? null} />
      <VaultScreen />
      <RetrieveScreens />
      <Footer />
    </main>
  );
}
