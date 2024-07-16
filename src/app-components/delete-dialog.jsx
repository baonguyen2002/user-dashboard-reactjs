import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";
DeleteDialog.propTypes = {
  user: PropTypes.object.isRequired,
};
export default function DeleteDialog({ fetchData, user }) {
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    axios
      .delete(
        `https://668a57e42c68eaf3211c8931.mockapi.io/api/user/user/${user.id}`
      )
      .then(() => {
        toast.success(`User deleted successfully`);
        fetchData();
        setOpen(false);
      })
      .catch((err) => {
        console.error("Error deleting user", err);
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <>
          <Button variant="destructive" className="md:hidden">
            Delete
          </Button>
          <p className="hidden md:inline">Delete</p>
        </>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Delete User</DialogTitle>

          <DialogDescription>
            Are you sure? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={user.firstName + " " + user.lastName}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Role
            </Label>
            <Input
              id="username"
              defaultValue={
                user.role === "admin"
                  ? "Admin"
                  : user.role === "editor"
                  ? "Editor"
                  : "User"
              }
              className="col-span-3 text-black"
              disabled
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex flex-row justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
