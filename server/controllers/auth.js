import {Router} from "express";
import bcrypt from "bcryptjs";
import User from "../middlewares/user.js"; // Adjust the path as necessary

const auth = Router();


auth.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            return res.status(400).json({message: "Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        return res.status(201).json({message: "User registered successfully"});
        
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({message: "Internal server error"});
        
    }

})

auth.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {    
            return res.status(404).json({message: "User not found"});
        }   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }   
        return res.status(200).json({message: "Login successful", user: {name: user.name, email: user.email}});
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({message: "Internal server error"});
    }
})


auth.put('/update', async (req, res) => {
    const {email, name, password} = req.body;
    try {
        const user = await User.findOne({email });
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        if(!email || !name || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.name = name;
        user.password = hashedPassword;
        user.email = email; // Update email if provided
        // Save the updated user 

        await user.save();
        return res.status(200).json({message: "User updated successfully", user: {name: user.name, email: user.email, password: user.password}});
    } catch (error) {
        console.error("Error during user update:", error);
        return res.status(500).json({message: "Internal server error"});
    }
})

auth.delete('/delete', async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOneAndDelete({email});
        if (!user) {
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {   
        console.error("Error during user deletion:", error);
        res.status(500).json({message: "Internal server error"});
    }
})

export default auth; // Export the auth router