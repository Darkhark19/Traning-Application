import { Request, Response } from "express";
import { GetStudentsByCourseService } from "../services/GetStudentsByCourseService";

class GetStudentsByCourseController {
  async handle(req: Request, res: Response) {
    const {courseId} = req.body;
    const service = new GetStudentsByCourseService();

    const result = await service.execute(courseId);

    return res.json(result);
  }
}

export { GetStudentsByCourseController };
