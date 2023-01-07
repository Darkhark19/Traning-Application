import prismaClient from "../prisma";


class UpdateProjectService {
  async execute(id: string, consumables: string) {
    const project = await prismaClient.project.update({
      where:{
        id,
      },
      data:{
        closed: true,
        updatedAt: new Date(),
        consumables,
      },
      include: {
        owner: true,
      },
    });

    return project;
  }
}

export { UpdateProjectService };
