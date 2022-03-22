import { Link } from "react-router-dom"

const msgDiv={
    margin:"40px auto",
    width:"50%",
    textAlign:"center",
    fontWeight:"700"
}

export const Home=()=>{
    return <>
        <div style={msgDiv}>Please <Link to="/login">Login</Link> First</div>
    </>
}