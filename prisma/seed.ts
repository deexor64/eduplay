import { PrismaClient, UserStatus, TeacherRole, Subject, StudentClass, ActivityDifficulty, ActivityStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const TOTAL = 100;
const ACTIVITIES_PER_TEACHER = 5;

async function main() {
  console.log("🌱 Seeding users, parents, teachers, students, and activities...");

  // Step 0: Insert dummy templates first to satisfy FK constraints
  const templates = [
    {
      templateCode: 'TEMPLATE_1',
      title: 'Human Template 1',
      description: 'Skin son eat stay vote blue but. Interview science notice.',
      templateType: 'cut',
      sampleActivity: { example: 'This is just a stub' },
    },
    {
      templateCode: 'TEMPLATE_2',
      title: 'Soldier Template 2',
      description: 'Figure marriage become deal student executive. Least ahead loss owner sometimes live husband.',
      templateType: 'war',
      sampleActivity: { example: 'This is just a stub' },
    },
    {
      templateCode: 'TEMPLATE_3',
      title: 'Here Template 3',
      description: 'Line ahead forget public.\nFuture however no whatever explain.',
      templateType: 'strategy',
      sampleActivity: { example: 'This is just a stub' },
    },
    {
      templateCode: 'TEMPLATE_4',
      title: 'Color Template 4',
      description: 'Understand long business. Wall natural save action exist.',
      templateType: 'offer',
      sampleActivity: { example: 'This is just a stub' },
    },
    {
      templateCode: 'TEMPLATE_5',
      title: 'Common Template 5',
      description: 'Main size social writer arm. Sing book include. Spend day heart key against fund occur.',
      templateType: 'cost',
      sampleActivity: { example: 'This is just a stub' },
    },
  ];

  await prisma.template.createMany({
    data: templates,
    skipDuplicates: true,
  });

  const allUsers = [];

  // Step 1: Create 3 * TOTAL users
  for (let i = 0; i < TOTAL * 3; i++) {
    const status = Object.values(UserStatus)[i % Object.values(UserStatus).length];
    const user = await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate(),
        password: faker.internet.password(),
        status,
      }
    });
    allUsers.push(user);
  }

  // Step 2: Create Parents
  const parents = [];
  for (let i = 0; i < TOTAL; i++) {
    const parent = await prisma.parent.create({
      data: {
        email: faker.internet.email(),
        userID: allUsers[i].userID
      }
    });
    parents.push(parent);
  }

  // Step 3: Create Teachers
  const teachers = [];
  for (let i = 0; i < TOTAL; i++) {
    const role = i === 0 ? "MASTER" : Object.values(TeacherRole)[(i % (Object.values(TeacherRole).length - 1)) + 1];
    const subject = Object.values(Subject)[i % Object.values(Subject).length];
    const teacher = await prisma.teacher.create({
      data: {
        indexNumber: faker.string.alphanumeric(8),
        email: faker.internet.email(),
        role,
        subject,
        userID: allUsers[TOTAL + i].userID
      }
    });
    teachers.push(teacher);
  }

  // Step 4: Create Students
  for (let i = 0; i < TOTAL; i++) {
    const grade = (i % 5) + 1;
    const sclass = Object.values(StudentClass)[i % Object.values(StudentClass).length];
    await prisma.student.create({
      data: {
        indexNumber: faker.string.alphanumeric(8),
        email: faker.internet.email(),
        grade,
        class: sclass,
        userID: allUsers[TOTAL * 2 + i].userID,
        myParent: parents[i % TOTAL].parentID
      }
    });
  }

  // Step 5: Create Activities
  const templateCodes = templates.map(t => t.templateCode);
  let activityCounter = 0;

  for (let i = 0; i < TOTAL; i++) {
    for (let j = 0; j < ACTIVITIES_PER_TEACHER; j++) {
      const topic = `${faker.word.words(1)} Topic G${(j % 5) + 1}`;
      const title = `${topic} - ${faker.word.words(2)}`;
      const status = Object.values(ActivityStatus)[(activityCounter + j) % Object.values(ActivityStatus).length];
      const difficulty = Object.values(ActivityDifficulty)[(activityCounter + j) % Object.values(ActivityDifficulty).length];
      const grade = (activityCounter % 5) + 1;
      const subject = Object.values(Subject)[activityCounter % Object.values(Subject).length];
      const templateCode = templateCodes[activityCounter % templateCodes.length];

      await prisma.activity.create({
        data: {
          title,
          topic,
          instructions: faker.lorem.sentence(),
          activityData: { foo: "bar" },
          status,
          isScored: activityCounter % 2 === 0,
          difficulty,
          grade,
          subject,
          templateCode,
          createdBy: teachers[i].teacherID
        }
      });
      activityCounter++;
    }
  }

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
