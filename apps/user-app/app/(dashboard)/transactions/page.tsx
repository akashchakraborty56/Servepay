import prisma from "@repo/db/client";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

function getInitials(name?: string | null) {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  const currentUserId = Number(session?.user?.id);
  const users = await prisma.user.findMany({
    where: { id: { not: currentUserId } },
    select: { name: true, number: true, email: true }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
      <div className="bg-white/80 shadow-2xl rounded-3xl px-12 py-10 text-center flex flex-col items-center animate-fade-in-up w-full max-w-2xl">
        <span className="text-4xl font-extrabold text-blue-700 drop-shadow mb-6">All Users</span>
        <div className="flex flex-col gap-6 w-full max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {users.map((user, idx) => (
            <div key={idx} className="flex items-center gap-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-6 hover:scale-[1.02] transition-transform">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center text-xl font-extrabold text-white shadow-lg">
                {getInitials(user.name)}
              </div>
              <div className="flex flex-col items-start flex-1">
                <div className="text-lg font-bold text-blue-700">{user.name || 'No Name'}</div>
                <div className="text-md text-gray-700">📱 {user.number}</div>
                {user.email && <div className="text-sm text-gray-500">✉️ {user.email}</div>}
              </div>
              <Link href={`/p2p?to=${user.number}`} className="ml-auto">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white shadow-lg hover:scale-110 hover:shadow-xl transition-transform" title="Send Money">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}