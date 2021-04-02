const accounts = require('./accounts-model.js')

exports.checkAccountPayload = (req, res, next) => {
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof req.body.name != "string") {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (!req.body.length >= 3 && !req.body.length <= 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof req.body.budget != "number") {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (!req.body.budget >= 0 || !req.body.budget <= 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const account = await accounts.getByName(req.body.name)
  if (account) {
    res.status(400).json({ message: "that name is taken" })
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await accounts.getById(req.params.id)
  if (!account) {
    res.status(404).json({ message: "account not found" })
  } else {
    req.account = account
    next()
  }
}
