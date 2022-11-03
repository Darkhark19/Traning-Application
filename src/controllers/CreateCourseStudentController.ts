import { Request, Response } from "express";
import { CreateCourseStudentService } from "../services/CreateCourseStudentService";

class CreateCourseStudentController {
  async handle(req: Request, res: Response) {
    const {courseId,studentId} = req.body;
    const service = new CreateCourseStudentService();
 
    const result = await service.execute(courseId, studentId);
    return res.json(result);
  }
}

export { CreateCourseStudentController };
