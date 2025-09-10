import { z } from "zod";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import userTokenChecker from "@/lib/utils/userTokenChecker";
import { JwtPayload } from "jsonwebtoken";
import { StudentClass, TeacherRole, UserType } from "@prisma/client";

export default function registerValidator(cookies: RequestCookies, formData: any, searchParams: URLSearchParams): 
{ status: boolean, data: any } {
  
  // User token validation
  const userToken = cookies.get("userInfo")?.value;
  const valid = userTokenChecker(userToken, ["TEACHER"], 
    ["ADMIN"]);
  if (!valid.status) return valid;

  const jwtPayload = valid.data as JwtPayload;
  
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
    password: z.string().min(6, "Password must be at least 6 characters"),
    indexNumber: z.string().min(1, "Index number is required"),
    role: z.string().transform((val) => val.toUpperCase()).pipe(z.nativeEnum(TeacherRole)).optional(),
    grade: z.number().min(1).max(5).optional(),
    class: z.nativeEnum(StudentClass).optional(),
    parentFirstName: z.string().optional(),
    parentLastName: z.string().optional(),
    parentEmail: z.string().email().optional(),
    parentPassword: z.string().optional(),
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
    }

    if (userRegisterType === UserType.STUDENT) {
      if (!data.grade) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Grade is required for students",
          path: ["grade"],
        });
        return;
      }
      if (!data.class) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Class is required for students",
          path: ["class"],
        });
        return;
      }
      if (!data.parentFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parent first name is required for students",
          path: ["parentFirstName"],
        });
        return;
      }
      if (!data.parentLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parent last name is required for students",
          path: ["parentLastName"],
        });
        return;
      }
      if (!data.parentEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parent email is required for students",
          path: ["parentEmail"],
        });
        return;
      }
      if (!data.parentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parent password is required for students",
          path: ["parentPassword"],
        });
        return;
      }
    }
    
  });
  
  const zFormData = z.array(SignupRecordSchema);
  
  const parsed_f = zFormData.safeParse(formData);
  if (!parsed_f.success) return { status: false, data: parsed_f.error.errors[0].message };

  return { status: true, data: {...parsed_s.data, users: parsed_f.data} };

}
