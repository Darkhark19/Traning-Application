import prismaClient from "../prisma";


class CreateSessionsModulesService {
  async execute(courseId: string, moduleId: string,sessionId: string) {
    const session = await prismaClient.sessionsModules.create({
      data:{
        courseId,
        moduleId,
        sessionId,

      },
      include: {
        module: true,
        session: true,
      },
    });
    
    return session;
  }
}

export { CreateSessionsModulesService };
