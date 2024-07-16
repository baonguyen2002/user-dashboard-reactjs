import DeleteDialog from "@/app-components/delete-dialog";
import EditDialog from "@/app-components/edit-dialog";
import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

export const columnsMobile = [
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
    id: "view",
    cell: ({ row, table }) => {
      const user = row.original;

      return (
        <EditDialog fetchData={table.options.meta?.fetchData} user={user} />
      );
    },
  },
  {
    id: "delete",
    cell: ({ row, table }) => {
      const user = row.original;

      return (
        <DeleteDialog fetchData={table.options.meta?.fetchData} user={user} />
      );
    },
  },
];
