import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_secret = "this_is_secrete_code"

export const authenticateUser = ()=>{
    
}


export const registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

    const user = await userModel.findOne({ email: req.body.email })

      

    if (!user) {

        try {
            const user = new userModel({
                username: req.body.username,
                password: secpass,
                email: req.body.email
            })
            await user.save()
           
            var token = jwt.sign({user:user.username},JWT_secret)
            res.status(200).json({token:token,user:user,msg:"Logged in Successfully"})
            // console.log(token)

        } catch (error) {
            res.status(403).json({msg:"username already exists"})
        }
    } else {
        res.status(400).json({ msg: "Please Login! User already exists" })
    }


}




export const loginUser = async (req, res) => {

    try {
        const user = await userModel.findOne({ username: req.body.username })

        const match = await bcrypt.compare(req.body.password, user.password)


        if (user && match) {

            // res.status(200).json({ msg: "User logged in successfully", user: user })
            var token = jwt.sign({user:user.username},JWT_secret)
            res.status(200).json({token:token,user:user,msg:"Logged in Successfully"})

        } else {
            res.status(400).json({ msg: "Invalid username or password" })
        }

    } catch (error) {
        res.status(400).json({ msg: "User doesnot exist. Please register first" })

    }





}
export const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (user) {

            res.status(200).json({ msg: "User updated in successfully", user: user })

        } else {
            res.status(400).json({ msg: "couldnot update user. Please try again later" })
        }

    } catch (error) {
        res.status(400).json({ msg: "User doesnot exist. Please register first" })

    }


}
export const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)

        if (user) {

            res.status(200).json({ msg: "User deleted successfully" })

        } else {
            res.status(400).json({ msg: "user does not exist" })
        }

    } catch (error) {
        res.status(400).json({ msg: "User doesnot exist. Please register first" })

    }

}



export const fetchAllUser = async (req, res) => {
    try {
        const user = await userModel.find()

        if (user) {

            res.status(200).json(user)

        } else {
            res.status(400).json({ msg: "user does not exist" })
        }

    } catch (error) {
        res.status(400).json({ msg: "User doesnot exist. Please register first" })

    }

}