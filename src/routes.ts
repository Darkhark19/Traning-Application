import { Router } from "express";

import { GetUserController } from "./controllers/GetUserController";
import { GetUserIdFromTokenController } from "./controllers/GetUserIdFromTokenController";
import { LoginController } from "./controllers/LoginController";

import { RegisterController } from "./controllers/RegisterController";

import { validateToken } from "./middleware/Authenticate";


const router = Router();

//router.post("/register", new RegisterController().handle);


router.post("/login", new LoginController().handle);


router.post("/id-from-token", new GetUserIdFromTokenController().handle);


router.get("/validate-token", validateToken);

router.post("/users", new GetUserController().handle);



export { router };
