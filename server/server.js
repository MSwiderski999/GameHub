import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import mysql from 'mysql'
import bcrypt from 'bcrypt'

const port = 3000
const salt = 10
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors(
    {
        origin: ["http://127.0.0.1:5173"],
        methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
        credentials: true
      }
))

const db = mysql.createConnection({
    host: "192.168.144.1",
    user: "root",
    password: "",
    database: "GameHub"
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM accounts WHERE email = ?"
    db.query(sql, [req.body.email], (err, data) => {
        if (err){
            return res.json({Message: err.message})
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.json({Message: err.message})
                }
                if (response){
                    const username = data[0].username
                    const token = jwt.sign({username}, "jwt-key", {expiresIn: '10d'})
                    res.cookie('token', token)
                    return res.json({Status: "Success"})
                }
                else {
                    return res.json({Message: "Invalid password"})
                }
            })
        }else {
            return res.json({Message: "No email found in database"})
        }
    })
})

app.post('/register', (req, res) => {
    const findEmailSql = "SELECT * FROM accounts WHERE email = ?"
    const findUsernameSql = "SELECT * FROM accounts WHERE username = ?"
    const registerSql = "INSERT INTO accounts (`username`, `email`, `password`)VALUES(?)"

    db.query(findEmailSql, req.body.email, (err, data) => {
        if (err) return res.json({Message: err.message})
        if (data.length > 0) return res.json({Message: "Email already in use"})
    })
    db.query(findUsernameSql, req.body.username, (err, data) => {
        if (err) return res.json({Message: err.message})
        if (data.length > 0) return res.json({Message: "Username already in use"})
    })

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({Message: err.message})
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(registerSql, [values], (err, result) => {
            if (err) return res.json({Message: err.message})
            return res.json({Status: "Success"})
        })
    })
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`)
})