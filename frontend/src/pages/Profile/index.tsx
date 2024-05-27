import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import { useAuth } from "../../helpers/checkAuth";
import "./profile.scss"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile(){
    const navigate = useNavigate()
    const auth = useAuth()

    const loginRedirect = () => {
        navigate("/login")
    }

    const getPlayerUsername = () => {
        axios.defaults.withCredentials = true
        const url = "http://localhost:3000/accounts/" + auth
        axios.post(url)
            .then(res => {
                if(res.status === 200){
                    setUsername(res.data.toString())
                }
            })
            .catch(err => console.log(err))
    }

    const getGamesPlayed = () => {
        axios.defaults.withCredentials = true
        const url = "http://localhost:3000/profile/games-played/" + auth
        axios.post(url)
            .then(res => {
                if(res.status === 200){
                    setGamesPlayed(res.data.gamesPlayed)
                }
            })
            .catch(err => console.log(err))
    }

    const getGamesPlayedGrouped = () => {
        axios.defaults.withCredentials = true
        const url = "http://localhost:3000/profile/games-played-grouped/" + auth
        axios.post(url)
            .then(res => {
                if(res.status === 200){
                    setGamesPlayedGrouped(res.data.gamesPlayedGrouped)
                }
            })
    }

    const [username, setUsername] = useState("")
    const [gamesPlayed, setGamesPlayed] = useState()
    const [gamesPlayedGrouped, setGamesPlayedGrouped] = useState([{Game: "", Played: ""}])

    useEffect(() => {
        if(gamesPlayed == undefined){
            const timer = setInterval(() => {
                getPlayerUsername()
                getGamesPlayed()
                getGamesPlayedGrouped()
            }, 500)
            return () => clearInterval(timer)
        }
    }, [getGamesPlayed, getPlayerUsername, getGamesPlayedGrouped])
    
    return (
        auth ?
        <div id="profile-container">
            <div id="username-header">{username}</div>
            <div id="stats-section">
                <div id="games-played">Total games played: {gamesPlayed}</div>
                <div id="games-played-grouped"><ul>{gamesPlayedGrouped.map((game => <li>{game.Game + ": " + game.Played}</li>))}</ul></div>
            </div>
            </div>
        :
        <div>
            <h1>You are not logged in!</h1>
            <button onClick={loginRedirect}>Login</button>
        </div>
    )
}