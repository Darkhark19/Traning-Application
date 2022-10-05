import { Request, Response } from "express";
import prismaClient from "../prisma";
import { LoginService } from "../services/LoginService";
import jwt from "jsonwebtoken";
import { CreateTokenService } from "../services/CreateTokenService";

const ACCESS_TOKEN_SECRET = "3be17c7406dc4904c247ab8d78d11c05";
class LoginController {
  async handle(req: Request, res: Response) {
    const { id, password } = req.body;
    if (!id || !password)
      return res
        .status(400)
        .json({ message: "Identificador e/ou password errados" });

    const service = new LoginService();

    const foundUser = await service.execute(id, password);

    if (!foundUser) return res.sendStatus(401); //Unauthorized;
    else {
      //JWT
      const accessToken = jwt.sign(
        { email: foundUser.email, id: foundUser.id },
        ACCESS_TOKEN_SECRET
      );

      const service = new CreateTokenService();

      const result = await service.execute(accessToken, foundUser.id);
      console.log(result);
      res.cookie("accessToken", accessToken, {
        maxAge: 48 * 60 * 60 * 1000,
      });
      res.json("Success");
    }
  }
}

export { LoginController };
