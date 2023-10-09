"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { UserDataProps } from "../types/types";
import { useCurrOrgDataAtom } from "../hooks/curr_org_data_atom";
import { MAIN_COMPONENTS } from "../types/constants";

interface NavigationItemProps {
  href: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
  query?: { [key: string]: string | undefined };
}

function NavigationItem({
  href,
  text,
  isActive,
  onClick,
  query,
}: NavigationItemProps) {
  console.log("QUERT", query);
  return (
    <Link
      href={{
        pathname: href,
        query: query,
      }}
      className={`text-lg font-medium transition-colors hover:text-primary ${
        isActive ? "" : "text-muted-foreground"
      }`}
      onClick={onClick}
    >
      {text.toLowerCase().charAt(0).toUpperCase() +
        "" +
        text.toLowerCase().slice(1)}
    </Link>
  );
}

interface MainNavProps {}

export function MainNav({}: MainNavProps) {
  const [clickedComponent, setClickedComponent] = useState<string>("");

  const [currOrgData, setCurrOrgData] = useCurrOrgDataAtom();
  const { org_id = "" } = currOrgData || {};

  const handleComponentClick = (componentName: string) => {
    setClickedComponent(componentName);
  };

  useEffect(() => {
    console.log("org_id changed to:", org_id);
  }, [org_id]);

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}>
      {Object.values(MAIN_COMPONENTS).map((component) => {
        const routeStr = `/views/${component.toLowerCase()}`;
        const query = component === "DASHBOARD" && org_id ? { org_id } : {};

        return (
          <NavigationItem
            key={component}
            href={routeStr}
            text={component}
            isActive={clickedComponent === component}
            onClick={() => handleComponentClick(component)}
            query={query}
          />
        );
      })}
    </nav>
  );
}
