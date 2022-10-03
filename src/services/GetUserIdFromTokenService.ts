import prismaClient from "../prisma";

class GetUserIdFromTokenService {
  async execute(token: string) {
    const tokenFound = await prismaClient.token.findFirst({
      where: {
        token: {
          equals: token,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return tokenFound.user_id;
  }
}

export { GetUserIdFromTokenService };
