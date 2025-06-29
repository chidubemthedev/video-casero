import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Menu } from "lucide-react";

const DropdownList = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 hover:cursor-pointer border rounded-2xl p-2">
        <Menu className="w-4 h-4" />
        Most Popular <ChevronRight className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="focus:bg-primary focus:text-white">
          Most Recent
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-primary focus:text-white">
          Most Popular
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-primary focus:text-white">
          Most Viewed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownList;
