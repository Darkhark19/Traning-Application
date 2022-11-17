import { Request, Response } from "express";
import { GetReportFromCourseService } from "../services/GetReportFromCourseService";
class GetReportFromCourseController{
  async handle(req: Request, res: Response) {
    const {courses} = req.body;

    const service = new GetReportFromCourseService();
    const result = await service.execute(courses);
    if(result.length ==0){
        alert("Não existe entradas")
    }
    return res.json(result);
  }
}

export { GetReportFromCourseController };
