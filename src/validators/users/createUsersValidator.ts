import { z } from "zod";
import { ResType, UserPermission, UserType } from "@/lib/utils/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenValidator from "../shared/userTokenValidator";

export default function createUsersValidator(searchParams:URLSearchParams, formData: any):
{ status: boolean, data: any } {
  
  // A user can be created without a token
  // A token may or may not exist when creating the user
  
  // constraints
  let zSearchParams = z.object({
    userType: z.enum(["ADMIN", "TEACHER", "PARENT", "STUDENT"]),
  });
  
  const parsed_s = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }
  
  let zFormData = z.object({
    fullName: z.string().min(1, "Full name is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.string().transform((val) => new Date(val))
      .pipe(z.date()
        .min(new Date(1900, 0, 1), "Date of birth must be after 1900-01-01")
        .max(new Date(Date.now()), "Date of birth must be before today")
      ).optional(),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits")
      .regex(/^[0-9+]+$/, "Phone number must contain only digits and '+'"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    indexNumber: z.string().optional(),
  }).refine((data) => {
    if (parsed_s.data.userType === "PARENT") return true;
    if (data.dateOfBirth === undefined) return false;
    if (data.indexNumber === undefined) return false;
    return true;
  });
  
  const parsed_f = zFormData.safeParse(formData);
  if (!parsed_f.success) return { status: false, data: parsed_f.error.message }
  
  return { status: true, data: {...parsed_s.data, ...parsed_f.data}}
  
}
