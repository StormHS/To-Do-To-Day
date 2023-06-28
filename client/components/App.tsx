import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <>
      <div className="app">
        <h1>To Do To Day</h1>
        <div>
          <img
            className="companion-img"
            src="../../images/companion.png"
            alt="Little animal"
          />
        </div>
        <IfAuthenticated>
          <button onClick={handleSignOut} className="login-button">
            Sign out
          </button>
          {user && <p>Signed in as: {user?.nickname}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleSignIn} className="login-button">
            Sign in
          </button>
        </IfNotAuthenticated>
      </div>
    </>
  )
}
//client side routing via react-router
//redirect url in auth0 

export default App
