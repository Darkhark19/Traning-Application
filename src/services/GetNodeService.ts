import prismaClient from "../prisma";

class GetNodeService {
  async execute() {
    const nodes = await prismaClient.node.findMany({
      include: {
        parents: true,
      },
    });

    return nodes;
  }
}

export { GetNodeService };
