import prismaClient from "../prisma";

import { io } from "../app";

class CreateSessionService {
  async execute(coorId: string, cId: string) {

    const session = await prismaClient.session.create({
      data: {
          coordinatorId :  coorId,
          courseId: cId,
        
    },
      include:{
        coordinator : true,
        course: true,
      },
    }).catch((error) => {console.log(error)});
    
  

    return session;
  }
}

export { CreateSessionService };
