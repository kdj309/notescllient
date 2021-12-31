import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Note } from '../contexts/ExampleofContext/NoteContext';
export default function Navbar() {
    let location = useLocation()
    let context = useContext(Note)
    let navigate=useNavigate()
    function deletehandler() {
        localStorage.removeItem('authtoken')
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`${location.pathname}` === "/" ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        <ul className="d-flex">
                            {context.userlogin ? <button className='btn btn-primary' onClick={deletehandler}> Logout</button> :
                                <>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname}` === "/signup" ? "nav-link active" : "nav-link"} aria-current="page" to="/signup">SignUp</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`${location.pathname}` === "/login" ? "nav-link active" : "nav-link"} aria-current="page" to="/login">Login</Link>
                                    </li>
                                </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
