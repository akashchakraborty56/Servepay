import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: Use proper credentials type from next-auth
           authorize:async (
            credentials:any
          )=> {
            console.log("Authorize called with credentials:", credentials);

            if (!credentials || !credentials.phone || !credentials.password) {
              console.log("Missing credentials");
              return null;
            }
            // Do zod validation, OTP validation here

            // Check if user exists
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });
            console.log("Existing user:", existingUser);

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                console.log("Password validation result:", passwordValidation);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

              try {
                  const hashedPassword =await  bcrypt.hash(credentials.password, 10);
                  console.log("Hashed password:", hashedPassword);
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword,
                        Balance: {
                            create: {
                                amount: 0,
                                locked: 0
                            }
                        }
                    },
                    include: { Balance: true }
                });
                console.log("Created user and balance:", user);
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error("Error during user/balance creation:", e);
                return null
            }

            
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  