import { Request, Response } from "express";
import { GetProjectByUserNotClosedService } from "../services/GetProjectByUserNotClosedService";
class GetProjectByUserNotClosedController{
  async handle(req: Request, res: Response) {
    const {userId} = req.body;

    const service = new GetProjectByUserNotClosedService();
    const result = await service.execute(userId);

    return res.json(result);
  }
}

export { GetProjectByUserNotClosedController };
