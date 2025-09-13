import { z } from "zod";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";
import { TeacherRole, UserType } from "@prisma/client";

export default function registerValidator(cookies: RequestCookies, formData: any, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  
  // User token validation
  // const userToken = cookies.get("userInfo")?.value;
  // const valid = userTokenChecker(userToken, ["TEACHER"], 
  //   ["ADMIN"]);
  // if (!valid.status) return valid;

  // const jwtPayload = valid.data as JwtPayload;
  
  const zSearchParams = z.object({
    userRegisterType: z.nativeEnum(UserType), // excluded parents
  })
  .strict();
  
  const parsed_s = zSearchParams.safeParse(Object.fromEntries(searchParams.entries()));
  if (!parsed_s.success) return { status: false, data: parsed_s.error.message }

  // constraints
  const SignupRecordSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters").max(255, "Password must be at most 255 characters"),
    indexNumber: z.string().min(1, "Index number is required"),
    role: z.string().transform((val) => val.toUpperCase()).pipe(z.nativeEnum(TeacherRole)).optional(),
    grade: z.string().transform((val) => parseInt(val)).pipe(z.number().min(1).max(5)).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    
    const userRegisterType = searchParams.get("userRegisterType");
    
    if (userRegisterType === UserType.TEACHER && !data.role) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Role is required for teachers",
        path: ["role"],
      });
      return;
    } else if (userRegisterType === UserType.STUDENT && !data.grade) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Grade is required for students",
        path: ["grade"],
      });
      return; 
    }
    
  });
  
  const zFormData = z.array(SignupRecordSchema);
  
  const parsed_f = zFormData.safeParse(formData);
  if (!parsed_f.success) return { status: false, data: parsed_f.error.errors[0].message };

  return { status: true, data: {...parsed_s.data, users: parsed_f.data} };

}
