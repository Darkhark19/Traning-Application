import { Request, Response } from "express";
import { GetCoursesUserService } from "../services/GetCoursesUserService";
class GetCoursesUserController{
  async handle(req: Request, res: Response) {
    const {user} = req.body;

    const service = new GetCoursesUserService();
    const result = await service.execute(user);

    return res.json(result);
  }
}

export { GetCoursesUserController };
