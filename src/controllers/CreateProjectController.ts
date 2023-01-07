import { Request, Response } from "express";
import { CreateProjectService } from "../services/CreateProjectService";

class CreateProjectController {
  async handle(req: Request, res: Response) {
    const { name,  content,ownerId } = req.body;
    const service = new CreateProjectService();
 
    const result = await service.execute( name, content,ownerId);

    return res.json(result);
  }
}

export { CreateProjectController };
