import request from "supertest"
import app from "./app"
import { response } from "express"

describe("App tests", () => {
    /**
     * Testing searching up a username by ID
     */
    describe("POST /accounts/:id", () => {
        it("Should return status 200 and `nikolai` username", (done) => {
            request(app)
                .post("/accounts/2")
                .expect("nikolai")
                .expect(200, done)
        })
        it("Should return status 404", (done) => {
            request(app)
                .post("/accounts/0")
                .expect(404, done)
        })
    })

    /**
     * Testing searching for played games grouped by game
     */
    describe("POST /profile/games-played-grouped/:id", () => {
        it("Should return status 200 and number of games played", (done) => {
            request(app)
                .post("/profile/games-played-grouped/2")
                .expect(200)
                .then(res => {
                    expect(res.body.gamesPlayedGrouped.length).toStrictEqual(2)
                })
                done()
        })
    })

    /**
     * Testing searching for played games
     */
    describe("POST /profile/games-played/:id", () => {
        it("Should return status 200 and number", (done) => {
            request(app)
                .post("/profile/games-played/2")
                .expect(200)
                .then(res => {
                    expect(typeof res.body.gamesPlayed).toStrictEqual("number")
                })
                done()
        })
    })

    /**
     * Testing memory leaderboard by time
     */
    describe("GET /memory/leaderboard/time", () => {
        it("Should return 10 element array sorted by time and status 200", (done) => {
            request(app)
                .get("/memory/leaderboard/time")
                .expect(200)
                .then(res => {
                    expect(res.body.table.length).toStrictEqual(10)
                })
                done()
        })
    })

    /**
     * Testing memory leaderboard by turns
     */
    describe("GET /memory/leaderboard/turns", () => {
        it("Should return 10 element array and status 200", (done) => {
            request(app)
                .get("/memory/leaderboard/turns")
                .expect(200)
                .then(res => {
                    let table = res.body.table
                    let sorted = true
                    for(let i = 1; i < table.length; i++){
                        if(table[i - 1] > table[i]){
                            sorted = false
                            break
                        }
                    }

                    expect(table.length).toStrictEqual(10)
                    expect(sorted).toStrictEqual(true)
                })
                done()
        })
    })

    /**
     * Testing inserting a score into memory leaderboards
     */
    describe("POST /memory", () => {
        it("Should increase number of scores and return 201", (done) => {
            const values = {
                user: 2,
                minutes: "99",
                seconds: "59",
                turns: 999
            }
            request(app)
                .post("/memory")
                .send(values)
                .expect(201)
                done()
        })
    })

    /**
     * Testing fetching candy crush leaderboard
     */
    describe("GET /candy-crush/leaderboard", () => {
        it("Should return 10 element array and status 200", (done) => {
            request(app)
                .get("/candy-crush/leaderboard")
                .expect(200)
                .then(res => {
                    let table = res.body.table
                    let sorted = true
                    for(let i = 1; i < table.length; i++){
                        if(table[i - 1] < table[i]){
                            sorted = false
                            break
                        }
                    }

                    expect(table.length).toStrictEqual(10)
                    expect(sorted).toStrictEqual(true)
                })
                done()
        })
    })

    /**
     * Testing inserting a score into candy-crush leaderboard
     */
    describe("POST /candy-crush", () => {
        it("Should increase number of scores and return 201", (done) => {
            const values = {
                user: 2,
                score: 0
            }
            request(app)
                .post("/memory")
                .send(values)
                .expect(201)
                done()
        })
    })

    /**
     * Testing inserting a score into uno leaderboard
     */
    describe("POST /candy-crush", () => {
        it("Should increase number of scores and return 201", (done) => {
            const values = {
                user: 2,
                score: 0
            }
            request(app)
                .post("/memory")
                .send(values)
                .expect(201)
                done()
        })
    })

    /**
     * Testing inserting uno score into gameplays 
     */
    describe("POST /uno", () => {
        it("Should increase number of scores and return 201", (done) => {
            const values = {
                user: 2,
                score: 0,
                place: 0,
                mode: "none"
            }
            request(app)
                .post("/uno")
                .send(values)
                .expect(201)
                done()
        })
    })

    /**
     * Testing login attempt
     */
    describe("POST /login", () => {
        it("Should return 202 and Status: Success", (done) => {
            const values = {
                password: "test1234",
                email: "test@gmail.com"
            }
            request(app)
                .post("/login")
                .send(values)
                .expect(202)
                .then(res => {
                    expect(res.body.Status).toStrictEqual("Success")
                })
                done()
        })
        it("Should return 401 and Invalid password message", (done) => {
            const values = {
                password: "ogorkikiszone",
                email: "test@gmail.com"
            }
            request(app)
                .post("/login")
                .send(values)
                .expect(402)
                .then(res => {
                    expect(res.body.Message).toStrictEqual("Invalid password")
                })
                done()
        })
        it("Should return 404 and no email found message", (done) => {
            const values = {
                password: "test1234",
                email: "tset@ligma.moc"
            }
            request(app)
                .post("/login")
                .send(values)
                .expect(404)
                .then(res => {
                    expect(res.body.Message).toStrictEqual("No email found in database")
                })
                done()
        })
    })

    /**
     * Testing logout
     */
    describe("POST /logout", () => {
        it("Should send Status Success and 200", (done) => {
            request(app)
                .post("/logout")
                .expect(200)
                .then(res => {
                    expect(res.body.Status).toStrictEqual("Success")
                })
                done()
        })
    })

    /**
     * Testing register attempt
     */
    describe("POST /register", () => {
        it("Should return 409 and message email in use", (done) => {
            const values = {
                email: "test@gmail.com",
                username: "kochamunittesty",
                password: "testtest12"
            }
            request(app)
                .post("/register")
                .send(values)
                .expect(409)
                .then(res => {
                    expect(res.body.Message).toStrictEqual("Email already in use")
                })
                done()
        })

        it("Should return 409 and message username in use", (done) => {
            const values = {
                email: "test@pyssa.com",
                username: "test",
                password: "testtest12"
            }
            request(app)
                .post("/register")
                .send(values)
                .expect(409)
                .then(res => {
                    expect(res.body.Message).toStrictEqual("Username already in use")
                })
                done()
        })

        it("Should return 201 and Status Success", (done) => {
            const values = {
                email: "test@pyssssa.com",
                username: "kochamunittestyyy",
                password: "testtest12"
            }
            request(app)
                .post("/register")
                .send(values)
                .expect(201)
                .then(res => {
                    expect(res.body.Status).toStrictEqual("Success")
                })
                done()
        })
    })
})