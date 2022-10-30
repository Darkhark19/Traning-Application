import { Request, Response } from "express";
import { GetUserService } from "../services/GetUserService";

class GetUserController {
  async handle(req: Request, res: Response) {
    const service = new GetUserService();
    const { user } = req.body;
    const result = await service.execute(user);

    return res.json(result);
  }
}

export { GetUserController };
