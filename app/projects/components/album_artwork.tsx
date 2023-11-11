import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Album } from "../data/albums";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  project: any
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  project,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  const { project_name = "", project_description = "", photo_url = "" } = project || {}
  
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <a href="/projects/123">
          <Image
            // src={
            //   "https://images.unsplash.com/photo-1536904132820-d4760eae1463?auto=format&fit=crop&q=80&w=1976&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // }
            src={photo_url}
            alt={project_name}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[1/2]" : "aspect-square"
            )}
          />
        </a>
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{project_name}</h3>
        <p className="text-xs text-muted-foreground">{project_description}</p>
      </div>
    </div>
  );
}
