const usersModel = require('../models/User')
const userModel = require('../models/User')

module.exports = {
  insert: async (values) => {
    const result = await usersModel.create(values)
    return result
  },
  findByEmail: async (email
    ) => {
    const result = await usersModel.findOne({email}).exec()
    return result
  },
  changePassword: async(id, password)=> {
    const result = await userModel.findByIdAndUpdate(id, {password}).exec()
    return result
  }

}