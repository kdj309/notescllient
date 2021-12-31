import React, { useContext, useEffect,useState,useRef } from 'react'
import { Note } from '../contexts/ExampleofContext/NoteContext'
import MyNote from './Note'
import { IoIosArrowRoundForward } from "react-icons/io";
export default function NotesContainer() {
    const [newtitle, setnewtitle] = useState("")
    const [newdescription, setnewdescription] = useState("")
    const [newtags, setnewtags] = useState("")
    const [noteid, setnoteid] = useState("")
    const [query, setquery] = useState("")
    const modalclose = useRef(null)
    const modalopen = useRef(null)
    let context = useContext(Note)
    let { setshowalert, setmsg, setalerttype } = context
    function submithandler(e) {
        e.preventDefault()
        let token = localStorage.getItem('authtoken')
        context.filternote(query,token)
    }
    function scheduleAlert(timer) {
        setshowalert(true)
        setTimeout(() => {
            setshowalert(false)
        }, timer)
    }
    function edithandler() {
        let authtoken = localStorage.getItem('authtoken')
        context.updatenotes(noteid, newtitle, newdescription,newtags, authtoken)
        //setnewtitle(" ")
        modalclose.current.click()
        setmsg("Note updated succesfully")
        setalerttype("success")
        scheduleAlert(3000)
    }
    function updatehandler(id,title,description,tags) {
        setnewtitle(title)
        setnewdescription(description)
        setnewtags(tags)
        setnoteid(id)
        // e.preventDefault()
       
    }
    useEffect(() => {
        let token = localStorage.getItem('authtoken')
        context.fetchnotes(token)
        // eslint-disable-next-line
    }, [])
    return (
        <>
             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalopen}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" ref={modalclose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id='title' value={newtitle} onChange={(e) => setnewtitle(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="dropdown" className="form-label">Tag</label>
                                    <select className="btn" id="dropdown" onChange={(e) => setnewtags(e.target.value)} value={newtags}>
                                        <option value="Personal">Personal</option>
                                        <option value="office">office</option>
                                        <option value="studies">studies</option>
                                        <option value="Important">Important</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id='description' value={newdescription} onChange={(e) => setnewdescription(e.target.value)} style={{ height: "250px" }}></textarea>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={edithandler}>Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={submithandler} className='container my-2'>
                <div className='mb-3'>
                    <label htmlFor="dropdown" className="form-label">Filter out by Tag &nbsp;:</label>
                    <select className="btn" id="dropdown" onChange={(e) => setquery(e.target.value)} value={query}>
                        <option value="general">general</option>
                        <option value="Personal">Personal</option>
                        <option value="office">office</option>
                        <option value="studies">studies</option>
                        <option value="Important">Important</option>
                    </select>
                    <button type="submit" className="btn btn-primary mx-2"><IoIosArrowRoundForward fontSize={25}/></button>
                </div>
            </form>
            <div className='container d-flex flex-direction-row flex-wrap mx-auto my-3 gap' style={{ maxWidth: "87%", gap: "15px" }}>

                {context.notes.length === 0 ? <h2>No notes to display please add note</h2> : context.notes.map((mynote) => {
                    return <MyNote key={mynote._id} title={mynote.Title} description={mynote.description} time={mynote.time} id={mynote._id} Tags={mynote.Tags} updatenotes={updatehandler}/>
                })}
            </div>
        </>

    )
}
