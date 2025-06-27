"use client";

import {  useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function HDFCBankPage() {
    const [customerId, setCustomerId] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Get parameters from URL and convert to proper types
    const userId = searchParams.get('userId') || "";
    const amount = Number(searchParams.get('amount')) || 0;

    const handleRedirect = async () => {
        // Redirect to the bank-webhook service, passing customerId as a query param
        // You may want to change the URL if the bank-webhook is hosted elsewhere
        //window.location.href = `http://localhost:3003/bankWebhook`;

        const token = (Math.random() * 1000).toString();
        console.log(`UserId= ${userId}, Amount= ${amount}, Token= ${token}`);
        

        if( !customerId || customerId.trim() === "") {
            alert("Please enter a valid Customer ID.");
            return;
        }

       const response=await axios.post('http://localhost:3003/bankWebhook', {
            userId,
            amount,
            token
       })
        
        if (response.status === 200) {
            
            router.push('/bank/success')
        } else {
            alert("Payment failed. Please try again.");
        }
        
        // You can also handle the response here, e.g., redirect to a success page
        // window.location.href = `/success?token=${token}`;
    }

    return (
        
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
            <Card title="HDFC Bank Customer Login">
                <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col gap-6 mt-4 min-w-[320px]">
                    <TextInput label="Customer ID" placeholder="Enter your customer ID" onChange={setCustomerId} />
                    <Button onClick={handleRedirect}>
                        <span className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold shadow hover:scale-105 transition-transform">Continue to Bank Webhook</span>
                    </Button>
                </div>
            </Card>
            </div>
        
    )
}