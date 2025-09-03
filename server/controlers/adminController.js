require('dotenv').config()
const router = require('express').Router()
const adminName = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD


router.post('/login', async (req,res) => {
    let isAuthenticated = false
    const {name, password} = req.body
    
    if(name === adminName && password === adminPassword) isAuthenticated = true

    res.json(isAuthenticated)
    res.end()
})

module.exports = router