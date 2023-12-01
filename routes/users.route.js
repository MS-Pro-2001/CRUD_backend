
import express from "express"
import { deleteUser, fetchAllUser, loginUser, registerUser, updateUser } from "../controllers/user.controller.js"


const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)
router.get("/fetchall",fetchAllUser)


export default router;
