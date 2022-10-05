import { Router } from "express";

import { GetUserController } from "./controllers/GetUserController";
import { GetUserIdFromTokenController } from "./controllers/GetUserIdFromTokenController";
import { LoginController } from "./controllers/LoginController";
import { LoginStudentController } from "./controllers/LoginStudentController";

import { RegisterController } from "./controllers/RegisterController";

import { validateToken } from "./middleware/Authenticate";
import { GetCoursesController } from "./controllers/GetCoursesController";
import { GetStudentsController } from "./controllers/GetStudentsController";


const router = Router();

//router.post("/register", new RegisterController().handle);


router.post("/login", new LoginController().handle);
router.post("/aluno-login", new LoginStudentController().handle);
router.post("/id-from-token", new GetUserIdFromTokenController().handle);


router.post("/users", new GetUserController().handle);


router.get("/courses",new GetCoursesController().handle);
router.get("/students",new GetStudentsController().handle);
router.get("/validate-token", validateToken);


export { router };
