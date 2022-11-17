import prismaClient from "../prisma";

class GetCoursesUserService {
  async execute(user: string) {
    const courses = await prismaClient.course.findMany({
      where: {
        ownerId: user,
      },
      orderBy: {
        name: "desc",
      },
     
    });

    return courses;
  }
}

export { GetCoursesUserService };
