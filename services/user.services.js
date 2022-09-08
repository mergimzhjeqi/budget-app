const usersModel = require('../models/User')

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

}