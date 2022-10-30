import { Request, Response } from "express";
import { LoginStudentService } from "../services/LoginStudentService";
import { CreateTokenService } from "../services/CreateTokenService";
import jwt from "jsonwebtoken";
import { DeleteTokenService } from "../services/DeleteTokenService";


const ACCESS_TOKEN_SECRET = "3be17c7406dc4904c247ab8d78d11c05";
class LoginStudentController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Identificador e/ou password errados" });

    const service = new LoginStudentService();

    const foundStudent = await service.execute(email, password);
    if (!foundStudent) return res.sendStatus(401); //Unauthorized;
    else {
      //JWT

      res.json(foundStudent);
    }
  }
}

export { LoginStudentController };
