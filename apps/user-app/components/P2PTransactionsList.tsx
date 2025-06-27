import prisma from "@repo/db/client";

function formatDate(date: Date) {
  return new Date(date).toLocaleString();
}

export async function P2PTransactionsList({ userId }: { userId: number }) {
  let transactions: any[] = [];
  if (userId) {
    transactions = await prisma.p2pTransfer.findMany({
      where: {
        OR: [
          { fromUserId: userId },
          { toUserId: userId }
        ]
      },
      orderBy: { timestamp: "desc" },
      include: {
        fromUser: { select: { name: true, number: true } },
        toUser: { select: { name: true, number: true } }
      }
    });
  }

  return (
    <div className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col">
      <h2 className="text-2xl font-extrabold text-purple-700 mb-6 text-center drop-shadow">Your P2P Transactions</h2>
      <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        {transactions.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold py-12">No P2P transactions yet.</div>
        ) : (
          transactions.map((txn, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="text-sm font-semibold text-blue-700">
                  {txn.fromUserId === userId ? "Sent to" : "Received from"} {txn.fromUserId === userId ? (txn.toUser.name || txn.toUser.number) : (txn.fromUser.name || txn.fromUser.number)}
                </div>
                <div className="text-slate-600 text-xs">{formatDate(txn.timestamp)}</div>
              </div>
              <div className={`flex flex-col justify-center text-lg font-bold ${txn.fromUserId === userId ? 'text-red-500' : 'text-green-600'}`}>
                {txn.fromUserId === userId ? '-' : '+'} Rs {txn.amount}
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
} 