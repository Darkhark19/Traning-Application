import { Request, Response } from "express";
import { CreateParentService } from "../services/CreateParentService";

class AddParentController {
  async handle(req: Request, res: Response) {
    const { name, parent,content } = req.body;

    const service = new CreateParentService();

    const result = await service.execute(name,parent,content);

    return res.json(result);
  }
}

export { AddParentController };
