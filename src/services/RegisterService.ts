import prismaClient from "../prisma";

class RegisterService {
  async execute(name: string, email: string, password: string) {
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return user;
  }
}

export { RegisterService };
