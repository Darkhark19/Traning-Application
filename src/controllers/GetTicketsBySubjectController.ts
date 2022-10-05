import { Request, Response } from "express";
import { GetTicketsBySubjectService } from "../services/GetCoursesBySubjectService";

class GetCoursesByNameController {
  async handle(req: Request, res: Response) {
    const { subject } = req.body;
    const service = new GetTicketsBySubjectService();

    const result = await service.execute(subject);

    return res.json(result);
  }
}

export { GetCoursesByNameController };
