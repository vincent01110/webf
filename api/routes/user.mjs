import express from "express";
import jwt from "jsonwebtoken";
import { isPwCorrect } from "../calculations.mjs";
import { isAdmin, canSignIn } from "../database.mjs";

const userRouter = express.Router()

userRouter.post('/signin', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const hash = await canSignIn(email)
        if (!(hash === undefined)) {
            const answ = await isPwCorrect(password, hash.password)
            const admin = await isAdmin(email)
            if (admin.isAdmin == 1 && hash.password && answ) {
                const jwtToken = jwt.sign({ email: email }, "SUPER_SECRET_KEY")
                res.json({ email: email, token: jwtToken })
            } else {
                res.status(401).send("Login credentials are not correct.")
            }
        } else {
            res.status(401).send("User not found")
        }

    } catch (error) {
        writeToLogFile(`/user/admin/signin -> Error: ${error}`);
        res.status(500).send("Internal server error-server: " + error)
    }
})



export {userRouter}