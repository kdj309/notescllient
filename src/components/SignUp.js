import React, { useState,useEffect } from 'react'
import Aleart from './Aleart';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
export default function SignUp() {
    document.body.style = 'background: #f8f9fa;';
    const [user, setuser] = useState({ name: "", email: "", password: "", repeatedpassword: "" })
    const [showalert, setshowalert] = useState(false)
    const [msg, setmsg] = useState("")
    const [alerttype, setalerttype] = useState("")
    function scheduleAlert(timer) {
        setshowalert(true)
        setTimeout(() => {
            setshowalert(false)
        }, timer)
    }
    let history = useNavigate();
    function submithandler(e) {
        e.preventDefault()
        if (user.password !== user.repeatedpassword) {
            scheduleAlert(1500)
            return
        }
        axios.post('https://pure-reef-34621.herokuapp.com/api/user/createUser', {
            name: user.name, email: user.email, password: user.password
        }).then((data)=>{
            localStorage.setItem("authtoken", data.data)
            setuser({ name: " ", email: " ", password: " ", repeatedpassword: " " })
            setshowalert(true)
            setmsg("Account created succesfully")
            setalerttype("success")
            setTimeout(() => {
                setshowalert(false)
                history("/login");
            }, 3000)
        }).catch((error)=>{
            setmsg("some error occured")
            setalerttype("danger")
            scheduleAlert(3000)
        })
    }
    let onchange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        
        document.title="Online Notes | Signup"
    }, [])
    return (
        <>
            <div className='my-2 mx-auto d-flex flex-column justify-content-evenly p-3' style={{ boxShadow: "0px 0px 10px rgb(0 0 0 / 14%)", width: "40%", backgroundColor: "white" }}>
                <div className='mx-auto' style={{ width: "max-content" }}>
                    <img src='./images/notes_logo.png' className='mx-auto' style={{ width: "250px", height: "250px" }} alt='logo'></img>
                    <h3 className='text-center'>Online Notes</h3>
                </div>
                {showalert ? <Aleart msg={msg} type={alerttype} /> : null}
                <div style={{ width: "85%" }} className='mx-auto'>
                    <form onSubmit={(e) => submithandler(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name='name' value={user.name} onChange={onchange}  required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="Email" name='email' value={user.email} onChange={onchange}  required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="Password1" name='password' value={user.password} onChange={onchange}  required minLength={5}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password2" className="form-label">Repeat Password</label>
                            <input type="password" className="form-control" id="Password2" name='repeatedpassword' value={user.repeatedpassword} onChange={onchange}  required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <div>
                        <p>Already have an Account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
