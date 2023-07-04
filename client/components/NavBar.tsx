import { IfAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const { logout } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="nav-bar">
      <table>
        <tbody>
          <tr>
            <IfAuthenticated>
              <th>
                <Link className="nav-bar-buttons" to="/">
                  To Do
                </Link>
              </th>
              <th>
                <Link className="nav-bar-buttons" to="/completed">
                  Done
                </Link>
              </th>
              <th>
                <button onClick={handleSignOut} className="sign-out-button">
                  Sign out
                </button>
                {/* {user && <p>Signed in as: {user?.nickname}</p>} */}
              </th>
            </IfAuthenticated>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
