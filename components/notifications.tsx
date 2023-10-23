import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator"

import { BellIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const Notifications = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {theme === 'light' ? (
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        ) : (
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        )}
        
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ScrollArea className="h-72 w-48 rounded-md">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
