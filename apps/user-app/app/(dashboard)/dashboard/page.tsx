import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

function getInitials(name?: string | null) {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  let user = null;
  if (userId) {
    user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, number: true, email: true }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="bg-white/80 shadow-2xl rounded-3xl px-12 py-10 text-center flex flex-col items-center animate-fade-in-up">
        <span className="text-4xl font-extrabold text-purple-700 drop-shadow mb-6">Dashboard</span>
        {user && (
          <div className="mt-4 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center w-full max-w-md">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg mb-4">
              {getInitials(user.name)}
            </div>
            <div className="text-2xl font-bold text-purple-700 mb-1">{user.name || 'No Name'}</div>
            <div className="text-lg text-gray-700 mb-1">📱 {user.number}</div>
            {user.email && <div className="text-md text-gray-500 mb-2">✉️ {user.email}</div>}
            <div className="mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold shadow hover:scale-105 transition-transform inline-block">Welcome to ServePay!</div>
          </div>
        )}
      </div>
    </div>
  );
}