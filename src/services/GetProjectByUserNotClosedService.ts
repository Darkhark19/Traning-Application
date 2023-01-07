import prismaClient from "../prisma";

class GetProjectByUserNotClosedService {
  async execute(userId: string) {
    const result = await prismaClient.project.findMany({
      where: {
        ownerId : userId,
        closed: false,       
      },
      orderBy: {
        name: "desc",
      },
     include:{
        owner: true,
        SessionsModules: {
            include: {
                session: true,
                module: true,
            }
        }
     }
    });
    return result;
  }
}

export { GetProjectByUserNotClosedService };
