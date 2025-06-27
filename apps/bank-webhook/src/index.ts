import express from "express";
import db from "@repo/db/client";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json())


app.post("/bankWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    
    // Validate and convert incoming data
    try{
    console.log("From backend-webhook: ", req.body);
    
    const { token, userId, amount } = req.body;
    
    if (!token || !userId || amount === undefined) {
        console.log("fields missing");
        
        return res.status(400).json({
            message: "Missing required fields: token, userId, amount"
        });
    }
    
    

    // Validate that amount is a valid number
    

    
        const balance = await db.balance.findFirst({
            where: {
                userId: Number(userId)
            }
        });
        if (!balance) {
            console.log(`balance not found`);
            
            await db.balance.create({
            data: {
                userId: Number(userId),
                amount: amount,
                locked: 0
            }
            })

            return res.json({
            message: "Captured"
            })
        }

       
        

        const initialAmount = balance.amount || 0;
        const amountToAdd = amount || 0;

        
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(userId)
                },
                data: {
                    amount: initialAmount + amountToAdd, 
                    
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        console.log(`Transaction successful: UserId=${userId}, Amount=${amount}, Token=${token}`);
        

        res.json({
            message: "Captured"
        })
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

})

app.listen(3003);