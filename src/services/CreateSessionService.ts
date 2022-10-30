import prismaClient from "../prisma";

import { io } from "../app";

class CreateSessionService {
  async execute(coordinatorId: string, studentId: string) {

    const session = await prismaClient.session.create({
      data:{
        coordinatorId: coordinatorId,
        studentId : studentId,
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
