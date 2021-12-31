import React, { createContext, useState } from 'react'
import axios from 'axios'
const Note = createContext()
export default function NoteContext(props) {

    const [notes, setnotes] = useState([])
    const [allnotes, setallnotes] = useState([])
    const [userlogin, setuserlogin] = useState(false)
    const [showalert, setshowalert] = useState(false)
    const [msg, setmsg] = useState("")
    const [alerttype, setalerttype] = useState("")
    async function fetchnotes(authtoken) {
        let response = await axios.get('https://pure-reef-34621.herokuapp.com/api/notes/fetchallnotes', {
            headers: {
                'auth-token': authtoken
            }
        });
        //console.log();
        setnotes(response.data.notes)
        setallnotes(response.data.notes)
    }
    async function addnote(authtoken, Title, description,Tags) {
        let response = await axios.post('https://pure-reef-34621.herokuapp.com/api/notes/insertnote', { Title, description,Tags }, {
            headers: {
                'auth-token': authtoken
            }
        })
        setnotes((previous) => {
            return [...previous, response.data]
        })
        //return response
    }
    async function deletenote(id, authtoken) {
        let response = await axios.delete(`https://pure-reef-34621.herokuapp.com/api/notes/deletenote/${id}`, {
            headers: {
                'auth-token': authtoken
            }
        })
        //fetchnotes(localStorage.getItem('authtoken'))
        if (response.status === 200) {
            let filterednotes = notes.filter((mynote) => {
                return mynote._id !== id
            }
            )
            setnotes(filterednotes)
        }
        return response
    }
    async function updatenotes(id,Title,description,Tags,authtoken) {
        let response= await axios.put(`https://pure-reef-34621.herokuapp.com/api/notes/updatenote/${id}`,{Title,description,Tags},{
            headers: {
                'auth-token': authtoken
            }
        })
        if(response.status===200){
            //console.log(notes);
            let newnotes=JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < notes.length; index++) {
                const element = newnotes[index];
                if (element._id===id) {
                    newnotes[index].Title=Title
                    newnotes[index].description=description
                    newnotes[index].Tags=Tags
                    break;
                }
            }
            //console.log(notes);
            setnotes(newnotes)
            //fetchnotes(authtoken)
        }
    }
    async function filternote(tag, authtoken) {
        let response = await axios.get(`https://pure-reef-34621.herokuapp.com/api/notes/filternotes/${tag}`, {
            headers: {
                'auth-token': authtoken
            }
        })
        //fetchnotes(localStorage.getItem('authtoken'))
        if (response.status === 200) {
            let filterednotes = allnotes.filter((mynote) => {
                return mynote.Tags === tag
            }
            )
            //console.log(filterednotes);
            //fetchnotes(authtoken)
            setnotes(filterednotes)
        }
        return response
    }
    return (
        <>
            <Note.Provider value={{ notes, fetchnotes, addnote, deletenote, setnotes,updatenotes,userlogin,setuserlogin,showalert,setshowalert,msg,setmsg,alerttype,setalerttype,filternote }}>
                {props.children}
            </Note.Provider>
        </>

    )
}
export { Note }