import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';
import { UserType } from '@prisma/client';

export default async function registerService(data: any): Promise<ResType> {
  
  const userRegisterType = data.userRegisterType;
  const users = data.users;

  let registerSummery = "";

  // Check for existing teachers
  if (userRegisterType === UserType.TEACHER) {
    for (const record of users) {
      
      const existingTeacher = await prisma.teacher.findFirst({
        where: {
          OR: [
            { indexNumber: record.indexNumber },
            { email: record.email },
          ],
        },
      });
      
      if (existingTeacher) registerSummery += `Teacher already exists: ${existingTeacher.indexNumber === record.indexNumber && existingTeacher.indexNumber} ${existingTeacher.email === record.email && existingTeacher.email }\n`;

    }
        
  }
  
  // Check for existing students
  if (userRegisterType === UserType.STUDENT) {
    for (const record of users) {
      
      const existingStudent = await prisma.student.findUnique({
        where: { indexNumber: record.indexNumber },
      });
      
      if (existingStudent) registerSummery += `Student already exists: ${existingStudent.indexNumber === record.indexNumber && existingStudent.indexNumber} \n`;
      
    }
        
  }
  
  // Send existing record list
  if (registerSummery.length > 0) return { status: false, resDataType: "error", data: registerSummery };
  
  // Create users
  for (const record of users) {
  
    const user = await prisma.user.create({
      data: {
        firstName: record.firstName,
        lastName: record.lastName,
        password: record.password,
        status: "ACTIVE",
      },
    });

    let createdEntity: any = null;

    if (userRegisterType === UserType.TEACHER) {
      createdEntity = await prisma.teacher.create({
        data: {
          indexNumber: record.indexNumber,
          email: record.email,
          role: record.role,
          user: { connect: { userID: user.userID } },
        },
      });
    } else if (userRegisterType === UserType.STUDENT) {
      
      // Check exisiting parent records
      let parent = await prisma.parent.findUnique({
        where: { email: record.parentEmail },
      });
      
      // Create new parent if not exists
      if (!parent) {
        const parentUser = await prisma.user.create({
          data: {
            firstName: record.parentFirstName,
            lastName: record.parentLastName,
            password: record.parentPassword,
          },
        });
        parent = await prisma.parent.create({
          data: {
            email: record.parentEmail,
            user: { connect: { userID: parentUser.userID } },
          },
        });
      }

      createdEntity = await prisma.student.create({
        data: {
          indexNumber: record.indexNumber,
          email: record.email,
          grade: record.grade,
          class: record.class,
          user: { connect: { userID: user.userID } },
          parent: { connect: { parentID: parent.parentID } },
        },
      });
    }
    else if (userRegisterType === UserType.PARENT) {
      createdEntity = await prisma.parent.create({
        data: {
          email: record.email,
          user: { connect: { userID: user.userID } },
        },
      });
    }
    
    registerSummery += `${userRegisterType === "STUDENT" ? "Student" : "Teacher"} created: ${record.firstName} | ${record.lastName} | ${record.email} | ${record.indexNumber}\n`;
    
  }

  return { status: true, resDataType: "success", data: registerSummery };

}
