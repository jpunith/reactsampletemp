
import React from 'react'
import useAuth from './hooks/userAuth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { username, password, handlePasswordChange, handleUsernameChange, reset } = useAuth()
    const navigate = useNavigate()

    function handleSubmit() {
        // make api call
        navigate('/dashboard')
        reset()
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex flex-col gap-4'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input type="text" value={username} onChange={handleUsernameChange} placeholder="username" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>  
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password" className="input input-bordered w-full max-w-xs" />
                </label>

                <button onClick={handleSubmit} className="btn btn-primary w-full">Submit</button>
            </div>
        </div>
    )

}