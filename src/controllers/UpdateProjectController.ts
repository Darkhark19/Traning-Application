import { Request, Response } from "express";
import { UpdateProjectService } from "../services/UpdateProjectService";

class UpdateProjectController {
  async handle(req: Request, res: Response) {
    const { id,consumables} = req.body;

    const service = new UpdateProjectService();

    const result = await service.execute(id,consumables);

    return res.json(result);
  }
}

export { UpdateProjectController };
