import { Request, Response } from "express";
import { CreateStudentService } from "../services/CreateStudentService";
import prismaClient from "../prisma";
class CreateStudentController {
  async handle(req: Request, res: Response) {
    const { name, email ,classNumber} = req.body;
    if (!name || !email || !classNumber)
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });

    const duplicateEmail = await prismaClient.student.count({
      where: { email },
    });

    if (duplicateEmail > 0) {
      return res.sendStatus(409); //Conflict
    }
    try {
      const service = new CreateStudentService();

      const result = await service.execute(name, email,classNumber);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export { CreateStudentController };
