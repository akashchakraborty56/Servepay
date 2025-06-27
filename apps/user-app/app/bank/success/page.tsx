"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <div className="bg-white/90 rounded-3xl shadow-2xl px-12 py-10 flex flex-col items-center">
        <div className="mb-6">
          <svg className="w-20 h-20 text-green-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-green-600 mb-2 drop-shadow">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-6">Redirecting to your dashboard...</p>
        <div className="w-full flex justify-center">
          <div className="w-32 h-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full overflow-hidden">
            <div className="h-full bg-white/60 animate-pulse" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
