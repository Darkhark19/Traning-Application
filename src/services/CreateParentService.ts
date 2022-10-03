import prismaClient from "../prisma";

import { io } from "../app";

class CreateParentService {
  async execute(name: string, parent: string,content : string) {
    const node = await prismaClient.node.create({
      data: {
        name,
        content,
        parents: {
          connect: [{ id: parent }],
        },
      },
    });

    return node;
  }
}

export { CreateParentService };
