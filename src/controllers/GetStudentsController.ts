import { Request, Response } from "express";
import { GetStudentsService } from "../services/GetStudentsService";

class GetStudentsController {
  async handle(req: Request, res: Response) {
    const service = new GetStudentsService();

    const result = await service.execute();

    return res.json(result);
  }
}

export { GetStudentsController };
