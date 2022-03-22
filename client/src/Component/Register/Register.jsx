import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import {useDispatch} from 'react-redux'
import {addToken} from '../../features/actionsTypes'

const RegisterContainer = {
    display: "flex",
    flexDirection: "column",
    width: "16%",
    margin: "50px auto",
    rowGap: "10px"
}
const LoginMsg = {
    textAlign: "center"
}
const registerStatusMsg = {
    width: "20%",
    margin: "20px auto",
    textAlign: "center",
    fontWeight: "700",
    color: "DarkBlue",
    backgroundColor: "#b3ffe6",
    borderRadius: "5px",
    padding: "5px 10px"
}

export const Register = () => {
    const Dispatch=useDispatch()
    const Navigate = useNavigate()
    const [registerStatus, setRegisterStatus] = useState(null)
    const [RegisterInfo, setLoginInfo] = useState({
        name:"",
        email: "",
        password: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target
        setLoginInfo({
            ...RegisterInfo,
            [name]: value
        })
    }

    const handleRegister = () => {
        if (RegisterInfo.email == "" || RegisterInfo.password == "") {
            console.log("here")
            setRegisterStatus(3)
            setTimeout(() => {
                setRegisterStatus(false)
            }, 2500)
        } else {
            fetch("/userregister", {
                method: "POST",
                body: JSON.stringify(RegisterInfo),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })
                .then(res => res.json())
                .then((res) => {
                    if(res=="email already exist"){
                        setRegisterStatus(4)
                        setTimeout(()=>{
                            setRegisterStatus(false)
                        },3000)
                    }
                    else if (res.token) {
                        setRegisterStatus(1)
                        Dispatch(addToken(res.token))
                        setTimeout(()=>{
                            Navigate('/info')
                        },2000)
                    }else{
                        setRegisterStatus(2)
                        setTimeout(()=>{
                            setRegisterStatus(false)
                        },3000)
                    }
                })
                .catch(err => console.log(err))
        }
    }
    return <>
        <div style={RegisterContainer}>
            <input onChange={handleInput} type="text" name="name" id="" placeholder="name" />
            <input onChange={handleInput} type="text" name="email" id="" placeholder="email" />
            <input onChange={handleInput} type="text" name="password" id="" placeholder="password" />
            <input onClick={handleRegister} type="submit" id="" value={"Register"} />
            <div style={LoginMsg}>already a user ! <Link to="/login">Login</Link> </div>
        </div>
        {registerStatus ? <div style={registerStatusMsg}>
            {registerStatus == 1 ? <div>registered successfully</div> : registerStatus == 3 ? <div>Fill all information</div> : registerStatus == 2 ? <div>choose from predefined credientials</div> :  registerStatus == 4 ? <div>email already exist</div>: null}
        </div> : null}
    </>
}