import { Request, Response } from "express";
import { LinkParentService } from "../services/LinkParentService";

class LinkParentController {
  async handle(req: Request, res: Response) {
    const { id, parent } = req.body;

    const service = new LinkParentService();

    const result = await service.execute(id, parent);

    return res.json(result);
  }
}

export { LinkParentController };
