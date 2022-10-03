import prismaClient from "../prisma";

class ForumService {
  async execute(subject: string, content: string, user_id: string) {
    const ticket = await prismaClient.ticket.create({
      data: {
        subject: subject,
        content: content,
        user_id: user_id,
      },
    });

    return ticket;
  }
}

export { ForumService };
