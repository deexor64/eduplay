import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import viewActivityValidator from '@/validators/school-management/viewActivityValidator';
import { generateUniqueID } from "@/lib/utils/generateRandomString";
import { log } from "node:console";

// dynamic user handler
function getUserHandler(viewMode: any) { 
  const map: any = {
    SAMPLE: prisma.template,
    VIEW: prisma.activity,
  } as const;

  return map[viewMode];
}

const prisma = new PrismaClient();

export default async function viewActivityService(searchParams: any)
: Promise<ResType> {
  
  // schema valdiation
  const valid = await viewActivityValidator(searchParams);
  if (!valid.status) return valid;
  
  // query
  const data = valid.data;
  
  let whereClause: any = { // undefined values are ignored in where clause
    templateCode: data.ViewMode === "VIEW" ? undefined : data.templateCode,
  };
  
  let selectClause: any = {
    sampleActivity: true,
  }
  
  const existing = await getUserHandler(data.viewMode).findUnique({
    where: whereClause,
    select: selectClause,
  })
  
  return { status: true, resDataType: "success", data: existing };
  
}
