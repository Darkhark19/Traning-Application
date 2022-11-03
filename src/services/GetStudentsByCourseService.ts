import prismaClient from "../prisma";

class GetStudentsByCourseService {
  async execute(course: string) {

    
    const stCourse = await prismaClient.studentCourse.findMany({
        where:{
          courseId: course
        }
        
    });
    return stCourse;
  }
}

export { GetStudentsByCourseService };
