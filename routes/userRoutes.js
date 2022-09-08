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

module.exports = router