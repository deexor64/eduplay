import { z, ZodNumber } from "zod";
import { ResType } from "@/lib/utils/types";

export default function viewActivityValidator(searchParams: any): ResType {
  
  // constraints
  const zSearchParams = z.object({
    userType: z.enum(["ADMIN", "TEACHER", "STUDENT"]),
    viewMode: z.enum(["VIEW", "SAMPLE"]),
    templateCode: z.string(),
  })
  .strict()
  .refine((val) => {
    return ((val.userType === "TEACHER" || val.userType === "ADMIN")
      && (val.viewMode !== "SAMPLE")) ? false : true;
  }, 
  {
    message: "Only Sample mode is supported for Admin",
    path: ["viewMode"]
  })
  .refine((val) => {
    return (val.userType === "STUDENT" && val.viewMode !== "VIEW") ? false : true;
  }, 
  {
    message: "Only View mode is supported for Student",
    path: ["viewMode"]
  });
  
  // parse 
  const parsed = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  
  if (!parsed.success) {
    return { status: false, resDataType: "log", data: parsed.error.message }
  }

  return { status: true, resDataType: "data", data: parsed.data}
  
}
