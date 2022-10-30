import prismaClient from "../prisma";

class CreateStudentService {
  async execute(name: string, email: string, classNumber: string) {
    var password = name;
    const user = await prismaClient.student.create({
      data: {
        name: name,
        email: email,
        password: password,
        class : classNumber,
      },
    });

    return user;
  }
}

export { CreateStudentService };
