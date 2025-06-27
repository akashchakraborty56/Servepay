"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

import { Select } from "@repo/ui/select";
import {  useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { useRouter } from "next/navigation";
import { createOnRampTransaction } from "../app/lib/actions/    createOnrampTransaction";

//import { useSession } from "next-auth/react";


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    
}, {
    name: "Axis Bank",
    
}];

export const AddMoney = ({ userId }: { userId: string }) => {
    //const [isClient, setIsClient] = useState(false)
 
  
    
    //const session = useSession();
    const router = useRouter();
    //const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name||"");

    const handleClick = async () => {
        await createOnRampTransaction(
        provider,
        amount
       )
        
        if (provider === "HDFC Bank") {
            router.push(`./bank/hdfc?userId=${userId}&amount=${amount}`);
        }
        else if (provider === "Axis Bank") {
            router.push(`./bank/axis?userId=${userId}&amount=${amount}`);
        }
           
        
        
        
    }

    return (
        <>
        <Card title="Add Money">
            <div className="bg-white/90 rounded-2xl shadow-xl p-8 w-full">
                <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                    setAmount(Number(value))
                }} />
                <div className="py-4 text-left font-semibold text-purple-700">Bank</div>
                <Select onSelect={(value) => {
                        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
                <div className="flex justify-center pt-6">
                        <Button onClick={handleClick}>
                    <span className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold shadow hover:scale-105 transition-transform">Add Money</span>
                    </Button>
                </div>
            </div>
        </Card>
        </>
    )
}