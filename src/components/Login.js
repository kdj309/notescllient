import React, { useState,useEffect } from 'react'
import Aleart from './Aleart';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
    document.body.style = 'background: #f8f9fa;';
    const [showalert, setshowalert] = useState(false)
    const [msg, setmsg] = useState("")
    const [alerttype, setalerttype] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    let history = useNavigate();
    function scheduleAlert(timer) {
        setshowalert(true)
        setTimeout(() => {
            setshowalert(false)
        }, timer)
    }
     function submithandler(e) {
        e.preventDefault()
        axios.post('https://pure-reef-34621.herokuapp.com/api/user/Userlogin', { email, password }).then((data)=>{
            localStorage.setItem("authtoken", data.data)
            setshowalert(true)
            setmsg("successfully login")
            setalerttype("success")
            setTimeout(() => {
                setshowalert(false)
                history("/");
            }, 1500)
        }).catch(()=>{
            setmsg("some error occured")
            setalerttype("danger")
            scheduleAlert(3000)
        })

    }
    useEffect(() => {
        document.title="Online Notes | Login"
    }, [])
    return (
        <div className='my-2 mx-auto d-flex flex-column justify-content-evenly p-3' style={{ boxShadow: "0px 0px 10px rgb(0 0 0 / 14%)", width: "40%", backgroundColor: "white" }}>
            <div className='mx-auto' style={{ width: "max-content" }}>
                <img src='./images/notes_logo.png' className='mx-auto' style={{ width: "250px", height: "250px" }} alt='logo'></img>
                <h3 className='text-center'>Online Notes</h3>
            </div>
            {showalert ? <Aleart msg={msg} type={alerttype} /> : null}
            <div style={{ width: "85%" }} className='mx-auto'>
                <form onSubmit={(e) => submithandler(e)}>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="Email" value={email} onChange={(e) => setemail(e.target.value)} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password1" value={password} onChange={(e) => setpassword(e.target.value)} minLength={5} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <div>
                    <p>Don't have an Account <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>

        </div>
    )
}
