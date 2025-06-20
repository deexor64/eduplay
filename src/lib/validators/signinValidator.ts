import { z } from "zod";
import { ResType, UserType } from "@/lib/utils/types";

export default function signinValidator(body: any): ResType {
  
  const userType: UserType = body.userType;
  const formData = body.formData;
  
  // constraints
  let zUser = z.object({
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }).strict();

  // parse 
  const parsed = zUser.safeParse(formData);
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }
  
  return { status: true, resDataType: "data", data: parsed.data}
  
}
