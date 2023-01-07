import prismaClient from "../prisma";


class CreateProjectService {
  async execute(name: string, content: string,ownerId: string) {
    const project = await prismaClient.project.create({
      data:{
        name,
        content,
        updatedAt: new Date(),
        ownerId,
      },
      include: {
        owner: true,
      },
    });

    return project;
  }
}

export { CreateProjectService };
