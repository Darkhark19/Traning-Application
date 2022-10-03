import { Request, Response } from "express";
import { GetUserService } from "../services/GetUserService";

class GetUserController {
  async handle(req: Request, res: Response) {
    const service = new GetUserService();
    const { user } = req.body;
    console.log(req.body);
    console.log(user);
    const result = await service.execute(user);

    return res.json(result);
  }
}

export { GetUserController };
