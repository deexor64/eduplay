import { z } from "zod";
import { ResType } from "@/lib/utils/types";

export default function teacherValidator(body: any): ResType {
  
  return {
    status: true, resDataType: "data", data: {
      ...body,
      indexNumber: Number(body.indexNumber), // Zod expects number
    }
  }
  
  // // check if data aligns with constraints
  // const zObj = z.object({
  //   fullName: z.string().min(1, "Full name is required"),
  //   firstName: z.string().min(1, "First name is required"),
  //   lastName: z.string().min(1, "Last name is required"),
  //   indexNumber: z.number().int().positive("Index must be positive"),
  //   email: z.string().email("Invalid email address"),
  //   phoneNumber: z
  //     .string()
  //     .min(10, "Phone number must be at least 10 digits")
  //     .max(15, "Phone number must be at most 15 digits")
  //     .regex(/^[0-9+]+$/, "Phone number must contain only digits and '+'"),
  //   dateOfBirth: z
  //     .string(),
  //     // .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  //   password: z.string().min(10, "Password must be at least 10 characters"),
  // });

  // const parsed = zObj.safeParse({
  //   ...body,
  //   indexNumber: Number(body.indexNumber), // Zod expects number
  // });
  
  // if (!parsed.success) {
  //   return { status: false, resDataType: "error", data: "Invalid data recieved"}
  // }
  
  // return { status: true, resDataType: "data", data: parsed.data}
  
}
