import prismaClient from "../prisma";

class GetStudentsByUserService {
  async execute(userId: string) {
    const stCourse = await prismaClient.student.findMany({
        where:{
          stCourse :{
            some :{
                Course: {
                    ownerId : userId
                }
            }
          }
        },
        include:{
            Session: {
              include: {
                stModules: {
                  include: {
                    module: {
                      include: {
                        course: true
                      }
                    }
                  }
                }
              }  
            }
        }
        
    });
    return stCourse;
  }
}

export { GetStudentsByUserService };
