import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import shadcnlogo from "../assets/shadcnlogo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function NavBarMobile() {
  return (
    <div className="flex flex-row items-center justify-between p-4 text-light5">
      <Sheet>
        <SheetTrigger>
          <Button className="lg:hidden bg-light4 hover:bg-light3">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="bg-light3">
          <SheetHeader>
            <SheetTitle className="mt-5">
              <img
                src={shadcnlogo}
                alt="Shadcn Logo"
                className="rounded-full w-16 h-16"
              />
            </SheetTitle>
            {/* <SheetDescription className="text-light2 ">Menu</SheetDescription> */}
          </SheetHeader>
          <div className="flex flex-col items-center gap-8 text-2xl mt-8 font-bold  text-light1">
            <p>Users</p>
            <p>Products</p>
            <p>Analytics</p>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-row items-center justify-end w-4/5">
        <div className="flex flex-col mr-4 text-right">
          <p className="text-lg font-semibold">Renee McKelvey</p>
          <p className="text-sm font-extralight">Admin</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage alt="@shadcn" />
              <AvatarFallback className="text-light1 bg-light5">
                RK
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-light1 bg-light4">
            <DropdownMenuLabel className="text-center">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Setting</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
