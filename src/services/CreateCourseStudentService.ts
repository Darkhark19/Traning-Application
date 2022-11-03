import prismaClient from "../prisma";


class CreateCourseStudentService {
  async execute(courseId: string, studentId: string) {
    const session = await prismaClient.studentCourse.create({
      data:{
        courseId,
        studentId
      },
      include: {
        Course: true,
        Student: true,
      },
    });
    

    return session;
  }
}

export { CreateCourseStudentService };
