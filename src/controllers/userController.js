const User = require('../models/userModel.js')

const getUser = async (req,res,next) => {
    try{
        const user = await User.getAllUsers()
        return res.status(200).json(user)
    }catch(error){
        next(error)
    }
}

const createusers = async(req,res,next) =>{
    try{
        const {username,email,password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({message: 'Missing required fields'})
        }
        const user = await User.createuser({username,email,password})
        return res.status(201).json(user)
    }catch(error){
        next(error)
    }
}

module.exports = {
    getUser,
    createusers
}