import prismaClient from "../prisma";

class GetCourseService {
  async execute() {
    const courses = await prismaClient.course.findMany({
      orderBy: {
        name: "desc",
      }
    });

    return courses;
  }
}

export { GetCourseService };
