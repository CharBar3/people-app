// Dependencies 
const express = require('express')
// import express from 'express'
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
// import mongoose from 'mongoose'

// Initialize the express app
const app = express()

// configure app settings
require('dotenv').config()

// const PORT = process.env.PORT
const {PORT = 3000, MONGODB_URL} = process.env

// connect to mongoDB
mongoose.connect(MONGODB_URL)

// mongoose status listeners
mongoose.connection
.on('connected', () => console.log('connected to MongoDB'))
.on('error', (err) => console.log(`error with MongoDB: ${err.message}`));

// setup model
const peopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
}, {timestamps: true})

const People = mongoose.model('People', peopleSchema)

// mount middleware 
app.use(cors()) // Access-Conctol-Allow: '*'
app.use(morgan('dev'))
app.use(express.json()) // this creates req.body
// app.use(express.urlencoded({extended: false})) ONLY WORKS WHEN EXPRESS IS SERVING HTML

// mount routes
app.get('/', (req, res) => {
    res.send('/ route')
})

// Index
app.get('/people', async (req, res) => {
    try {
        const people = await People.find({})
    res.json(people)
    } catch (error) {
        console.log(`Error: ${error}`)
        res.json({error: 'something went wrong - check console'})
    }
})

// Create
app.post('/people', async (req, res) => {
    try {
        const person = await People.create(req.body);
        res.json(person)
    } catch (error) {
        console.log(`Error: ${error}`)
        res.json({error: 'something went wrong - check console'})
    }
})

// Update
app.put('/people/:id', async (req, res) => {
    try {
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch (error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong - check console'})
    }
})

// Delete
app.delete('/people/:id', async (req, res) => {
    try {
        res.json(await People.findByIdAndDelete(req.params.id))
    } catch (error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong - check console'})
    }
})

// tell express to listen
app.listen(PORT, () => {
    console.log(`Express is listening on PORT:${PORT}`)
})