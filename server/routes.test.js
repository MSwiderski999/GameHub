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
                    expect(res.body.gamesPlayedGrouped.length).toStrictEqual(3)
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
})