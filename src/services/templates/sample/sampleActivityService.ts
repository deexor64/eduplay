import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

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
