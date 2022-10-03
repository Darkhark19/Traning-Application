import { Request, Response } from "express";
import { SendEmailService } from "../services/SendEmailService";

class SendEmailController {
  handle(req: Request, res: Response) {
    const { receiverEmail, subject, body } = req.body;

    const service = new SendEmailService();

    const result = service.execute(receiverEmail, subject, body);

    return res.json(result);
  }
}

export { SendEmailController };
