import { z } from "zod";
import { ResType, UserType } from "@/lib/utils/types";

export default function listUserValidator(formData: any, userType: UserType): ResType {
  
  // constraints
  const zUser = z.object({
    indexNumber: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    status: z.string().optional(),
    page: z.string(),  // required string
    limit: z.string(), // required string
  });

  // parse 
  const parsed = zUser.safeParse(formData);
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }
  
  return { status: true, resDataType: "data", data: parsed.data}
  
}
