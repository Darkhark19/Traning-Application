import { Request, Response } from "express";
import { CreateModuleService } from "../services/CreateModuleService";

class CreateModuleController {
  async handle(req: Request, res: Response) {
    const { moduleTitle,  course } = req.body;
  
    const service = new CreateModuleService();
 
    const result = await service.execute( moduleTitle, course);

    return res.json(result);
  }
}

export { CreateModuleController };
