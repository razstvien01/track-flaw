"use client"

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { useUserDataAtom } from "@/hooks/user_data_atom";

export default function Home() {
  const [currentUser, setCurrentUser] = useUserDataAtom()

  if(!currentUser)
    return null

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <header className="py-4">
        <div className="container mx-auto text-white text-center">
          <h1 className="text-3xl font-semibold">Welcome to Track Flaw</h1>
          <p className="mt-2">Explore and manage your data.</p>
        </div>
      </header> */}
      <PageHeader className="items-center">
        <PageHeaderHeading className="text-5xl">Welcome to the</PageHeaderHeading>
        <PageHeaderHeading className="text-9xl">Track Flaw !!!</PageHeaderHeading>
        <PageHeaderDescription>
          {`It's a bug tracking app that makes it effortless for team members to report and manage bugs, ensuring seamless collaboration across the development and testing phases. Track Flaw centralizes the management of software issues from initial reporting through resolution and verification.`}
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
