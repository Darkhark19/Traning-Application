import { Request, Response } from "express";
import { UpdateSessionService } from "../services/UpdateSessionService";

class UpdateSessionController {
  async handle(req: Request, res: Response) {
    const { id} = req.body;

    const service = new UpdateSessionService();
    try{
    const result = await service.execute(id);

    return res.json(result);
    }catch(err){
      return res.status(500).json({error:err.message})
    }
  }
}

export { UpdateSessionController };
