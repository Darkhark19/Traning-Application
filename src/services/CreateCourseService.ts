import { User } from "@prisma/client";
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider";
import prismaClient from "../prisma";

class CreateCourseService {
  async execute(name: string, subject: string, ownerId: string) {
    const course = await prismaClient.course.create({
      data: {
        name,
        subject,
        owner: {
          connect: {
              id: ownerId,
          },
          
        },
      },

      include:{
        owner: true,
      }
    });
   return course;
  }
}

export { CreateCourseService };
