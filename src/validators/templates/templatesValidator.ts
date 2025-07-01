import { z, ZodNumber } from "zod";
import { ResType } from "@/lib/utils/types";

export default function templatesValidator(searchParams: URLSearchParams): ResType {
  
  // constraints
  const zsearchParams = z.object({
    templateType: z.string().optional(),
    title: z.string().optional(),
    page: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)),
    limit: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1))
  })
  .strict()
  
  // parse 
  const parsed = zsearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }

  return { status: true, resDataType: "data", data: parsed.data}
  
}
