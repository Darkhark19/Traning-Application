import prismaClient from "../prisma";

class GetTicketsService {
  async execute() {
    const tickets = await prismaClient.ticket.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return tickets;
  }
}

export { GetTicketsService };
