import { IfAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

export default function NavBar() {
  const { logout } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="nav-bar">
      <table>
        <tr>
          <th>
            <a className="nav-bar-buttons" href="/">
              To Do
            </a>
          </th>
          <th>
            <a className="nav-bar-buttons" href="/">
              Done
            </a>
          </th>
          <th>
            {' '}
            <IfAuthenticated>
              <button onClick={handleSignOut} className="sign-out-button">
                Sign out
              </button>
              {/* {user && <p>Signed in as: {user?.nickname}</p>} */}
            </IfAuthenticated>
          </th>
        </tr>
      </table>
    </div>
  )
}
