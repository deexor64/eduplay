import { PrismaClient, Status } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const classes = [];

  // Create 5 classes first for students to be assigned
  for (let i = 0; i < 5; i++) {
    const grade = 1 + Math.floor(Math.random() * 5);
    const classLetter = String.fromCharCode(65 + i); // A, B, C...

    const teacherUser = await prisma.user.create({
      data: {
        fullName: faker.person.fullName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: faker.internet.password(),
        status: "ACTIVE",
      },
    });

    const teacher = await prisma.teacher.create({
      data: {
        indexNumber: `T-${faker.number.int({ min: 1000, max: 9999 })}`,
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        userID: teacherUser.userID,
      },
    });

    const createdClass = await prisma.class.create({
      data: {
        name: `${grade}${classLetter}`,
        grade,
        classLetter,
        managedBy: teacher.teacherID,
      },
    });

    classes.push(createdClass.classID);
  }

  // Create 100 users and role data
  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;

    const user = await prisma.user.create({
      data: {
        fullName,
        firstName,
        lastName,
        password: faker.internet.password(),
        status: faker.helpers.arrayElement(Object.values(Status)),
      },
    });

    const role = i % 4;

    if (role === 0) {
      // Admin
      await prisma.admin.create({
        data: {
          indexNumber: `A-${i + 100}`,
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          userID: user.userID,
        },
      });
    } else if (role === 1) {
      // Teacher
      await prisma.teacher.create({
        data: {
          indexNumber: `T-${i + 100}`,
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          userID: user.userID,
        },
      });
    } else if (role === 2) {
      // Parent
      await prisma.parent.create({
        data: {
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          userID: user.userID,
        },
      });
    } else {
      // Student
      const assignedClass = faker.helpers.arrayElement(classes);
      await prisma.student.create({
        data: {
          indexNumber: `S-${i + 100}`,
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          classID: assignedClass,
          userID: user.userID,
        },
      });
    }
  }

  console.log("✅ Seeding complete");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
