import React from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/userAuth"
export default function Card() {

    const { username, password, handlePasswordChange, handleUsernameChange, reset } = useAuth()
    const navigate = useNavigate()

    function handleSubmit() {
        // make api call
        navigate('/dashboard')
        reset()
    }

    return <div className="card card-side bg-base-100 shadow-xl px-4">
        <figure>
            <img
                src={'https://cdn.prod.website-files.com/624ac40503a527cf47af4192/659baa52498a8bb97b45ed7f_ai-logo-generator-12.png'}
                alt="Movie"
                className="h-40 w-40 rounded-lg" />
        </figure>
        <div className="card-body">
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
    </div>
}