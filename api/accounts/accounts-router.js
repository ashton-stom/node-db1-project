const router = require('express').Router()
const accounts = require('./accounts-model.js')
const middleware = require('./accounts-middleware.js')

router.get('/', async (req, res, next) => {
  const accs = await accounts.getAll()
  res.status(200).json( accs )
})

router.get('/:id', middleware.checkAccountId, async (req, res, next) => {
  const foundAccount = await accounts.getById(req.params.id)
  res.status(200).json( foundAccount )
})

router.post('/', middleware.checkAccountPayload, middleware.checkAccountNameUnique, async (req, res, next) => {
  const createdAccount = await accounts.create(req.body) 
  res.status(201).json( createdAccount )
})

router.put('/:id', middleware.checkAccountId, middleware.checkAccountPayload, async (req, res, next) => {
  const updatedAccount = await accounts.updateById(req.params.id)
  res.status(200).json( updatedAccount )
});

router.delete('/:id', middleware.checkAccountId, async (req, res, next) => {
  const deleted = await accounts.deleteById(req.params.id)
  res.status(200).json( deleted )
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
