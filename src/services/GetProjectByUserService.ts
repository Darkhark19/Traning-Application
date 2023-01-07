import prismaClient from "../prisma";

class GetProjectByUserService {
  async execute(userId: string) {
    const result = await prismaClient.project.findMany({
      where: {
        ownerId : userId,
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

export { GetProjectByUserService };
