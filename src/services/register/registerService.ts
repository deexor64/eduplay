import { adminAuth } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';
import { ResType } from '@/lib/utils/types';
import { TeacherRole, UserStatus, UserType } from '@prisma/client';

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
            { user: { email: record.email } },
          ],
        },
        include: { user: true },
      });
  
      if (existingTeacher) {
        registerSummery += `Teacher already exists: ${
          existingTeacher.indexNumber === record.indexNumber ? ("Index: " + existingTeacher.indexNumber) : ""
        } ${
          existingTeacher.user.email === record.email ? ("Email: " + existingTeacher.user.email) : ""
        }\n`;
      }
    }
  }
  
  // Check for existing students
  if (userRegisterType === UserType.STUDENT) {
    for (const record of users) {
      const existingStudent = await prisma.student.findFirst({
        where: {
          OR: [
            { indexNumber: record.indexNumber },
            { user: { email: record.email } },
          ],
        },
        include: { user: true },
      });
  
      if (existingStudent) {
        registerSummery += `Student already exists: ${
          existingStudent.indexNumber === record.indexNumber ? ("Index: " + existingStudent.indexNumber) : ""
        } ${
          existingStudent.user.email === record.email ? ("Email: " + existingStudent.user.email) : ""
        }\n`;
      }
    }
  }
  
  // Send existing record list
  if (registerSummery.length > 0) return { status: false, resDataType: "error", data: registerSummery };
  
  // Create users
  registerSummery = "";
  
  if (userRegisterType === UserType.TEACHER) {
      
    for (const record of users) {
      
      // Firebase record
      const firebaseUser = await adminAuth.createUser({
        email: record.email,
        password: record.password,
        displayName: `${record.firstName} ${record.lastName}`,
      });
  
      await adminAuth.setCustomUserClaims(firebaseUser.uid, {
        userType: UserType.TEACHER,
        role: record.role as TeacherRole,
        status: UserStatus.ACTIVE,
      });
      
      // DB record
      const teacher = await prisma.user.create({
        data: {
          userID: firebaseUser.uid,
          firstName: record.firstName,
          lastName: record.lastName,
          email: record.email,
          teacher: {
            create: {
              indexNumber: record.indexNumber,
              role: record.role,
            },
          },
        },
        include: {
          teacher: true,
        },
      });
      
      registerSummery += `Teacher: ${record.firstName} ${record.lastName} | Email: ${record.email} | Index: ${record.indexNumber} | Password: ${record.password}\n`;
      
    }
    
  } else if (userRegisterType === UserType.STUDENT) {
      
    for (const record of users) {
      
      // Firebase record
      const firebaseUser = await adminAuth.createUser({
        email: record.email,
        password: record.password,
        displayName: `${record.firstName} ${record.lastName}`,
      });
  
      await adminAuth.setCustomUserClaims(firebaseUser.uid, {
        userType: UserType.STUDENT,
        status: UserStatus.ACTIVE,
      });
      
      // DB record
      const student = await prisma.user.create({
        data: {
          userID: firebaseUser.uid,
          firstName: record.firstName,
          lastName: record.lastName,
          email: record.email,
          student: {
            create: {
              indexNumber: record.indexNumber,
              grade: record.grade,
            },
          },
        },
        include: {
          student: true,
        },
      });
  
      registerSummery += `Student: ${record.firstName} ${record.lastName} | Email: ${record.email} | Index: ${record.indexNumber} | Password: ${record.password}\n`;
  
    }
   
  }
  
  // Return created users summery
  return { status: true, resDataType: "success", data: registerSummery };

}
