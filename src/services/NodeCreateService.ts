import prismaClient from "../prisma";

import { io } from "../app";

class NodeCreateService {
  async execute(name: string, content: string) {
    const node = await prismaClient.node.create({
      data: {
        name: name,
        content: content,
      },
    });

  
    return node;
  }
}

export { NodeCreateService };
