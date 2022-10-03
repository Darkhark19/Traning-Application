import { Request, Response } from "express";
import { ForumService } from "../services/ForumService";
import { RegisterService } from "../services/RegisterService";

class ForumController {
  async handle(req: Request, res: Response) {
    const { subject, content, user } = req.body;

    const service = new ForumService();

    const result = await service.execute(subject, content, user);

    return res.json(result);
  }
}

export { ForumController };
