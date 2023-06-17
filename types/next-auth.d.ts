import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    image: string;
    number: string;
  }

  interface Account {
    // Add any account-specific fields here, if needed
  }

  interface Profile {
    // Add any profile-specific fields here, if needed
  }

  interface Session {
    user: User;
  }
}