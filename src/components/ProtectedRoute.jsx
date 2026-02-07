import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext.jsx"

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useContext(AuthContext)

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />
  }

  // Logged in but wrong role
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
