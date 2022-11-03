import { Request, Response } from "express";
import { GetSessionsModulesService } from "../services/GetSessionsModulesService";

class GetSessionsModulesController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;
    const service = new GetSessionsModulesService();
 
    const result = await service.execute(id);
    return res.json(result);
  }
}

export { GetSessionsModulesController };
