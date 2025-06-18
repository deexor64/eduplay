import bcrypt  from 'bcrypt';
import { PrismaClient } from "@prisma/client";

export async function seedTeacher(prisma: PrismaClient) {
  
  const hashedPassword = await bcrypt.hash("password", 10);
  
  const teachersData = [
    { indexNumber: 1001, fullName: "Alice Johnson", firstName: "Alice", lastName: "Johnson", password: hashedPassword },
    { indexNumber: 1002, fullName: "Bob Smith", firstName: "Bob", lastName: "Smith", password: hashedPassword },
    { indexNumber: 1003, fullName: "Carol Williams", firstName: "Carol", lastName: "Williams", password: hashedPassword },
    { indexNumber: 1004, fullName: "David Brown", firstName: "David", lastName: "Brown", password: hashedPassword },
    { indexNumber: 1005, fullName: "Eva Davis", firstName: "Eva", lastName: "Davis", password: hashedPassword },
    { indexNumber: 1006, fullName: "Frank Miller", firstName: "Frank", lastName: "Miller", password: hashedPassword },
    { indexNumber: 1007, fullName: "Grace Wilson", firstName: "Grace", lastName: "Wilson", password: hashedPassword },
    { indexNumber: 1008, fullName: "Henry Moore", firstName: "Henry", lastName: "Moore", password: hashedPassword },
    { indexNumber: 1009, fullName: "Ivy Taylor", firstName: "Ivy", lastName: "Taylor", password: hashedPassword },
    { indexNumber: 1010, fullName: "Jack Anderson", firstName: "Jack", lastName: "Anderson", password: hashedPassword }
  ];
  
  for (const teacher of teachersData) {
    await prisma.teacher.create({ data: teacher });
  }
  
}


