import { Request, Response } from "express";
import { RegisterService } from "../services/RegisterService";
import prismaClient from "../prisma";
class RegisterController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });

    const duplicateEmail = await prismaClient.user.count({
      where: { email },
    });

    if (duplicateEmail > 0) {
      return res.sendStatus(409); //Conflict
    }
    try {
      const service = new RegisterService();

      const result = await service.execute(name, email, password);

      res.json({ success: `New user with email ${email}  ${result.id} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export { RegisterController };
