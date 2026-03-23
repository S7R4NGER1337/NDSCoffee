require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const { getSessionToken } = require('../middleware/auth')

const adminName = process.env.ADMIN_USERNAME
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

router.post('/login', async (req, res) => {
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).json({ error: 'Username and password are required.' })
  }

  if (!adminName || !adminPasswordHash) {
    return res.status(500).json({ error: 'Server not configured.' })
  }

  if (name !== adminName) {
    return res.status(401).json({ error: 'Invalid credentials.' })
  }

  const isValid = await bcrypt.compare(password, adminPasswordHash)
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials.' })
  }

  res.json({ token: getSessionToken() })
})

module.exports = router
