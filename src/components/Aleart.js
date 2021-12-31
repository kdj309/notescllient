import React from 'react'

export default function Aleart({ msg,type}) {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {msg}
        </div>
    )
}
