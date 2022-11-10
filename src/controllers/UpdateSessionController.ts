import { Request, Response } from "express";
import { UpdateSessionService } from "../services/UpdateSessionService";

class UpdateSessionController {
  async handle(req: Request, res: Response) {
    const { id} = req.body;

    const service = new UpdateSessionService();

    const result = await service.execute(id);

    return res.json(result);
  }
}

export { UpdateSessionController };
