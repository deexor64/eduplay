import { PrismaClient, UserStatus, TeacherRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const TOTAL = 100;

async function main() {
  console.log("🌱 Seeding users, parents, teachers, and students...");

  const users = [];

  // Step 1: Create Users (3 * TOTAL)
  for (let i = 0; i < TOTAL * 3; i++) {
    const statusOptions = Object.values(UserStatus);
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate(),
        password: faker.internet.password(),
        status: randomStatus,
      }
    });
    users.push(user);
  }

  // Step 2: Create Parents
  const parents = [];
  const parentUsers = users.splice(0, TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    const user = parentUsers[i];
    const parent = await prisma.parent.create({
      data: {
        email: faker.internet.email(),
        userID: user.userID
      }
    });
    parents.push(parent);
  }

  // Step 3: Create Teachers
  const teachers = [];
  const teacherUsers = users.splice(0, TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    const user = teacherUsers[i];
    const teacher = await prisma.teacher.create({
      data: {
        indexNumber: faker.string.alphanumeric(8),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(Object.values(TeacherRole)),
        userID: user.userID
      }
    });
    teachers.push(teacher);
  }

  // Step 4: Create Students and assign parents
  const studentUsers = users.splice(0, TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    const user = studentUsers[i];
    const parent = parents[i % parents.length];

    await prisma.student.create({
      data: {
        indexNumber: faker.string.alphanumeric(8),
        email: faker.internet.email(),
        grade: faker.number.int({ min: 1, max: 13 }),
        class: faker.string.alpha({ length: 1, casing: 'upper' }),
        userID: user.userID,
        myParent: parent.parentID
      }
    });
  }

  console.log("✅ Seeding completed (without templates, activities, or progress).");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
