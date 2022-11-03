import prismaClient from "../prisma";

import { io } from "../app";

class CreateSessionService {
  async execute(coordinatorId: string, studentId: string) {
    const ended_at = new Date().toISOString();
    const session = await prismaClient.session.create({
      data:{
        coordinatorId: coordinatorId,
        studentId : studentId,
        ended_at: ended_at,
      },
      include: {
        coordinator: true,
        students: true,
      },
    });
    

    return session;
  }
}

export { CreateSessionService };
