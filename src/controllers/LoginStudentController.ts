import { Request, Response } from "express";
import { LoginStudentService } from "../services/LoginStudentService";
import { CreateTokenService } from "../services/CreateTokenService";
import jwt from "jsonwebtoken";
import { DeleteTokenService } from "../services/DeleteTokenService";


const ACCESS_TOKEN_SECRET = "3be17c7406dc4904c247ab8d78d11c05";
class LoginStudentController {
  async handle(req: Request, res: Response) {
    const { id, password } = req.body;
    if (!id || !password)
      return res
        .status(400)
        .json({ message: "Identificador e/ou password errados" });

    const service = new LoginStudentService();

    const foundStudent = await service.execute(id, password);

    if (!foundStudent) return res.sendStatus(401); //Unauthorized;
    else {
      //JWT
      const accessToken = jwt.sign(
        { email: foundStudent.email, id: foundStudent.id },
        ACCESS_TOKEN_SECRET
      );

      const deleteService = new DeleteTokenService();
      await deleteService.execute(accessToken);
      const service = new CreateTokenService();
      const result = await service.execute(accessToken, foundStudent.id);
      
      res.cookie("accessToken", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json(foundStudent);
    }
  }
}

export { LoginStudentController };
