"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserAuthSignupForm } from "./components/user_auth_form_sign_up";
import { useState } from "react";
import ModeToggle from "@/components/mode-toggle";
import { Logo } from "@/components/logo";

const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

interface AuthenticationPageProps {
  googleSignIn: () => void;
  googleSignUp: () => void;
}

const AuthenticationPage: React.FC<AuthenticationPageProps> = ({
  googleSignIn,
  googleSignUp,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);

  //* Function to toggle between Login and Sign Up
  const toggleLabel = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="flex items-center space-x-4 absolute left-4 top-4 md:left-8 md:top-8">
          <ModeToggle />
          <Button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "md:right-8 md:top-8"
            )}
            onClick={toggleLabel}
          >
            {isSignUp ? "Sign in" : "Sign Up"}
          </Button>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-6xl font-bold tracking-tight mb-8">
                Track Flaw
              </h1>
              <h1 className="text-2xl font-semibold tracking-tight">
                {isSignUp ? "Create an account" : "Sign in an account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthSignupForm
              isSignUp={isSignUp}
              googleSignIn={googleSignIn}
              googleSignUp={googleSignUp}
            />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div
          className="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex bg-cover bg-center"
          style={{ backgroundImage: 'url("/peakpx.jpg")' }}
        >
          <div className="absolute inset-0" />
          <div className="relative">
            <div className="absolute top-1 right-4 flex items-center text-lg font-medium md:right-8 md:bottom-8">
              <Logo />
              &nbsp;&nbsp;Buggy Cat, Inc
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg w-1/2">
                &ldquo;
                {
                  "The Track Flaw's powerful features have saved me countless hours of work and allowed me to deliver flawless software to my clients faster than ever before."
                }
                &rdquo;
              </p>
              <footer className="text-sm">Mr. Robot</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticationPage;
