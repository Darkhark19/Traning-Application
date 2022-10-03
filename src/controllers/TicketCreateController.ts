import { Request, Response } from "express";
import { TicketCreateService } from "../services/TicketCreateService";

class TicketCreateController {
  async handle(req: Request, res: Response) {
    const { subject, content, user_id } = req.body;

    const service = new TicketCreateService();

    const result = await service.execute(subject, content, user_id);

    return res.json(result);
  }
}

export { TicketCreateController };
