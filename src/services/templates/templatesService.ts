import { ResType } from '@/lib/utils/types';
import { prisma } from "@/lib/prisma";

export default async function templatesService(data: any): Promise<ResType> {
  
  let whereTemplates: any = {
    templateType: data.templateType,
    title: data.title ? { contains: data.title, mode: "insensitive" } : undefined,
  };
  
  let selectTemplates: any = {
    templateType: true,
    templateCode: true,
    title: true,
    description: true,
  }
  
  // Templates
  const templates = await prisma.template.findMany({
    where: whereTemplates,
    select: selectTemplates,
    skip: (data.page - 1) * data.limit,
    take: data.limit,
  })
  
  // template types
  let templateTypes = await prisma.template.findMany({
    select: { templateType: true },
    distinct: ["templateType"],
  })

  templateTypes = templateTypes.map((item: any) => item.templateType);
  
  // Total
  const total = await prisma.template.count({
    where: whereTemplates,
  })
  
  return { status: true, resDataType: "success", data: { templates, templateTypes, total } };
  
}
