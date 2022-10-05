import prismaClient from "../prisma";


class LoginService {
  async execute(idUser: string, pass: string) {
    const user = await prismaClient.user.findFirst({
      where: { id: idUser, password: pass },
    });

    return user;
  }
}

export { LoginService };
