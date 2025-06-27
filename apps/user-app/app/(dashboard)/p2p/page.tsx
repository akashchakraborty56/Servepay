import { SendCard } from "../../../components/SendCard";
import { P2PTransactionsList } from "../../../components/P2PTransactionsList";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function P2PPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 flex items-center justify-center py-12">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/30 border border-white/30">
        <div className="p-8 flex items-center justify-center bg-white/60 bg-clip-padding backdrop-blur-lg animate-fade-in-up">
          <SendCard />
        </div>
        {/* Vertical gradient divider for desktop */}
        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-400 via-pink-400 to-purple-400 rounded-full opacity-60 z-10" />
        <div className="p-8 flex items-center justify-center bg-white/60 bg-clip-padding backdrop-blur-lg animate-fade-in-up z-20">
          <P2PTransactionsList userId={userId} />
        </div>
      </div>
    </div>
  );
}