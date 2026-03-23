const crypto = require('crypto')

// Session token generated once per server start — invalidated on restart
const SESSION_TOKEN = crypto.randomBytes(32).toString('hex')

function getSessionToken() {
  return SESSION_TOKEN
}

function requireAuth(req, res, next) {
  const token = req.headers['x-admin-token']
  if (!token || token !== SESSION_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

module.exports = { requireAuth, getSessionToken }
