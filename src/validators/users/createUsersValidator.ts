import { z } from "zod";
import { ResType, UserType } from "@/lib/utils/types";

export default function createUsersValidator(searchParams:any, formData: any): ResType {
  
  // constraints
  let zSearchParams = z.object({
    userType: z.enum(["ADMIN", "TEACHER", "PARENT", "STUDENT"]),
  });
  
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
    if (searchParams.userType === "PARENT") return true;
    if (data.dateOfBirth === undefined) return false;
    if (data.indexNumber === undefined) return false;
    return true;
  });
  
  // parse 
  const parsed = zFormData.safeParse(formData);
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }
  
  const parsed_s = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  
  if (!parsed_s.success) {
    return { status: false, resDataType: "log", data: parsed_s.error.message }
  }
  
  return { status: true, resDataType: "data", data: {...parsed_s.data, ...parsed.data}}
  
}
