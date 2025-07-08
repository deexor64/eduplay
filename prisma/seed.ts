import { PrismaClient, Status, TeacherRole, StudentRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const TOTAL_RECORDS = 100;

async function main() {
  console.log("🌱 Starting seeding...");

  // Step 1: Create Users
  const users = [];
  for (let i = 0; i < TOTAL_RECORDS * 3; i++) {
    const statusOptions = Object.values(Status);
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number('+94 7# ### ####'),
        dateOfBirth: faker.date.birthdate(),
        password: faker.internet.password(),
        status: status,
        displayPicUrl: faker.image.avatar(),
      }
    });
    users.push(user);
  }

  // Step 2: Create Parents
  const parents = [];
  const parentUsers = users.splice(0, TOTAL_RECORDS);
  for (let i = 0; i < TOTAL_RECORDS; i++) {
    const user = parentUsers[i];
    const parent = await prisma.parent.create({
      data: {
        email: faker.internet.email(),
        userID: user.userID,
      }
    });
    parents.push({ parent, user });
  }

  // Step 3: Create Teachers
  const teachers = [];
  const teacherUsers = users.splice(0, TOTAL_RECORDS);
  for (let i = 0; i < TOTAL_RECORDS; i++) {
    const user = teacherUsers[i];
    const teacher = await prisma.teacher.create({
      data: {
        indexNumber: faker.string.alphanumeric(10),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(Object.values(TeacherRole)),
        userID: user.userID
      }
    });
    teachers.push({ teacher, user });
  }

  // Step 4: Create Students and link to parents
  const studentUsers = users.splice(0, TOTAL_RECORDS);
  for (let i = 0; i < TOTAL_RECORDS; i++) {
    const user = studentUsers[i];
    const parent = parents[i % parents.length];

    await prisma.student.create({
      data: {
        indexNumber: faker.string.alphanumeric(10),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(Object.values(StudentRole)),
        grade: faker.number.int({ min: 1, max: 13 }),
        class: faker.string.alpha({ length: 1, casing: 'upper' }),
        userID: user.userID,
        myParent: parent.parent.parentID,
      }
    });
  }

  console.log("✅ Seeding completed!");
}

main()
  .catch(e => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
