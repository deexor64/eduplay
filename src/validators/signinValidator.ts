import { z } from "zod";
import { ResType, UserType } from "@/lib/utils/types";

export default function signinValidator(searchParams:any, formData: any): ResType {
  
  // constraints
  let zFormData = z.object({
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }).strict();

  // parse 
  const parsed = zFormData.safeParse(formData);
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }
  
  return { status: true, resDataType: "data", data: parsed.data}
  
}
