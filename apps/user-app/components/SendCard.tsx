"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState, useEffect } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useRouter, useSearchParams } from "next/navigation";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const toNumber = searchParams.get('to');
        if (toNumber) {
            setNumber(toNumber);
            // You could fetch the recipient's name here if needed
            setRecipientName(toNumber);
        }
    }, [searchParams]);

    const hasRecipient = !!searchParams.get('to');

    return <div className="min-h-[90vh] bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 flex items-center justify-center">
        <Center>
            <Card title="">
                <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 min-w-80 flex flex-col items-center animate-fade-in-up border-2 border-transparent hover:border-blue-300 transition-all duration-300">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 rounded-full blur-lg opacity-60"></div>
                    <div className="mb-6 w-full text-center">
                        <span className="inline-block text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 drop-shadow">
                            {hasRecipient ? `Send Money to ${recipientName}` : "Send Money Instantly"}
                        </span>
                    </div>
                    {!hasRecipient && (
                        <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                            setNumber(value)
                        }} />
                    )}
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-8 flex justify-center w-full">
                        <Button onClick={async () => {
                            if (number && amount) {
                                const response = await p2pTransfer(number, Number(amount))
                                if(response.message=="success")
                                    router.push("/bank/success")
                                else
                                {
                                    alert(response.message)
                                }
                            }
                            else {
                                if (!number)
                                {
                                    alert("Please enter number");
                                }
                                else if (!amount)
                                {
                                    alert("Please enter amount")
                                }
                            }
                        }}>
                            <span className="flex items-center gap-2 px-8 py-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                                Send
                            </span>
                        </Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}