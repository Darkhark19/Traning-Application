import { Request, Response } from "express";
import { CreateSessionsModulesWithProjectSevice } from "../services/CreateSessionsModulesWithProjectSevice";

class CreateSessionsModulesWithProjectController {
  async handle(req: Request, res: Response) {
    const { courseId, moduleId, sessionId,projectId } = req.body;
    const service = new CreateSessionsModulesWithProjectSevice();
    try{
      const result = await service.execute(courseId, moduleId,sessionId,projectId);
      return res.json(result);
    }catch(err){
      return res.status(500).json({error:err.message});
    }

    
  }
}

export { CreateSessionsModulesWithProjectController};
