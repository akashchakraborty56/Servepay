import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8 text-gray-500 font-semibold">No Recent transactions</div>
        </Card>
    }
    // Sort transactions by time descending (most recent first)
    const sortedTxns = [...transactions].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    return <Card title="Recent Transactions">
        <div className="pt-2 bg-white/90 rounded-2xl shadow-xl p-6">
            <div className="flex flex-col gap-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent py-2">
                {sortedTxns.map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <div className="text-sm font-semibold text-blue-700">Received INR</div>
                            <div className="text-slate-600 text-xs">{t.time.toDateString()}</div>
                        </div>
                        <div className="flex flex-col justify-center text-lg font-bold text-green-600">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Card>
}