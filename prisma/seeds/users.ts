import bcrypt  from 'bcrypt';
import { PrismaClient } from "@prisma/client";



export async function seedUser(prisma: PrismaClient) {
  
  const hashedPassword = await bcrypt.hash("password", 10);
  
  const users = [
      {
        userID: 'user-1',
        fullName: 'Alice Johnson',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        phoneNumber: '+94770000001',
        password: 'hashed_alice_pw',
      },
      {
        userID: 'user-2',
        fullName: 'Bob Smith',
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@example.com',
        phoneNumber: '+94770000002',
        password: 'hashed_bob_pw',
      },
      {
        userID: 'user-3',
        fullName: 'Clara Lee',
        firstName: 'Clara',
        lastName: 'Lee',
        email: 'clara@example.com',
        phoneNumber: '+94770000003',
        password: 'hashed_clara_pw',
      },
      {
        userID: 'user-4',
        fullName: 'David Brown',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david@example.com',
        phoneNumber: '+94770000004',
        password: 'hashed_david_pw',
      },
      {
        userID: 'user-5',
        fullName: 'Ella Green',
        firstName: 'Ella',
        lastName: 'Green',
        email: 'ella@example.com',
        phoneNumber: '+94770000005',
        password: 'hashed_ella_pw',
      },
      {
        userID: 'user-6',
        fullName: 'Frank Adams',
        firstName: 'Frank',
        lastName: 'Adams',
        email: 'frank@example.com',
        phoneNumber: '+94770000006',
        password: 'hashed_frank_pw',
      },
    ];
  
  for (const teacher of teachersData) {
    await prisma.teacher.create({ data: teacher });
  }
  
}

export async function seedTeacher(prisma: PrismaClient) {
  
  const hashedPassword = await bcrypt.hash("password", 10);
  
  const teachersData = [
      {
        teacherID: 'teacher-1',
        userID: 'user-1',
        indexNumber: 1001,
      },
      {
        teacherID: 'teacher-2',
        userID: 'user-2',
        indexNumber: 1002,
      },
      {
        teacherID: 'teacher-3',
        userID: 'user-3',
        indexNumber: 1003,
      },
      {
        teacherID: 'teacher-4',
        userID: 'user-4',
        indexNumber: 1004,
      },
      {
        teacherID: 'teacher-5',
        userID: 'user-5',
        indexNumber: 1005,
      },
      {
        teacherID: 'teacher-6',
        userID: 'user-6',
        indexNumber: 1006,
      },
    ];
  
  for (const teacher of teachersData) {
    await prisma.teacher.create({ data: teacher });
  }
  
}


