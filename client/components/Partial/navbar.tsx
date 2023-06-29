import { IfAuthenticated } from '../Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

export default function NaviBar() {
  const navibarStyle: React.CSSProperties = {
    borderColor: '#000000',
    border: '3px solid',
    top: '0px',
  }
  const navibarStyle2: React.CSSProperties = {
    borderColor: '#000000',
    border: '3px solid',
    backgroundColor: 'white',
  }
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  return (
    <div>
      <table style={navibarStyle}>
        <tr style={navibarStyle2}>
          <th style={navibarStyle2}>
            <a href="/">To Do To day</a>
          </th>
          <th style={navibarStyle2}>
            <a href="/">To Do this week</a>
          </th>
          <th style={navibarStyle2}>
            <a href="/">To Do this month</a>
          </th>
          <th style={navibarStyle2}>
            <a href="/">have done</a>
          </th>
          <th style={navibarStyle2}>
            {' '}
            <IfAuthenticated>
              <button onClick={handleSignOut} className="login-button">
                Sign out
              </button>
              {user && <p>Signed in as: {user?.nickname}</p>}
            </IfAuthenticated>
          </th>
        </tr>
      </table>
    </div>
  )
}
