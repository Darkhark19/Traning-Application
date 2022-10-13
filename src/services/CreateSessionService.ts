import prismaClient from "../prisma";

import { io } from "../app";

class CreateSessionService {
  async execute(coordinatorId: string, cId: string) {

    const session = await prismaClient.session.create({
      data:{
        coordinatorId: coordinatorId,
        courseId : cId,
      },
      include: {
        coordinator: true,
        course: true,
      },
    });
    

    return session;
  }
}

export { CreateSessionService };
