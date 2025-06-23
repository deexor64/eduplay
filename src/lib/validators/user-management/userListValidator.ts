import { z, ZodNumber } from "zod";
import { ResType } from "@/lib/utils/types";

export default function userListValidator(searchParams: any): ResType {
  
  // constraints
  const zsearchParams = z.object({
    userListType: z.enum(["admin", "teacher", "student", "parent"]),
    indexNumber: z.string().optional(),
    fullName: z.string().optional(),
    grade: z.string().optional(),
    email: z.string().optional(),
    status: z.string().optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  });
  
  // parse 
  const parsed = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }
  
  return { status: true, resDataType: "data", data: parsed.data}
  
}
