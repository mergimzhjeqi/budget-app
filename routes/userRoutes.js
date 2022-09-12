const express = require('express')
const User = require('../models/User')
const userController = require('../controllers/user.controller')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/login', async(req, res) => {
    try {
        
        // const result = await User.findOne({ email: req.body.email, password: req.body.password })
        const result = await authController.login(req.body)
        
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/register', async(req, res) => {
    try {
        const newUser = await userController.add(req.body)

        res.json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/forgot-password', async(req,res) => {
    
    
    try {
        const result = await authController.forgotPassword(req.body)
        res.json(result)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/reset-password',async(req, res)=>{ 
    // const token = 
    const result = req.body.headers.Authorization
    const token = result.split(' ')[1]
    console.log(token)

    console.log(req.body.data);
    
    try {
        const result = await userController.changePassword(req.body.data, token)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router