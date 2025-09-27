import express from 'express'

const PORT = 5000;

const app = express()

app.get('/', (req, res)=> {
    res.status(200).json(req.query)
})

app.listen(PORT, ()=>{console.log("SERVER STARTES ON PORT " + PORT)})