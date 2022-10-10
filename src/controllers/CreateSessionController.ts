import { Request, Response } from "express";
import { CreateSessionService } from "../services/CreateSessionService";

class CreateSessionController {
  async handle(req: Request, res: Response) {
    const { coordinatorId, courseId } = req.body;

    const service = new CreateSessionService();

    const result = await service.execute(coordinatorId, courseId);

    return res.json(result);
  }
}

export { CreateSessionController };
