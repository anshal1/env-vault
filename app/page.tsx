import { Footer } from "@/components/footer";
import { HomeScreen } from "@/components/home-screen";
import { Navbar } from "@/components/navbar";
import { RetrieveScreens } from "@/components/retrieve-screens";
import { StoreScreen } from "@/components/store-screen";
import { VaultScreen } from "@/components/vault-screen";
import { getCurrentUser } from "./actions/user";
import { Suspense } from "react";
import Loader from "@/components/loader";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ page: string; query: string }>;
}) {
    const [user, searchPara] = await Promise.all([
        getCurrentUser(),
        searchParams,
    ]);
    const { page, query } = searchPara;

    return (
        <main className="min-h-screen bg-[#080d0c] text-zinc-100 selection:bg-emerald-400/20">
            <Navbar user={user.data?.username ?? null} />
            <Suspense fallback={"Loading..."}>
                <HomeScreen />
            </Suspense>
            <StoreScreen user={user.data?.username ?? null} />
            <Suspense fallback={<Loader />}>
                <VaultScreen page={page} query={query} />
            </Suspense>
            <RetrieveScreens />
            <Suspense>
                <Footer />
            </Suspense>
        </main>
    );
}
