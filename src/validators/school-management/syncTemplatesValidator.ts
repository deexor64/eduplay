import { z } from "zod";
import { ResType } from "@/lib/utils/types";

export default function syncTemplatesValidator(searchParams: any): ResType {
  
  // constraints
  const zsearchParams = z.object({
    userType: z.string(),
  })
  .strict()
  
  // parse 
  const parsed = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }

  return { status: true, resDataType: "data", data: parsed.data}
  
}
