import { z, ZodNumber } from "zod";
import { ResType } from "@/lib/utils/types";

export default function sampleValidator(searchParams: any): ResType {
  
  // constraints
  const zSearchParams = z.object({
    templateCode: z.string(),
  })
  .strict();
  
  // parse 
  const parsed = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }

  return { status: true, resDataType: "data", data: parsed.data}
  
}
