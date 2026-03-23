/**
 * Run: node scripts/generateHash.js <yourPassword>
 * Copy the output into ADMIN_PASSWORD_HASH in your .env file
 */
const bcrypt = require('bcrypt')
const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/generateHash.js <password>')
  process.exit(1)
}

bcrypt.hash(password, 12).then((hash) => {
  console.log('Add this to your .env file:')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
})
