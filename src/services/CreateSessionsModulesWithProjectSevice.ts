import prismaClient from "../prisma";


class CreateSessionsModulesWithProjectSevice {
  async execute(courseId: string, moduleId: string,sessionId: string,projectId:string) {
    const session = await prismaClient.sessionsModules.create({
      data:{
        courseId,
        moduleId,
        sessionId,
        projectId,
      },
      include: {
        module: true,
        session: true,
        project: true,
      },
    });
    

    return session;
  }
}

export { CreateSessionsModulesWithProjectSevice };
