"use client";
import TelegramLoginButton from "@/components/TelegramLoginButton";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { LoginButton } from '@telegram-auth/react';

const Auth = () => {
  const [number, setNumber] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("telegram", {
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        number,
      });
      setNumber("");
      //login();
    } catch (error) {
      console.log(error);
    }
  }, [number]);

  return (
    <div className="relative h-full w-full">
      <div className="bg-black w-full h-screen lg:bg-opacity-80">
        <div className="flex justify-center h-full">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <label
              htmlFor="number"
              className="block text-sm font-medium leading-6 text-white"
            >
              Student&#8242;s number
            </label>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                id="number"
                name="number"
                placeholder="Type Number"
                autoComplete="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNumber(e.target.value);
                }}
                value={number}
                required
              />
            </div>
            {variant === "login" ? (
                <LoginButton
                botUsername="TrafficLabLoginBot"
                onAuthCallback={(data) => {
                    console.log(data)
                    //signIn("telegram-login", { callbackUrl: '/' }, data as any);
                }}
            />
            ) : (
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>
            )}
            <p className="text-neutral-500 mt-12">
              {variant === "login" ? "First Time?" : "Already have an account?"}{" "}
              &nbsp;
              <span
                onClick={toggleVariant}
                className="text-white mt-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
