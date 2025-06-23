import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.lesson.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.parent.deleteMany({});
  await prisma.teacher.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.user.deleteMany({});
  
  // Create a few users with roles
  for (let i = 0; i < 100; i++) {
    const user = await prisma.user.create({
      data: {
        fullName: faker.person.fullName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate(),
        password: faker.internet.password(),
        status: faker.helpers.arrayElement(Object.values(Status)),

        admin: i % 4 === 0 ? {
          create: {
            indexNumber: `ADM-${faker.number.int({ min: 1000, max: 9999 })}`,
            email: faker.internet.email(),
            phoneNumber: faker.phone.number(),
            profileUrl: faker.internet.url(),
          }
        } : undefined,

        teacher: i % 4 === 1 ? {
          create: {
            indexNumber: `TCH-${faker.number.int({ min: 1000, max: 9999 })}`,
            email: faker.internet.email(),
            phoneNumber: faker.phone.number(),
            profileUrl: faker.internet.url(),
            lessons: {
              create: [{
                title: faker.lorem.words(3),
                coverImage: faker.image.url(),
                description: faker.lorem.sentence(),
                activityData: {},
                options: {},
              }]
            }
          }
        } : undefined,

        parent: i % 4 === 2 ? {
          create: {
            email: faker.internet.email(),
            phoneNumber: faker.phone.number(),
            profileUrl: faker.internet.url(),
          }
        } : undefined,

        student: i % 4 === 3 ? {
          create: {
            indexNumber: `STD-${faker.number.int({ min: 1000, max: 9999 })}`,
            email: faker.internet.email(),
            phoneNumber: faker.phone.number(),
            profileUrl: faker.internet.url(),
          }
        } : undefined,
      }
    });

    console.log(`Created user ${user.fullName}`);
  }

  // Create classes with a teacher (assuming at least one teacher created)
  const teacher = await prisma.teacher.findFirst();
  if (teacher) {
    for (let i = 0; i < 10; i++) {
      await prisma.class.create({
        data: {
          name: `Class ${i + 1}`,
          grade: faker.number.int({ min: 1, max: 12 }),
          classLetter: faker.string.alpha({ casing: 'upper' }),
          managedBy: teacher.teacherID
        }
      });
    }
  }

  // Enroll students (optional enhancement)
  const students = await prisma.student.findMany();
  const classes = await prisma.class.findMany();
  for (const student of students) {
    const randomClass = faker.helpers.arrayElement(classes);
    await prisma.student.update({
      where: { studentID: student.studentID },
      data: { classID: randomClass.classID }
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
