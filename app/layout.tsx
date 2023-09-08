import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/header";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Track Flaw",
  description:
    "It is a bug tracking app that makes it effortless for team members to report and manage bugs, ensuring seamless collaboration across the development and testing phases. It centralizes the management of software issues from initial reporting through resolution and verification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="red-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header/>
          <div className="relative min-h-screen">
            {children}
            <Label className="absolute bottom-0 left-0 mb-2 ml-2">
              Created by Buggy Cat.
            </Label>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
