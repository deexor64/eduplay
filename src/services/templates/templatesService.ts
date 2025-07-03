import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';

const prisma = new PrismaClient();

export default async function templatesService(data: any): Promise<ResType> {
  
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
    templates: await prisma.template.findMany({
      where: whereClause,
      select: selectClause,
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    }),
    total: await prisma.template.count({
      where: whereClause,
    })
  }
  
  return { status: true, resDataType: "success", data: existing };
  
}
