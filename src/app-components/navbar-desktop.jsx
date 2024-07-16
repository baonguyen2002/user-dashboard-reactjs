import { Button } from "@/components/ui/button";
import shadcnlogo from "../assets/shadcnlogo.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart3, Moon, Package, User } from "lucide-react";

export default function NavBarDeskTop() {
  return (
    <aside className="py-4 px-2 rounded-r-lg h-screen w-[80px] bg-light5 flex flex-col items-center justify-between">
      <img
        src={shadcnlogo}
        alt="Shadcn Logo"
        className="rounded-full w-12 h-12"
      />
      <div className="flex flex-col items-center w-full gap-4 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-16 h-16 rounded-3xl bg-light5 hover:bg-light3 text-light1">
                <User />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Users</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-16 h-16 rounded-3xl bg-light5 hover:bg-light3 text-light1">
                <Package />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Products</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-16 h-16 rounded-3xl bg-light5 hover:bg-light3 text-light1">
                <BarChart3 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Analytics</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="h-16 w-16"></div>
    </aside>
  );
}
