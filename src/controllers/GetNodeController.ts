import { Request, Response } from "express";
import { GetNodeService } from "../services/GetNodeService";

class GetNodeController {
  async handle(req: Request, res: Response) {
    const service = new GetNodeService();

    const result = await service.execute();

    return res.json(result);
  }
}

export { GetNodeController };
