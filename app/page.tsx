import { Footer } from "@/components/footer";
import { HomeScreen } from "@/components/home-screen";
import { Navbar } from "@/components/navbar";
import { RetrieveScreens } from "@/components/retrieve-screens";
import { StoreScreen } from "@/components/store-screen";
import { VaultScreen } from "@/components/vault-screen";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#080d0c] text-zinc-100 selection:bg-emerald-400/20">
      <Navbar />
      <HomeScreen />
      <StoreScreen />
      <VaultScreen />
      <RetrieveScreens />
      <Footer />
    </main>
  );
}
