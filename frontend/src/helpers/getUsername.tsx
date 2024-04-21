import axios from "axios"

const getUsername = (id: number | undefined) => {

    let username = ""

    if(id !== undefined){
        axios.defaults.withCredentials = true
        const url = "http://localhost:3000/accounts/" + id
        console.log(url)
        axios.post(url)
            .then(res => {
                if(res.status === 200){
                    username = res.data
                }
            })
            .catch(err => console.log(err))
    }else{
        username = "Guest"
    }
    return username
}

export { getUsername }