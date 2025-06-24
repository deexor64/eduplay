import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import templateListValidator from '@/lib/validators/school-management/templateListValidator';

const prisma = new PrismaClient();

export default async function templateListService(searchParams: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await templateListValidator(searchParams);
  if (!valid.status) return valid;
  
  // query
  const data = valid.data;
  
  let whereClause: any = { // undefined values are ignored in where clause
    templateType: data.templateType,
    title: data.title ? {
      contains: data.title,
    } : undefined,
  };
  
  let selectClause: any = {
    templateType: true,
    templateCode: true,
    title: true,
    description: true,
  }
  
  const existing = {
    templates: await prisma.templates.findMany({
      where: whereClause,
      select: selectClause,
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    }),
    total: await prisma.templates.count({
      where: whereClause,
    })
  }
  
  return { status: true, resDataType: "success", data: JSON.stringify(existing) };
  
}
