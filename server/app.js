import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mysql from 'mysql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const salt = 10
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:5173"],
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

app.post('/accounts/:id', (req, res) => {
    const sql = "SELECT username AS username FROM accounts WHERE id = ?"
    const values = [req.params.id]
    db.query(sql, values, (err, data) => {
        if(err) res.json({Message: err})
        else if(data.length > 0){
            res.status(200)
            res.send(data[0].username)
        }
        else{
            res.status(404).send()
        }
    })
})

app.post('/profile/games-played-grouped/:id', (req, res) => {
    const values =[req.params.id]
    const sql = "SELECT COUNT(*) AS `Played`, name AS `Game` FROM gameplays gp JOIN games g ON g.id = gp.game_id WHERE gp.account_id = ? GROUP BY 2 ORDER BY 1 DESC"
    db.query(sql, values, (err, data) => {
        if(err){
            res.json({Message: err.message})
        }
        else{
            res.json({gamesPlayedGrouped: data})
        }
    })
})

app.post('/profile/games-played/:id', (req, res) => {
    const values = [req.params.id]
    const sql = "SELECT COUNT(*) AS `Played` FROM gameplays WHERE account_id = ?"
    db.query(sql, values, (err, data) => {
        if(err){
            res.json({Message: err.message})
        }
        else{
            res.json({gamesPlayed: data[0].Played})
        }
    })
})

app.get('/memory/leaderboard/time', (req, res) => {
    const sql = "SELECT SUBSTRING(score, 1, 2) AS minutes, SUBSTRING(score, 4, 2) AS seconds, username FROM gameplays g JOIN accounts a ON a.id = g.account_id WHERE g.game_id = 2 ORDER BY 1, 2 LIMIT 10"
    db.query(sql, (err, data) => {
        if(err){
            res.json({Message: err.message})
        }
        else{
            res.json({table: data, status: "Success"})
        }
    })
})

app.get('/memory/leaderboard/turns', (req, res) => {
    const sql = "SELECT SUBSTRING(score, 7) AS turns, username FROM gameplays g JOIN accounts a ON a.id = g.account_id WHERE g.game_id = 2 ORDER BY 1 LIMIT 10"
    db.query(sql, (err, data) => {
        if(err){
            res.json({Message: err.message})
        }
        else{
            res.json({table: data, status: "Success"})
        }
    })
})

app.post('/memory', (req, res) => {
    const values = [
        req.body.user.toString(),
        "2",
        `${req.body.minutes}:${req.body.seconds},${req.body.turns + 1}`
    ]
    const sql = `INSERT INTO gameplays(account_id, game_id, score) VALUES(?)`
    db.query(sql, [values], (err) => {
        if(err) res.json({Message: err})
        else return res.json({"status": "Success"})
    })
})

app.get('/candy-crush/leaderboard', (req, res) => {
    const sql = "SELECT username AS username, score AS score FROM accounts a JOIN gameplays g ON a.id = g.account_id WHERE g.game_id = 3 ORDER BY 2 DESC, 1 LIMIT 10"
    db.query(sql, (err, data) => {
        if (err) {
            res.json({Message: err.message})
        }
        else {
            res.json({table: data, status: "Success"})
        }
    })
})

app.post('/candy-crush', (req, res) => {
    const values = [
        req.body.user.toString(),
        "3",
        req.body.score
    ]
    const sql = `INSERT INTO gameplays(account_id, game_id, score) VALUES(?)`

    db.query(sql, [values], (err) => {
        if (err) res.json({Message: err})
        else return res.json({"status": "Success"})
    })
})

app.post('/uno', (req, res) => {
    const values = [
        req.body.user,
        "1",
        req.body.score + "," + req.body.place + "," + req.body.mode
    ]
    const sql = `INSERT INTO gameplays(account_id, game_id, score) VALUES(?)`

    db.query(sql, [values], (err) => {
        if (err) res.status(500).json({Message: err})
        else res.status(201).send()
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM accounts WHERE email = ?"
    db.query(sql, [req.body.email], (err, data) => {
        if (err){
            return res.status(500).json({Message: err.message})
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    return res.status(500).json({Message: err.message})
                }
                if (response){
                    res.cookie('login_token', jwt.sign({id: data[0].id}, "jwt-secret-key"))
                    return res.status(202).json({Status: "Success"})
                }
                else {
                    return res.status(401).json({Message: "Invalid password"})
                }
            })
        }else {
            return res.status(404).json({Message: "No email found in database"})
        }
    })
})

app.post('/logout',(req, res) => {
    res.clearCookie('login_token')
    res.json({Status: "Success"})
})

app.post('/register', (req, res) => {
    const findEmailSql = "SELECT * FROM accounts WHERE email = ?"
    const findUsernameSql = "SELECT * FROM accounts WHERE username = ?"
    const registerSql = "INSERT INTO accounts (`username`, `email`, `password`)VALUES(?)"

    db.query(findEmailSql, req.body.email, (err, data) => {
        if (err) return res.status(500).json({Message: err.message})
        if (data.length > 0) return res.status(409).json({Message: "Email already in use"})
    })
    db.query(findUsernameSql, req.body.username, (err, data) => {
        if (err) return res.status(500).json({Message: err.message})
        if (data.length > 0) return res.status(409).json({Message: "Username already in use"})
    })

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.status(500).json({Message: err.message})
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]

        db.query(registerSql, [values], (err, result) => {
            if (err) return res.status(500).json({Message: err.message})
            return res.status(201).json({Status: "Success"})
        })
    })
})

export default app