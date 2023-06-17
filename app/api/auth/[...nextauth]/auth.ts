import NextAuth, { AuthOptions } from "next-auth";
import prismadb from '@/libs/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { objectToAuthDataMap, AuthDataValidator } from '@telegram-auth/server';

export const authOptions: AuthOptions  = {
    adapter: PrismaAdapter(prismadb),
    providers: [
      CredentialsProvider({
        id: 'telegram-login',
        name: 'Telegram Login',
        credentials: {},
        async authorize(credentials, req): Promise<any> {
  
          const data = req.query || {};
          const user = data?.first_name;
          console.log(user)
  
          if (user) {
            return {
              name: user
            };
          }
  
          return null;
        },
      }),
    ],
    pages: {
      signIn: '/auth',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV === "development"
}



const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST}