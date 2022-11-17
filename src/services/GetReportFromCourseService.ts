import prismaClient from "../prisma";

class GetReportFromCourseService {
  async execute(courses: string[]) {
    const result = await prismaClient.course.findMany({
      where: {
        id: {in: courses}
      },
      orderBy: {
        name: "desc",
      },
     include:{
        modelus:{
          include: {
            stModules: {
              include:{
                session : {
                  include: {
                    students: true
                  }
                },
              } 
            }
          },
          
        }
     }
    });

    return result;
  }
}

export { GetReportFromCourseService };
