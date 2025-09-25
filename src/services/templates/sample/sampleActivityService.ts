import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function sampleActivityService(data: any): 
Promise<{ status: boolean, data: any }> {
  
  const existing = await prisma.template.findUnique({
    where: {
      templateCode: data.templateCode,
    },
    select: {
      sampleActivity: true,
    },
  })
  
  return { status: true, data: existing };
  
}
