import { z, ZodNumber } from "zod";
import { ResType } from "@/lib/utils/types";

export default function createActivityValidator(searchParams: any, formData: any): ResType {
  
  // constraints
  const zFormData = z.object({
    templateCode: z.string(),
    title: z.string(),
    coverImageUrl: z.string(),
    description: z.string(),
    activityData: z.string(),
    options: z.string().transform((val) => JSON.parse(val))
      .pipe(z.object({
        timeLimit: z.number().min(0),
        isGraded: z.boolean(),
      }))
  }).strict()
  
  const zSearchParams = z.object({
    userType: z.enum(["TEACHER"]),
  }).strict();
  
  // parse 
  const parsed = zFormData.safeParse(formData);
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }
  
  const parsed_s = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  
  if (!parsed_s.success) {
    return { status: false, resDataType: "log", data: parsed_s.error.message }
  }

  return { status: true, resDataType: "data", data: parsed.data}
  
}
