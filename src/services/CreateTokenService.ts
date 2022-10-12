import prismaClient from "../prisma";

class CreateTokenService {
  async execute(token: string, user_id: string) {
    return await prismaClient.token.create({
      data: {
        token,
        user_id,
      },
    });
   
  }
}

export { CreateTokenService };
