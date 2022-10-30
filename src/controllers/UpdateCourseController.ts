import { Request, Response } from "express";
import { CreateCourseService } from "../services/CreateCourseService";

class CreateCourseController {
  async handle(req: Request, res: Response) {
    const {idCourse,checkedStudents} = req.body;
    const service = new CreateCourseService();
 
    const result = await service.execute(idCourse, subject, id);
    return res.json(result);
  }
}

export { CreateCourseController };
