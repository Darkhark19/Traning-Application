import prismaClient from "../prisma";



class GetSessionsModulesService {
    async execute(id: string) {
        const now = new Date().getTime();
        const sessionDuration = new Date(now - (1.5 *60 * 60 * 1000));
        const stSessions = await prismaClient.sessionsModules.findMany({ 
            take: 10,
            orderBy:{
                session: {
                    created_at: 'desc',
                }
            },
            where:{
                session:{
                    studentId: id,
                    created_at:{
                        gte: sessionDuration,
                        lte: new Date(),
                    }
                },
            },
            include:{
                session: true,
                module: true,
            }
            
        });
        return stSessions;
    }
  }
  
  export { GetSessionsModulesService };
  