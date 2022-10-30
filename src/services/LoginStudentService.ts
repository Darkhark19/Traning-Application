import prismaClient from "../prisma";


class LoginStudentService {
  async execute(email: string, password: string) {
    const student = await prismaClient.student.findFirst({
      where: { 
        email: email, 
        password : password
      },
    });
    console.log(student)
    console.log("login serivce")
    return student;
  }
}

export { LoginStudentService };
