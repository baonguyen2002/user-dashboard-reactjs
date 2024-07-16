"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function RoleDropdownMenu({ role, setRole }) {
  //const [position, setPosition] = React.useState("bottom");
  const handleOnChange = (value) => {
    setRole(value);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-light5">
          {role.charAt(0).toUpperCase() + role.slice(1)}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-light5">
        <DropdownMenuRadioGroup value={role} onValueChange={handleOnChange}>
          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="user">User</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
