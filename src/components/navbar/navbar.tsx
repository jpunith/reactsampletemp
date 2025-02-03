import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const { oktaAuth } = useOktaAuth()
  const [user, setUser] = useState<any>()

  useEffect(() => {
    async function getUser() {
      const isAuthenticated = await oktaAuth.isAuthenticated()

      if (!isAuthenticated) return

      const user = await oktaAuth.getUser()
      setUser(user)
    }

    getUser()
  }, [])

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Furniture</a>
      </div>
      {/* <div className="flex-none">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-outline m-1 uppercase"
          >
            {user && user.name[0]}
            
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li className="capitalize text-center font-bold text-black p-2">
                hi
              </li>
            </ul>
          </div>
        </div>

      </div> */}
    </div>
  );
}

