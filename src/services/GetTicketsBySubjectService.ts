import prismaClient from "../prisma";

class GetTicketsBySubjectService {
  async execute(subject: string) {
    const subjectToBFound = subject;
    const tickets = await prismaClient.ticket.findMany({
      where: {
        subject: {
          equals: subjectToBFound,
        },
      },
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

export { GetTicketsBySubjectService };
