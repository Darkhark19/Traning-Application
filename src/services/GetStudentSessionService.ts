import prismaClient from "../prisma";



class GetStudentSessionService {
    async execute(studentId: string) {
        const stSessions = await prismaClient.studentSession.findMany({ 
            take: 10,
            orderBy:{
                session: {
                    created_at: 'desc',
                }
            },
            where:{
                studentId: {
                    equals: studentId,
                },
                
            },
            include:{
                session: true,
                student: true,
            }
            
        });
        return stSessions;
    }
  }
  
  export { GetStudentSessionService };
  