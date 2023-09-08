import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/views/dashboard"
        className="text-lg font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/views/projects"
        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Projects
      </Link>
      <Link
        href="/views/teams"
        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Teams
      </Link>
      <Link
        href="/views/bugs"
        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Bugs
      </Link>
    </nav>
  );
}
