import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import classListValidator from '@/validators/school-management/classListValidator';

const prisma = new PrismaClient();

export default async function classListService(searchParams: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await classListValidator(searchParams);
  if (!valid.status) return valid;
  
  // query
  const data = valid.data;
  
  let whereClause: any = { // undefined values are ignored in where clause
    grade: data.grade,
    classLetter: data.classLetter,
    teacher: {
      user: {
        fullName: data.teacherName,
      }
    }
  };
  
  let selectClause: any = {
    name: true,
    grade: true,
    classLetter: true,
    teacher: {
      select: {
        user: {
          select: {
            fullName: true,
          }
        }
      }
    }
  }
  
  const existing = {
    classes: await prisma.class.findMany({
      where: whereClause,
      select: selectClause,
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    }),
    total: await prisma.class.count({
      where: whereClause,
    })
  }
  
  return { status: true, resDataType: "success", data: JSON.stringify(existing) };
  
}
