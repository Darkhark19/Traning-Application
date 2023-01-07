import { Request, Response } from "express";
import { GetProjectByUserService } from "../services/GetProjectByUserService";
class GetProjectByUserController{
  async handle(req: Request, res: Response) {
    const {userId} = req.body;

    const service = new GetProjectByUserService();
    const result = await service.execute(userId);

    return res.json(result);
  }
}

export { GetProjectByUserController };
