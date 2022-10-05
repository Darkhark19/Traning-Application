import { Request, Response } from "express";
import { GetCourseService } from "../services/GetCourseService";

class GetCoursesController{
  async handle(req: Request, res: Response) {
    const service = new GetCourseService();

    const result = await service.execute();

    return res.json(result);
  }
}

export { GetCoursesController };
