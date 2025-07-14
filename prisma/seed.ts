import { PrismaClient, UserStatus, TeacherRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const TOTAL = 100;

async function main() {
  console.log("🌱 Seeding users, parents, teachers, and students...");

  const allUsers = [];

  // Step 1: Create 3 * TOTAL users
  for (let i = 0; i < TOTAL * 3; i++) {
    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate(),
        password: faker.internet.password(),
        status: faker.helpers.arrayElement(Object.values(UserStatus)),
      }
    });
    allUsers.push(user);
  }

  // Step 2: Create Parents (first third)
  const parents = [];
  const parentUsers = allUsers.splice(0, TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    const parent = await prisma.parent.create({
      data: {
        email: faker.internet.email(),
        userID: parentUsers[i].userID
      }
    });
    parents.push(parent);
  }

  // Step 3: Create Teachers (second third)
  const teachers = [];
  const teacherUsers = allUsers.splice(0, TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    const teacher = await prisma.teacher.create({
      data: {
        indexNumber: faker.string.alphanumeric(8),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(Object.values(TeacherRole)),
        userID: teacherUsers[i].userID
      }
    });
    teachers.push(teacher);
  }

  // Step 4: Create Students (last third) and link them to random parents
  const studentUsers = allUsers.splice(0, TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    await prisma.student.create({
      data: {
        indexNumber: faker.string.alphanumeric(8),
        email: faker.internet.email(),
        grade: faker.number.int({ min: 1, max: 13 }),
        class: faker.string.alpha({ length: 1, casing: 'upper' }),
        userID: studentUsers[i].userID,
        myParent: parents[i % parents.length].parentID
      }
    });
  }

  console.log("✅ Seeding completed (excluding templates, activities, and progress).");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
