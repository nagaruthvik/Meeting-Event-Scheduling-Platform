import express from "express";
import errorLogger from "../middlewares/errorHandling.js";
import mongoose from "mongoose";
import userModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const routes = express.Router();
 
routes.get("/:id", errorLogger,async(req, res) => {
    try {

        const id = req.params.id;

        if(!id){
            return res.status(404).json({ message: "User not found" });  
        }
        const findUser = await userModel.findById(id)
        if(!findUser){
            return res.status(404).json({ message: "User not found" });  
        }
        const result = findUser
        res.status(200).json({result:result}) 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


routes.get("/email/:id", errorLogger,async(req, res) => {
    try {

        const id = req.params.id;

        if(!id){
            return res.status(404).json({ message: "User not found" });  
        }
        const findUser = await userModel.findOne({email : id});
        if(!findUser){
            return res.status(404).json({ message: "User not found" });  
        }
        const result = findUser
        
        res.status(200).json({message:"User found" , id:findUser._id, username:findUser.userName})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

routes.post("/signup", errorLogger, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const findEmail = await userModel.findOne({ email });

        if (findEmail) {
            return res.status(409).json({ message: "Email already in use"}); 
        }

        const hashPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });  
    }
});

routes.post("/signin", errorLogger, async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await userModel.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ message: "User not found" });  
        }

        const passwordCompare = await bcrypt.compare(password, findUser.password);
        if (!passwordCompare) {
            return res.status(400).json({ message: "Incorrect email or password" });  
        }
 
        const token = jwt.sign(
            { userId: findUser._id, email: findUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(200).json({ message: "Login successful", id : findUser._id });  

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

routes.put("/update/:id", errorLogger, async (req, res) => {
    try {
        const { events } = req.body; 
        const id = req.params.id;

        const userData = await userModel.findById(id);
        if (!userData) {
            return res.status(401).json({ message: "No user Found" });
        }

        const result = await userModel.findByIdAndUpdate(
            id,
            { $push: { events: { $each: events } } }, 
            { new: true }
        );

        res.status(201).json({ message: "successful", result });

    } catch (error) {
        errorLogger(error, req, res);
    }
});
routes.put("/updateUser/:id", errorLogger, async (req, res) => {
    try {
        let data = req.body;
        const id = req.params.id;

        
        const userData = await userModel.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "No user found" });
        }

        
        if ("password" in data) {
            const hashPassword = bcrypt.hashSync(data.password, parseInt(process.env.BCRYPT_SALT));
            data.password = hashPassword;
        }

        
        const result = await userModel.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({ message: "Update successful", result });

    } catch (error) {
        errorLogger(error, req, res);
        res.status(500).json({ message: "Server error", error });
    }
});


routes.put("/availability/:id", errorLogger, async (req, res) => {
    try {
        const id = req.params.id;
        const availabilityArray = req.body;  

        

        const findUser = await userModel.findById(id);
        if (!findUser) {
            return res.status(404).json({ message: "No user found" });
        }


        availabilityArray.forEach(({ day, timeSlots }) => {
            const existingDay = findUser.availability.find(avail => avail.day === day);
            if (existingDay) {
                existingDay.timeSlots = timeSlots;
            } else {
                findUser.availability.push({ day, timeSlots });
            }
        });

        await findUser.save();
        res.status(200).json({ message: "Availability updated", availability: findUser.availability });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    } 
});


export default routes;
