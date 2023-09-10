"use client"

import Link from "next/link";
import { useState } from "react"; // Import useState to manage the clicked component state

import { cn } from "@/lib/utils";

const enum MAIN_COMPONENTS {
  DASHBOARD = 'DASHBOARD',
  PROJECTS = 'PROJECTS',
  TEAMS = 'TEAMS',
  BUGS = 'BUGS'
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [clickedComponent, setClickedComponent] = useState("");

  // Function to handle the component click
  const handleComponentClick = (componentName: string) => {
    setClickedComponent(componentName);
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/views/dashboard"
        className={`text-lg font-medium transition-colors hover:text-primary ${(clickedComponent === MAIN_COMPONENTS.DASHBOARD ? '' : 'text-muted-foreground')}`}
        onClick={() => handleComponentClick(MAIN_COMPONENTS.DASHBOARD)}
      >
        Dashboard
      </Link>
      <Link
        href="/views/projects"
        className={`text-lg font-medium transition-colors hover:text-primary ${(clickedComponent === MAIN_COMPONENTS.PROJECTS ? '' : 'text-muted-foreground')}`}
        onClick={() => handleComponentClick(MAIN_COMPONENTS.PROJECTS)}
      >
        Projects
      </Link>
      <Link
        href="/views/teams"
        className={`text-lg font-medium transition-colors hover:text-primary ${(clickedComponent === MAIN_COMPONENTS.TEAMS ? '' : 'text-muted-foreground')}`}
        onClick={() => handleComponentClick(MAIN_COMPONENTS.TEAMS)}
      >
        Teams
      </Link>
      <Link
        href="/views/bugs"
        className={`text-lg font-medium transition-colors hover:text-primary ${(clickedComponent === MAIN_COMPONENTS.BUGS ? '' : 'text-muted-foreground')}`}
        onClick={() => handleComponentClick(MAIN_COMPONENTS.BUGS)}
      >
        Bugs
      </Link>
    </nav>
  );
}
