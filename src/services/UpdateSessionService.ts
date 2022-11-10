import prismaClient from "../prisma";

import { io } from "../app";

class UpdateSessionService {
  async execute(id: string) {
    const ended_at = new Date().toISOString();
    const session = await prismaClient.session.update({
      where:{
        id,
      },
      data:{
        ended_at,
      }
    });
    

    return session;
  }
}

export { UpdateSessionService };
