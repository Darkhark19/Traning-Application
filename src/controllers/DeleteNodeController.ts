import { Request, Response } from "express";
import { DeleteNodeService } from "../services/DeleteNodeService";

class DeleteNodeController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const service = new DeleteNodeService();

    const result = await service.execute(id);

    return res.json(result);
  }
}

export { DeleteNodeController };
