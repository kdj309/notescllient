import React, { useContext, useState } from 'react'
import { Note } from '../contexts/ExampleofContext/NoteContext'
export default function Form() {
    let context = useContext(Note)
    let { setshowalert, setmsg, setalerttype } = context
    const [title, settitle] = useState("")
    const [Tags, settag] = useState("")
    const [description, setdescription] = useState("")
    function scheduleAlert(timer) {
        setshowalert(true)
        setTimeout(() => {
            setshowalert(false)
        }, timer)
    }
    function submithandler(e) {
        e.preventDefault()
        let authtoken = localStorage.getItem('authtoken')
        context.addnote(authtoken, title, description, Tags)
        setmsg("Note added succesfully")
        setalerttype("success")
        scheduleAlert(1500)
    }
    return (
        <>
            <div className='container my-2'>
                <form onSubmit={submithandler}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id='title' onChange={(e) => settitle(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="dropdown" className="form-label">Tag &nbsp;:</label>
                        <select className="btn" id="dropdown" onChange={(e) => settag(e.target.value)} value={Tags}>
                            <option value="Personal">Personal</option>
                            <option value="office">office</option>
                            <option value="studies">studies</option>
                            <option value="Important">Important</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id='description' onChange={(e) => setdescription(e.target.value)} style={{ height: "250px" }}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>

    )
}
