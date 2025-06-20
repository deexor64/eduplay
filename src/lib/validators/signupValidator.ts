import { z } from "zod";
import { ResType, UserType } from "@/lib/utils/types";

export default function signupValidator(body: any): ResType {
  
  const userType: UserType = body.userType;
  const formData = body.formData;
  
  // constraints
  let zUser = z.object({
    fullName: z.string().min(1, "Full name is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits")
      .regex(/^[0-9+]+$/, "Phone number must contain only digits and '+'"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }).strict();

  if (userType === "ADMIN" || userType === "TEACHER" || userType === "STUDENT") {
    
    zUser = zUser.extend({
      dateOfBirth: z.preprocess(
        (val) => (typeof val === "string" ? new Date(val) : val),
        z.date()
      ),
      indexNumber: z.string().min(1, "Index number is required"),
    }).strict();
    
  }
  
  // parse 
  const parsed = zUser.safeParse(formData);
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }
  
  return { status: true, resDataType: "data", data: parsed.data}
  
}
