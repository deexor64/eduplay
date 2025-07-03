import { z } from "zod";
import { ResType, UserType } from "@/lib/utils/types";

export default function signinValidator(searchParams: URLSearchParams, formData: any): 
{ status: boolean, data: any } {
  
  // A user can be signed in without a token
  // A token is created at signin
  
  // constraints
  const zsearchParams = z.object({
    userType: z.enum(["ADMIN", "STUDENT", "TEACHER", "PARENT"]),
  })
  .strict();
  
  const parsed_s = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message };
  
  let zFormData = z.object({
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }).strict();

  const parsed_f = zFormData.safeParse(formData);
  
  if (!parsed_f.success) {
    return { status: false, data: parsed_f.error.message }
  }
  
  return { status: true, data: {...parsed_s.data, ...parsed_f.data}}
  
}
