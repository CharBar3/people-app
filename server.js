// Dependencies 
import express from 'express'

// Initialize the express app
const app = express()

// configure app settings
require('dotenv').config()

// const PORT = process.env.PORT
const {PORT = 4000, MONGODDB_URL} = proces.env

// mount middleware 

// mount routes
app.get('/', (req, res) => {
    res.send('/ route')
})

// tell express to listen

app.listen(PORT, () => {
    console.log(`Express is listening on PORT:${PORT}`)
})