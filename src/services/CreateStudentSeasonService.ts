import prismaClient from "../prisma";


class CreateStudentSessionService {
  async execute(sessionId: string, studentId: string) {
    /*const studentSession = await prismaClient.studentSession.create({
      data: {
        content: "ola",
        sessionId,
        studentId,
    },
      
    });

    return studentSession;*/
  }
}

export { CreateStudentSessionService };
