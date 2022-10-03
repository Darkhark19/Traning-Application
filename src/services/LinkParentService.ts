import prismaClient from "../prisma";

class LinkParentService {
  async execute(id: string, parent: string) {
    const node = await prismaClient.node.update({
      where: { id },
      data: {
        parents: {
          connect: [{ id: parent }],
        },
      },
    });

    return node;
  }
}

export { LinkParentService };
