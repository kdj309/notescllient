import React from 'react'

export default function Welcome({user}) {
    return (
        <>
            <h3 className='display-4 my-2 text-center'>Welcome back {user.name}</h3>
        </>
    )
}
