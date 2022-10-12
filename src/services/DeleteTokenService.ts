import prismaClient from "../prisma";

class DeleteTokenService {
  async execute(token: string) {
    await prismaClient.token.deleteMany({
      where:{
        token,
      },
      
    });
  }
}

export { DeleteTokenService };
