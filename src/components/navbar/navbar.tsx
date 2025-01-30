import React from "react";
import { useAppSelector } from "../../states/hooks";

export default function Navbar() {
    const { username } = useAppSelector(state => state.user.value)
    
    return <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-none">
            <button className="btn btn-square btn-ghost">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Furniture</a>
        </div>
        <div className="flex-none">
            {username && <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-circle btn-outline m-1 uppercase">{username[0]}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow right-0">
                    <li className="capitalize text-center font-bold p-2">{username}</li>
                </ul>
            </div>
            }

        </div>
    </div>
}
