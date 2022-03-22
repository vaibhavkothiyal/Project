import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToken } from "../../features/actionsTypes"

const loginContainer = {
    display: "flex",
    flexDirection: "column",
    width: "16%",
    margin: "50px auto",
    rowGap: "10px"
}
const registerMsg = {
    textAlign: "center"
}
const loginStatusMsg={
    width:"20%",
    margin:"20px auto",
    textAlign:"center",
    fontWeight:"700",
    color:"DarkBlue",
    backgroundColor:"#b3ffe6",
    borderRadius:"5px",
    padding:"5px 10px"
}

export const Login = () => {
    const Dispatch=useDispatch()
    const Navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(null)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target
        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }
    const handleLogin = () => {
        if (loginInfo.email == "" || loginInfo.password == "") {
            console.log("here")
            setLoginStatus(3)
            setTimeout(()=>{
                setLoginStatus(false)
            },2500)
        } else {
            fetch("/userlogin", {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.token) {
                        setLoginStatus(1)
                        Dispatch(addToken(res.token))
                        setTimeout(()=>{
                            Navigate('/info')
                        },2000)
                    }else{
                        setLoginStatus(2)
                        setTimeout(()=>{
                            setLoginStatus(false)
                        },3000)
                    }
                })
        }
    }

    return <>
        <div style={loginContainer}>
            <input onChange={handleInput} type="text" name="email" id="" placeholder="email" />
            <input onChange={handleInput} type="text" name="password" id="" placeholder="password" />
            <input onClick={handleLogin} type="submit" id="" value={"Login"} />
            <div style={registerMsg}>not a user ! <Link to="/register">Register</Link> </div>
        </div>
        {loginStatus ? <div style={loginStatusMsg}>
            {loginStatus==1 ? <div>logged in successfully</div>: loginStatus==3 ? <div>Fill all information</div> : loginStatus==2 ? <div>Invalid credientials</div> : null}
        </div>:null}
    </>
}