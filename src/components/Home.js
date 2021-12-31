import React, { useContext, useEffect, useState } from 'react'
import Form from './Form'
import NotesContainer from './NotesContainer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Welcome from './Welcome'
import { Note } from '../contexts/ExampleofContext/NoteContext'
import Aleart from './Aleart'
export default function Home() {
    let context = useContext(Note)
    const [user, setuser] = useState(false)
    const { showalert, msg, alerttype, setuserlogin } = context
    let navigate = useNavigate()
    function fetchuser(authtoken) {
        axios.get('https://pure-reef-34621.herokuapp.com/api/user/getuser', {
            headers: {
                'auth-token': authtoken
            }
        }).then((data) => {
            if (data.status !== 200) {
                navigate('/signup')
            } else {
                setuserlogin(true)
                setuser(data.data)
            }
        })
    }
    useEffect(() => {
       
        let token = localStorage.getItem('authtoken')
        fetchuser(token)
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            {showalert ? <Aleart msg={msg} type={alerttype} /> : null}
            {user ? <Welcome user={user}></Welcome> : null}
            <Form />
            <NotesContainer />
        </div>
    )
}
