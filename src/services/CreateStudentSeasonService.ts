import prismaClient from "../prisma";


class CreateStudentSessionService {
  async execute(sessionId: string, studentId: string) {
    const ended_at = Date.now().toLocaleString();
    const studentSession = await prismaClient.studentSession.create({
      data: {
        content: "ola",
        sessionId:sessionId,
        studentId: studentId,
    },
      include:{
        session : true,
        student: true,
      }
    });

    return studentSession;
  }
}

export { CreateStudentSessionService };
