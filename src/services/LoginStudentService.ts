import prismaClient from "../prisma";


class LoginStudentService {
  async execute(id: string, password: string) {
    const student = await prismaClient.student.findFirst({
      where: { id, password },
    });

    return student;
  }
}

export { LoginStudentService };
