import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

async function getUserId() {
    const session = await getServerSession(authOptions);
    return session?.user?.id || "";
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    const userId: string = await getUserId();
    

    return <div className="min-h-screen w-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
        <div className="text-4xl text-purple-700 pt-12 mb-8 font-extrabold drop-shadow text-center">Transfer</div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 p-6 max-w-5xl mx-auto">
            <div className="bg-white/90 rounded-2xl shadow-xl p-6">
                <AddMoney userId={userId} />
            </div>
            <div className="bg-white/90 rounded-2xl shadow-xl p-6">
                <BalanceCard amount={balance.amount*100} locked={balance.locked} />
                <div className="pt-6">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}