import prismaClient from "../prisma";

class GetStudentsByCourseService {
  async execute(course: string) {
    const user = await prismaClient.student.findMany({
        where:{
            courseId: course,
        },
        orderBy: {
            name: "desc",
        }
        
    });

    return user;
  }
}

export { GetStudentsByCourseService };
