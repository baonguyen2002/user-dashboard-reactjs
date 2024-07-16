import * as Zod from "zod";
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//const phoneRegExp = /^(\+?\d{1,2}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const FormSchema = Zod.object({
  firstName: Zod.string().min(1, "First name is required"),
  lastName: Zod.string().min(1, "Last name is required"),
  email: Zod.string()
    .regex(emailRegex, "Invalid email address")
    .min(1, "Email is required"),
  phoneNumber: Zod.string()
    .regex(phoneRegExp, "Phone number is not valid")
    .min(1, "Phone number is required"),
  role: Zod.string().min(1, "Role is required"),
  file: Zod.any()
    .refine((file) => {
      // Check if file is provided
      if (file) {
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      }
      return true; // Allow the field to be empty
    }, "Invalid file. Choose either JPEG, PNG, or GIF image")
    .refine((file) => {
      // Check file size only if file is provided
      if (file) {
        return file.size <= MAX_FILE_SIZE;
      }
      return true; // Allow the field to be empty
    }, "Max file size allowed is 2MB."),
  //.or(Zod.undefined()),
  password: Zod.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must contain at least one special character"
    )
    .regex(
      /^(?!.*[/\\]).*$/,
      "Password must not contain forward or backward slashes"
    ),
  confirmPassword: Zod.string().min(1, "Please confirm your password"),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "passwordConfirmation",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});

export default FormSchema;
