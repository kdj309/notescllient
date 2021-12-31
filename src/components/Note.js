import React, { useContext} from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdDateRange } from "react-icons/md";
import { Note } from '../contexts/ExampleofContext/NoteContext';
import { AiFillTag } from "react-icons/ai";
export default function MyNote({ title, description, time, id,Tags,updatenotes }) {
    let context = useContext(Note)
    let { setshowalert, setmsg, setalerttype } = context
    function scheduleAlert(timer) {
        setshowalert(true)
        setTimeout(() => {
            setshowalert(false)
        }, timer)
    }
    function deletehandler() {
        let token = localStorage.getItem('authtoken')
        context.deletenote(id, token)
        setmsg("Note deleted succesfully")
        setalerttype("success")
        scheduleAlert(3000)
    }
    
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><AiFillTag/>&nbsp;{Tags}</p>
                    <p className="card-text"><MdDateRange fontSize={30} />&nbsp;{time}</p>
                    <button href="#" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>updatenotes(id,title,description,Tags)} ><FaRegEdit /></button>
                    <button href="#" className="btn btn-primary mx-2" onClick={deletehandler}><MdDeleteOutline /></button>
                </div>
            </div>
        </>

    )
}
