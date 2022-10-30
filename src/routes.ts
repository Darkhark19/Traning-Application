import { Router } from "express";

import { GetUserController } from "./controllers/GetUserController";
import { GetUserIdFromTokenController } from "./controllers/GetUserIdFromTokenController";
import { LoginController } from "./controllers/LoginController";
import { LoginStudentController } from "./controllers/LoginStudentController";

import { RegisterController } from "./controllers/RegisterController";

import { validateToken } from "./middleware/Authenticate";
import { GetCoursesController } from "./controllers/GetCoursesController";
import { GetStudentsController } from "./controllers/GetStudentsController";
import { CreateSessionController } from "./controllers/CreateSessionController";
import { CreateStudentSessioController } from "./controllers/CreateStudentSessionController";
import { CreateSessionsModulesController } from "./controllers/CreateSessionsModulesController";
import { CreateCourseController } from "./controllers/CreateCourseController";
import { CreateModuleController } from "./controllers/CreateModuleController";
import { GetModulesController } from "./controllers/GetModulesController";
import { GetStudentsByCourseController } from "./controllers/GetStudentsByCourseController";
import { CreateStudentController } from "./controllers/CreateStudentController";

const router = Router();

router.post("/register", new RegisterController().handle);
router.post("/login", new LoginController().handle);
router.post("/aluno-login", new LoginStudentController().handle);

router.post("/create-student", new CreateStudentController().handle);
router.post("/create-session", new CreateSessionController().handle);
router.post("/create-course" , new CreateCourseController().handle);
router.post("/create-module", new CreateModuleController().handle);
//router.post("/link-student-course", new CreateStudentSessioController().handle);
router.post("/create-ssModules", new CreateSessionsModulesController().handle)

router.post("/modules", new GetModulesController().handle);
router.post("/id-from-token", new GetUserIdFromTokenController().handle);
router.post("/users", new GetUserController().handle);
//router.post("/student-session", new GetStudentSessionController().handle);
router.post("/studentsCourse", new GetStudentsByCourseController().handle)

router.get("/courses",new GetCoursesController().handle);
router.get("/students",new GetStudentsController().handle);
router.get("/validate-token", validateToken);


export { router };
