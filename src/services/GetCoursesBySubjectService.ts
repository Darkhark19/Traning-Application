import prismaClient from "../prisma";

class GetCoursesBySubjectService {
  async execute(subject: string) {
    const subjectToBFound = subject;
    const courses = await prismaClient.course.findMany({
      where: {
        subject: {
          equals: subjectToBFound,
        },
      },
      orderBy: {
        name: "desc",
      },
     
    });

    return courses;
  }
}

export { GetCoursesBySubjectService };
