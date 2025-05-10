import NextAuth from "next-auth"
import GoogleProvider  from "next-auth/providers/google";
import dotenv from 'dotenv'
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../../models/User'
dotenv.config()



export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      credentials:{
        login: { label: 'login', type: 'login' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        const{login, password} = credentials
        const user = await User.findOne({ where: { login } }) as unknown as { id: number; login: string; password: string };
        if (!user || user.password !== password) {
          return null;
        }
    
        return {
          id: user.id.toString(),
          name: user.login,
          email: user.login
        };
        
      },
    })


  ],
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST };

