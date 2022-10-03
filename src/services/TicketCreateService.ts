import prismaClient from "../prisma";

import { io } from "../app";

class TicketCreateService {
  async execute(subject: string, content: string, user_id: string) {
    const ticket = await prismaClient.ticket.create({
      data: {
        subject,
        content,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const infoWS = {
      subject: ticket.subject,
      content: ticket.content,
      user_id: ticket.user_id,
      user: {
        name: ticket.user.name,
      },
    };

    io.emit("new_ticket", infoWS);

    return ticket;
  }
}

export { TicketCreateService };
