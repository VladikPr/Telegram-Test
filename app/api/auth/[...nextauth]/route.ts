import NextAuth, { AuthOptions } from "next-auth";
import prismadb from '@/libs/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions  = {
    adapter: PrismaAdapter(prismadb),
    providers: [
        CredentialsProvider({
            id: 'telegram',
            name: "Telegram",
            credentials: {},
            async authorize(credentials, req): Promise<any>  {

              //const { hash, ...userDetails } = req.query;
              //console.log()


              /* if (!credentials?.number) {
                throw new Error('Number required');
              }

              const user = await prismadb.user.findUnique({ where: {
                number: credentials.number
              }})

              if (!user) {
                throw new Error('User does not exist');
              } */

              // Telegram Bot sends back: user's Telegram ID, first and last name, username, avatar URL, date of the authentication
              
              // console.log(user)
              return null
            }
          })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV === "development"
}



const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST}