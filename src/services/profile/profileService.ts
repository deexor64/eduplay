import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';

export default async function profileService(data: any): Promise<ResType> {
  
  const student = await prisma.user.findUnique({
    where: { 
      userID: data.userID,
    },
    select: {
      firstName: true,
      lastName: true,
      phoneNumber: true,
      dateOfBirth: true,
      displayPicUrl: true,
      student: {
        select: {
          email: true,
          grade: true,
          class: true,
          indexNumber: true,
        }
      }
    }
  });

  return { status: true, resDataType: "success", data: student };

}
