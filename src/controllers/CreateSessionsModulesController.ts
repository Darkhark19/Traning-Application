import { Request, Response } from "express";
import { CreateSessionsModulesService } from "../services/CreateSessionsModulesService";

class CreateSessionsModulesController {
  async handle(req: Request, res: Response) {
    const { courseId, moduleId, sessionId } = req.body;
    
    const service = new CreateSessionsModulesService();

    const result = await service.execute(courseId, moduleId,sessionId);

    return res.json(result);
  }
}

export { CreateSessionsModulesController};
