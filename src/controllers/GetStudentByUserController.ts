import { Request, Response } from "express";
import { GetStudentsByUserService } from "../services/GetStudentsByUserService";

class GetStudentByUserController {
  async handle(req: Request, res: Response) {
    const {userId} = req.body;
    const service = new GetStudentsByUserService();

    const result = await service.execute(userId);
    if( result.length == 0){
        alert("Utilizador sem alunos")
    }
    return res.json(result);
  }
}

export { GetStudentByUserController };
