const express = require('express')
const app = express()

app.get('/', function (req, res) {
    return res.json(`oi`)
})

app.listen(3000)
