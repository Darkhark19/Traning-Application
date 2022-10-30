import { Request, Response } from "express";
import { GetModulesService } from "../services/GetModulesService";

class GetModulesController{
  async handle(req: Request, res: Response) {
    const {courseId} = req.body;
    const service = new GetModulesService();

    const result = await service.execute(courseId);

    return res.json(result);
  }
}

export { GetModulesController };
