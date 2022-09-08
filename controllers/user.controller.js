const userService = require('../services/user.services')
const bcrypt = require('bcrypt')

module.exports = {
    add: async (params) => {
        const { password } = params
    
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT))
        params.password = hashedPassword
    
        const result = await userService.insert(params)
        return result
      },
}