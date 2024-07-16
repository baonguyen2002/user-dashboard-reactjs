import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import DeleteDialog from "@/app-components/delete-dialog";
import EditDialog from "@/app-components/edit-dialog";
import { toast } from "sonner";

export const columns = [
  {
    id: "ID",
    accessorKey: "id",
    header: ({ table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (table.options.meta?.sort !== "asc") {
              table.options.meta?.setSort("asc");
            } else {
              table.options.meta?.setSort("desc");
            }
          }}
        >
          <span className="font-bold text-light1">ID</span>
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "Email",
    accessorKey: "email",
    header: () => {
      return <p className="font-bold text-light1">Email</p>;
    },
  },
  {
    id: "Phone Number",
    accessorKey: "phoneNumber",
    header: () => {
      return <p className="font-bold text-light1">Phone Number</p>;
    },
  },
  {
    id: "Avatar",
    accessorKey: "avatar",
    header: () => {
      return <p className="font-bold text-light1">Avatar</p>;
    },
    cell: ({ row }) => {
      const user = row.original;
      const url = user.avatar;
      return (
        <Avatar>
          <AvatarImage src={url} alt="avatar" />
          <AvatarFallback className="text-light1 bg-light5">
            {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    id: "First Name",
    accessorKey: "firstName",
    header: ({ table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (table.options.meta?.sort !== "fn-asc") {
              table.options.meta?.setSort("fn-asc");
            } else {
              table.options.meta?.setSort("fn-desc");
            }
          }}
        >
          <span className="font-bold text-light1">First Name</span>
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "Last Name",
    accessorKey: "lastName",
    header: ({ table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (table.options.meta?.sort !== "ln-asc") {
              table.options.meta?.setSort("ln-asc");
            } else {
              table.options.meta?.setSort("ln-desc");
            }
          }}
        >
          <span className="font-bold text-light1">Last Name</span>
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "Role",
    accessorKey: "role",
    header: ({ table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            if (table.options.meta?.sort !== "r-asc") {
              table.options.meta?.setSort("r-asc");
            } else {
              table.options.meta?.setSort("r-desc");
            }
          }}
        >
          <span className="font-bold text-light1">Role</span>
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex flex-col items-start text-sm p-4 gap-4">
              <EditDialog
                fetchData={table.options.meta?.fetchData}
                user={user}
              />
              <DeleteDialog
                fetchData={table.options.meta?.fetchData}
                user={user}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
