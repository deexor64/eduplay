import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import sampleValidator from '@/validators/activities/sample/sampleValidator';
import { generateUniqueID } from "@/lib/utils/generateRandomString";

const prisma = new PrismaClient();

export default async function sampleService(searchParams: any): Promise<ResType> {
  
  // schema valdiation
  const valid = await sampleValidator(searchParams);
  if (!valid.status) return valid;
  
  // query
  const data = valid.data;
  
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
