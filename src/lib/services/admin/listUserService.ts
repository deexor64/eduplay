import { PrismaClient } from "@prisma/client";
import { ResType, UserType } from '@/lib/utils/types';
import { generatePasswordHash } from '@/lib/utils/generatePasswordHash';
import listUserValidator from '@/lib/validators/admin/listUserValidator';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function listUserService(formData: any, userType: UserType): Promise<ResType> {
  
  // schema valdiation
  const valid = await listUserValidator(formData, userType);
  
  if (!valid.status) return valid;
  
  // uniqueness check
  formData = valid.data;
  
  const pagination = {
    page: formData.page,
    limit: formData.limit
  };
  const filters = {
    ...formData
  }
  delete filters.page;
  delete filters.limit;
  
  
  let existing = await prisma.admin.findMany({ 
    where: {
      email: formData.email,
    },
    include: {
      user: true,
    },
  });
  
  return { status: true, resDataType: "success", data: "List user success" };
  
}
