import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToBase64 from "@/ToBase64";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormSchema from "@/FormSchema";

const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "editor",
    label: "Editor",
  },
  {
    value: "user",
    label: "User",
  },
];
const roleList = ["admin", "editor"];
export default function EditDialog({ fetchData, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });
  useEffect(() => {
    form.setValue("firstName", user.firstName, { shouldValidate: true });
    form.setValue("lastName", user.lastName, { shouldValidate: true });
    form.setValue("email", user.email, { shouldValidate: true });
    form.setValue("phoneNumber", user.phoneNumber, { shouldValidate: true });
    form.setValue("password", user.password, { shouldValidate: true });
    form.setValue("confirmPassword", user.password, { shouldValidate: true });
    form.setValue("role", roleList.includes(user.role) ? user.role : "user", {
      shouldValidate: true,
    });
  }, [open]);
  const onSubmit = async (formData) => {
    setIsLoading(true);
    let result;
    let trimmedResult;
    try {
      result = await ToBase64(formData.file);
      if (formData.file.type === "image/jpeg") {
        trimmedResult = result.slice(23);
      } else {
        trimmedResult = result.slice(22);
      }
      axios
        .post(
          "https://api.imgbb.com/1/upload?expiration=600&key=d60cf21ba96fdbcd51e5a6a53f68c0fd",
          { image: trimmedResult },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          updateUser(formData, res.data.data.url);
        })
        .catch((err) => {
          console.error(err);
        });
      return result;
    } catch (error) {
      updateUser(formData, null);
      return;
    }
  };
  const updateUser = (formData, avatar) => {
    axios
      .put(
        `https://668a57e42c68eaf3211c8931.mockapi.io/api/user/user/${user.id}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          email: formData.email,
          password: formData.password,
          ...(avatar ? { avatar: avatar } : {}),
        },
        { headers: "Content-Type: application/json" }
      )
      .then(() => {
        toast.success("User updated successfully");
        form.reset();
        setIsLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("Error updating user");
      })
      .finally(() => {
        //form.reset();
        fetchData();
      });
  };
  const handleOpenChange = (event) => {
    if (!event) {
      form.reset();
    }
    setOpen(event);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(event) => {
        handleOpenChange(event);
      }}
    >
      <DialogTrigger>
        <Button className="bg-light1 text-light5 hover:text-light2 md:hidden">
          View & Edit
        </Button>
        <p className="hidden md:inline">View & Edit</p>
      </DialogTrigger>
      <DialogContent className=" bg-light2 text-light4 max-h-screen mt-4 overflow-y-scroll ">
        <DialogHeader>
          <DialogTitle>Edit User Info</DialogTitle>
          <DialogDescription>Edit this user&apos;s info</DialogDescription>
        </DialogHeader>

        <Form {...form} noValidate>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            //ref={form}
            className="mb-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name<sup>*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name<sup>*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email<sup>*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number<sup>*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.firstName[0].toUpperCase() +
                    user.lastName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-4">
                    Role<sup>*</sup>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password<sup>*</sup>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password<sup>*</sup>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-center gap-4">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  handleOpenChange(false);
                }}
                className="bg-light2 text-light4"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-light5 text-light1">
                Edit
              </Button>
            </div>
          </form>
        </Form>

        {isLoading && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
            <Spinner />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
