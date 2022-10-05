import prismaClient from "../prisma";

class GetStudentsService {
  async execute() {
    const user = await prismaClient.student.findMany({
        orderBy: {
            name: "desc",
        }
    });

    return user;
  }
}

export { GetStudentsService };
