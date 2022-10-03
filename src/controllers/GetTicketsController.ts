import { Request, Response } from "express";
import { GetTicketsService } from "../services/GetTicketsService";

class GetTicketsController {
  async handle(req: Request, res: Response) {
    const service = new GetTicketsService();

    const result = await service.execute();

    return res.json(result);
  }
}

export { GetTicketsController };
