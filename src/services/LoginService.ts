import prismaClient from "../prisma";
import { CreateTokenService } from "./CreateTokenService";

class LoginService {
  async execute(email: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: { email: email, password: password },
    });

    return user;
  }
}

export { LoginService };
