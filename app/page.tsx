"use client";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { useUserDataAtom } from "@/hooks/user_data_atom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function Home() {
  const [currentUser, setCurrentUser] = useUserDataAtom();

  if (!currentUser) return null;

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 mt-20 pt-10 pl-5">
        <PageHeader>
          <PageHeaderHeading className="text-5xl">
            Welcome to the
          </PageHeaderHeading>
          <PageHeaderHeading className="text-9xl">
            Track Flaw !!
          </PageHeaderHeading>
          <PageHeaderDescription>
            {`It's a bug tracking app that makes it effortless for team members to report and manage bugs, ensuring seamless collaboration across the development and testing phases. Track Flaw centralizes the management of software issues from initial reporting through resolution and verification.`}
          </PageHeaderDescription>
        </PageHeader>

        {/* Add items-center class here */}
        <Link href="/dashboard">
          <Button
            className="mt-10 ml-5 w-[200px]"
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* Right Content */}
      <div
        className="flex-1 relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex bg-cover bg-center"
        style={{
          backgroundImage: 'url("/peakpx.jpg")',
          backgroundSize: "cover", // Cover the entire container
          backgroundPosition: "top", // Start from the top
          minHeight: "100vh", // Minimum height of the viewport
        }}
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
  );
}
