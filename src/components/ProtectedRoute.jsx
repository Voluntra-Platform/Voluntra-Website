import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext.jsx"

function ProtectedRoute({ children, allowedRole }) {
  const { user } = useContext(AuthContext)

  // 🔒 Not logged in → go to auth page
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  // 🚫 Logged in but wrong role
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/auth" replace />
  }

  return children
}

export default ProtectedRoute
