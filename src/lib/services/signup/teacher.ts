import { PrismaClient } from '@prisma/client';
import { ResType } from '@/utils/types';
import { generatePasswordHash } from '@/utils/generatePasswordHash';
import teacherValidator from '@/lib/validators/signup/teacher';

const prisma = new PrismaClient();

export default async function teacherService(body: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await teacherValidator(body);
  
  if (!valid.status) return valid;
  
  // uniqueness check
  const data = valid.data;
  
  const existing = await prisma.teacher.findUnique({
    where: { indexNumber: data.indexNumber },
  });
  
  if (existing) return { status: false, resDataType: "warning", data: "Index number already exists" };
  
  // finalize and query data
  const hashedPassword = await generatePasswordHash(data.password);
  
  const newTeacher = await prisma.teacher.create({
    data: {
      ...data,
      password: hashedPassword
    },
  });
  
  return { status: true, resDataType: "success", data: "Signup successfull" };
  
}
