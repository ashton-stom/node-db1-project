const db = require('../../data/db-config.js')


const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts").where("id", id).first()
}

const getByName = name => {
  return db("accounts").where("name", name).first()
}

const create = async account => {
  return db("accounts").insert(account)
}

const updateById = async (id, account) => {
  return db("accounts").where("id", id).update(account)
}

const deleteById = async id => {
  return db("accounts").where("id", id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
}
