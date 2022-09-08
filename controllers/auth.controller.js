const userService = require('../services/user.services')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jashdajskhdaksjhdaskjh'

module.exports = {
    login:  async(params) => {
            const {email, password} = params
            console.log(params);
            
            const user = await userService.findByEmail(email)
            console.log(user  );

            if(!user) {
                throw Error('This email doesnt exist')
            }
            
            const matchPassword = await bcrypt.compare(password, user.password)
            if (!matchPassword){
                throw Error('Wrong password')

            }

            const token = jwt.sign({_id: user._id}, JWT_SECRET)
            console.log(token);
            return {
                token,
                userid: user.id,
                name: user.name,
                email: user.email
            }
            
    }


}