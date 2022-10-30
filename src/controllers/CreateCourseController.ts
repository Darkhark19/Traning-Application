import { Request, Response } from "express";
import { CreateCourseService } from "../services/CreateCourseService";

class CreateCourseController {
  async handle(req: Request, res: Response) {
    const {title,subject,id} = req.body;
    const service = new CreateCourseService();
 
    const result = await service.execute(title, subject, id);
    return res.json(result);
  }
}

export { CreateCourseController };
