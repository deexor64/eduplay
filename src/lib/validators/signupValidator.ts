import { z } from "zod";
import { ResType, UserType } from "@/lib/utils/types";

export default function signupValidator(body: any): ResType {
  
  const userType: UserType = body.userType;
  const formData = body.formData;
  
  // check data with schema
  let parsed: any = null;
  
  if (userType === "PARENT") {
    
    const zObj = z.object({
      userType: z.string(),
      fullName: z.string().min(1, "Full name is required"),
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      indexNumber: z.string().optional(),
      email: z.string().email("Invalid email address"),
      phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .regex(/^[0-9+]+$/, "Phone number must contain only digits and '+'"),
      dateOfBirth: z.string(),
        // .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
      password: z.string().min(10, "Password must be at least 10 characters"),
    });
    
    parsed = zObj.safeParse(formData);
    
  } else {
    
    const zObj = z.object({
      userType: z.string(),
      fullName: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      indexNumber: z.string(),
      email: z.string().email("Invalid email address"),
      phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .regex(/^[0-9+]+$/, "Phone number must contain only digits and '+'"),
      dateOfBirth: z.string(),
      // .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
      password: z.string().min(10, "Password must be at least 10 characters"),
    });
  
    parsed = zObj.safeParse(formData);
    
  }
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: "Invalid data recieved: " 
      + parsed.error.message}
  }
  
  return { status: true, resDataType: "data", data: parsed.data}
  
}
