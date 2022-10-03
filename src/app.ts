import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { router } from "./routes";
import cookieParser from "cookie-parser";
import { SendEmailService } from "./services/SendEmailService";

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};


const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(cookieParser());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected to socket ${socket.id}`);
});

const prisma = new PrismaClient();

/*app.get("/searchbyperson", async (req: Request, res: Response) => {
  const { nameToSearch } = req.body;

  const users = await prisma.user.findMany({
    where: { name: nameToSearch },
  });

  res.json(users);
});*/

export { serverHttp, io };
