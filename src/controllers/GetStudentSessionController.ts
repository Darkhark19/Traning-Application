import { Request, Response } from "express";
import { GetStudentSessionService } from "../services/GetStudentSessionService";

class GetStudentSessionController {
  async handle(req: Request, res: Response) {
    const { studentId } = req.body;
    const service = new GetStudentSessionService();
 
    const result = await service.execute(studentId);

    return res.json(result);
  }
}

export { GetStudentSessionController };
