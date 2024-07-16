import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormSchema from "@/FormSchema";
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
import ToBase64 from "../ToBase64";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

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

export default function AddDialog({ fetchData }) {
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
          createUser(formData, res.data.data.url);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          toast.error("Error uploading image");
        });
      return result;
    } catch (error) {
      createUser(formData, null);
      return;
    }
  };
  const createUser = (formData, avatar) => {
    axios
      .post(
        "https://668a57e42c68eaf3211c8931.mockapi.io/api/user/user",
        {
          firstName: formData.firstName,
          password: formData.password,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
          email: formData.email,
          ...(avatar ? { avatar: avatar } : {}),
        },
        { headers: "Content-Type: application/json" }
      )
      .then(() => {
        toast.success("User added successfully");
        form.reset();
        setIsLoading(false);
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("Error adding user");
      })
      .finally(() => {
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
    <div>
      <Dialog
        open={open}
        onOpenChange={(event) => {
          handleOpenChange(event);
        }}
      >
        <DialogTrigger>
          <Button className="bg-light1 text-light5 hover:text-light2">
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen mt-4 overflow-y-scroll bg-light2 text-light4">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>Add a new user</DialogDescription>
          </DialogHeader>
          <Form {...form}>
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
                      <Input
                        {...field}
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                      />
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
                      <Input
                        {...field}
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                      />
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
                      <Input
                        {...field}
                        name="email"
                        placeholder="Email"
                        type="email"
                      />
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
                      <Input
                        {...field}
                        name="phoneNumber"
                        placeholder="Phone Number"
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        name="file"
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
                    <Select onValueChange={field.onChange} name="role">
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
                      <PasswordInput
                        {...field}
                        name="password"
                        placeholder="Password"
                      />
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
                      <PasswordInput
                        {...field}
                        name="confirmPassword"
                        placeholder="Password"
                      />
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
                  Add
                </Button>
              </div>
            </form>
          </Form>

          {isLoading && (
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-[100vh] bg-gray-800 bg-opacity-50">
              <Spinner />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
