import { Request, Response } from "express";
import { NodeCreateService } from "../services/NodeCreateService";

class NodeAddController {
  async handle(req: Request, res: Response) {
    const { name, content } = req.body;

    const service = new NodeCreateService();

    const result = await service.execute(name, content);

    return res.json(result);
  }
}

export { NodeAddController };
