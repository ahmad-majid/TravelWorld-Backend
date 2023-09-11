import express  from "express";
import { updateUser,deleteUser,getSingleUser,getAllUser } from "../Controller/userController.js";
const  router = express.Router();

import {verifyAdmin, verifyUser} from "../utils/verifyToken.js";
 
//update new User
router.put("/:id", verifyUser, updateUser);

//delete User
router.delete("/:id",verifyUser,deleteUser);

//getSingleUser
router.get("/:id",verifyUser, getSingleUser);

//getALl User
router.get("/",verifyAdmin,getAllUser);

export default router;