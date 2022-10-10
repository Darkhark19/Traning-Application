import { Request, Response } from "express";
import { CreateStudentSessionService} from "../services/CreateStudentSeasonService"

class CreateStudentSessioController {
  async handle(req: Request, res: Response) {
    const { sessionId, studentId } = req.body;

    const service = new CreateStudentSessionService();

    const result = await service.execute(sessionId, studentId);

    return res.json(result);
  }
}

export { CreateStudentSessioController };
