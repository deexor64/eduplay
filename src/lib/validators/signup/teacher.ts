import { z } from "zod";
import { ResType } from "@/utils/types";

export default function teacherValidator(body: any): ResType {
  
  // check if data aligns with constraints
  const zObj = z.object({
    indexNumber: z.number().int().positive("Index must be positive"),
    fullName: z.string().min(1, "Full name is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(10, "Password must be at least 10 characters"),
  });
  
  const parsed = zObj.safeParse({
    ...body,
    indexNumber: Number(body.indexNumber), // Zod expects number
  });
  
  if (!parsed.success) {
    return { status: false, resDataType: "error", data: "Invalid data recieved"}
  }
  
  return { status: true, resDataType: "data", data: parsed.data}
  
}
