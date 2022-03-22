import { Route,Routes } from "react-router-dom"
import { Home } from "./Home"
import { Login } from "./Login/Login"
import { Ui } from "./InfoPage/Ui"
import { Register } from "./Register/Register"

export const DirectRoutes=()=>{
    return <>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/info' element={<Ui />}></Route>
        </Routes>
    </>
}