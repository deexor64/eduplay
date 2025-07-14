import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';

const prisma = new PrismaClient();

export default async function sampleActivityService(data: any): Promise<ResType> {
  
  const existing = await prisma.template.findUnique({
    where: {
      templateCode: data.templateCode,
    },
    select: {
      sampleActivity: true,
    },
  })
  
  return { status: true, resDataType: "success", data: existing };
  
}
