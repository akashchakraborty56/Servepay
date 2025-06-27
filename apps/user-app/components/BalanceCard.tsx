import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="bg-white/90 rounded-2xl shadow-xl p-8">
            <div className="flex justify-between border-b border-slate-200 pb-2 font-semibold text-purple-700">
                <div>Unlocked balance</div>
                <div>{amount / 100} INR</div>
            </div>
            <div className="flex justify-between border-b border-slate-200 py-2 text-blue-700 font-medium">
                <div>Total Locked Balance</div>
                <div>{locked / 100} INR</div>
            </div>
            <div className="flex justify-between border-b border-slate-200 py-2 text-pink-700 font-bold">
                <div>Total Balance</div>
                <div>{(locked + amount) / 100} INR</div>
            </div>
        </div>
    </Card>
}