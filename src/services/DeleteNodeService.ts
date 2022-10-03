import prismaClient from "../prisma";
class DeleteNodeService {
    async execute(id: string) {
      const node = await prismaClient.node.delete({
        where:{
            id,
        },
      });
  
      return node;
    }
  }
  
  export { DeleteNodeService };
