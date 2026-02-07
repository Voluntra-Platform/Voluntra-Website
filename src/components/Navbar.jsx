import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext.jsx"

function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/auth")
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-700"
        >
          Voluntra
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!user && (
            <Link
              to="/auth"
              className="btn btn-primary"
            >
              Login / Signup
            </Link>
          )}

          {user && (
            <>
              <span className="text-sm text-gray-600">
                Role: <strong className="capitalize">{user.role}</strong>
              </span>

              <button
                onClick={handleLogout}
                className="btn btn-danger"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
