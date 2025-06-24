import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Add this helper at the top of your file
const usedClassCombos = new Set<string>();

function generateUniqueClassCombo(): { grade: number, classLetter: string } {
  let combo;
  do {
    const grade = faker.number.int({ min: 1, max: 11 });
    const classLetter = faker.string.alpha({ casing: 'upper', length: 1 });
    combo = `${grade}-${classLetter}`;
    if (!usedClassCombos.has(combo)) {
      usedClassCombos.add(combo);
      return { grade, classLetter };
    }
  } while (true);
}


async function main() {
  console.log("🌱 Clearing existing data...");

  await prisma.lesson.deleteMany();
  await prisma.class.deleteMany();
  await prisma.student.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();

  const classes = [];

  // Pre-generate a few classes (for student assignment)
  for (let i = 0; i < 5; i++) {
    const teacherUser = await prisma.user.create({
      data: {
        fullName: faker.person.fullName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate(),
        password: faker.internet.password(),
        status: Status.ACTIVE,
      },
    });

    const teacher = await prisma.teacher.create({
      data: {
        indexNumber: `T-${1000 + i}`,
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        userID: teacherUser.userID,
      },
    });
    
    const { grade, classLetter } = generateUniqueClassCombo();

    const classItem = await prisma.class.create({
      data: {
        name: `Class ${i + 1}`,
        grade,
        classLetter,
        managedBy: teacher.teacherID,
      },
    });

    classes.push(classItem);

    // Each teacher creates 2 lessons
    for (let j = 0; j < 2; j++) {
      await prisma.lesson.create({
        data: {
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          createdBy: teacher.teacherID,
        },
      });
    }
  }

  console.log("👥 Creating 100 users...");

  for (let i = 0; i < 100; i++) {
    const fullName = faker.person.fullName();
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1] || "User";

    const user = await prisma.user.create({
      data: {
        fullName,
        firstName,
        lastName,
        dateOfBirth: faker.date.birthdate(),
        password: faker.internet.password(),
        status: faker.helpers.arrayElement(Object.values(Status)),
      },
    });

    const role = i % 4;

    if (role === 0) {
      await prisma.admin.create({
        data: {
          indexNumber: `A-${1000 + i}`,
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          userID: user.userID,
        },
      });
    } else if (role === 1) {
      const teacher = await prisma.teacher.create({
        data: {
          indexNumber: `T-${2000 + i}`,
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          userID: user.userID,
        },
      });

      // Also assign a class to this teacher
      const classItem = await prisma.class.create({
        data: {
          name: `Class ${i}`,
          grade: faker.number.int({ min: 1, max: 11 }),
          classLetter: faker.string.alpha({ casing: 'upper', length: 1 }),
          managedBy: teacher.teacherID,
        },
      });

      classes.push(classItem);

      await prisma.lesson.create({
        data: {
          title: faker.lorem.words(2),
          description: faker.lorem.sentence(),
          createdBy: teacher.teacherID,
        },
      });
    } else if (role === 2) {
      await prisma.parent.create({
        data: {
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          userID: user.userID,
        },
      });
    } else {
      // Assign student to a random class
      const randomClass = faker.helpers.arrayElement(classes);

      await prisma.student.create({
        data: {
          indexNumber: `S-${3000 + i}`,
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          classID: randomClass.classID,
          userID: user.userID,
        },
      });
    }
  }

  console.log("✅ Done seeding!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
