import prismaClient from "../prisma";

class CreateModuleService {
  async execute(content: string, courseId: string) {
    const module = await prismaClient.module.create({
      data: {
        content, 
        courseId,
      },
      include:{
        course: true,
      }
    });

    return module;
  }
}

export { CreateModuleService };
