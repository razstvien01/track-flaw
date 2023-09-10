"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

const MAIN_COMPONENTS: Record<string, string> = {
  DASHBOARD: "DASHBOARD",
  PROJECTS: "PROJECTS",
  TEAMS: "TEAMS",
  BUGS: "BUGS",
};

interface NavigationItemProps {
  href: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
}

function NavigationItem({
  href,
  text,
  isActive,
  onClick,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={`text-lg font-medium transition-colors hover:text-primary ${
        isActive ? "" : "text-muted-foreground"
      }`}
      onClick={onClick}
    >
      {text.toLowerCase().charAt(0).toUpperCase() + '' + text.toLowerCase().slice(1)}
    </Link>
  );
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [clickedComponent, setClickedComponent] = useState<string>("");

  const handleComponentClick = (componentName: string) => {
    setClickedComponent(componentName);
  };

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {Object.values(MAIN_COMPONENTS).map((component) => (
        <NavigationItem
          key={component}
          href={`/views/${component.toLowerCase()}`}
          text={component}
          isActive={clickedComponent === component}
          onClick={() => handleComponentClick(component)}
        />
      ))}
    </nav>
  );
}
