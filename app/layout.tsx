import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
