import prismaClient from "../prisma";

class GetModulesService {
  async execute(courseId: string) {
    const courses = await prismaClient.module.findMany({
        where:{
            courseId: {
                equals: courseId,
            }
        },
        orderBy: {
            id: "desc",
        }
    });

    return courses;
  }
}

export { GetModulesService };
