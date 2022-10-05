import prismaClient from "../prisma";

import { io } from "../app";

class CreateSessionService {
  async execute(coordinatorId: string, courseId: string) {
    const session = await prismaClient.session.create({
      data: {
        coordinatorId,
        courseId,
    },
      include:{
        coordinator : true,
        course: true,
      }
    });

    return session;
  }
}

export { CreateSessionService };
