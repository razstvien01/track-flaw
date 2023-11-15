import Image from "next/image";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ProjectDataProps } from "@/types/types";

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: any;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function ProjectCard({
  project,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProjectCardProps) {
  const {
    project_name = "",
    project_description = "",
    photo_url = "",
    project_id = ""
  } = project as ProjectDataProps || {};

  const router = useRouter();

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          onClick={() => {
            router.push(`/projects/${project_id}`);
          }}
          src={photo_url}
          alt={project_name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[1/1.7]" : "aspect-square"
          )}
        />
        {/* </a> */}
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{project_name}</h3>
        <p className="text-xs text-muted-foreground">{project_description}</p>
      </div>
    </div>
  );
}
