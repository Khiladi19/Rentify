import { Router } from "express";
import { isLoggedIn } from '../middlewares/auth.middleware.js'
// function import from controllers
import { registgerUser , loginUser,logoutUser} from "../controllers/user.controller.js";
registgerUser
const router = Router();


// url of router 
router.post("/reguser",registgerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);


export default router;