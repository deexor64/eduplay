import { z, ZodNumber } from "zod";
import { ResType } from "@/lib/utils/types";

export default function classesValidator(searchParams: URLSearchParams): ResType {
  
  // constraints
  const zsearchParams = z.object({
    grade: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1)).optional(),
    classLetter: z.string().optional(),
    teacherName: z.string().optional(),
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
