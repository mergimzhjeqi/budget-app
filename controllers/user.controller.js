const userService = require('../services/user.services')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    add: async (params) => {
        const { password } = params
    
        const hashedPassword = await bcrypt.hash(password, 10)
        params.password = hashedPassword
    
        const result = await userService.insert(params)
        return result
      },


      changePassword: async(password, token)=>{
        const decoded = jwt.verify(token, 'ajsdkhasdjhaskjdhasdjh')
        userid = decoded._id
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await userService.changePassword(userid, hashedPassword)
        return result._id
      }
}