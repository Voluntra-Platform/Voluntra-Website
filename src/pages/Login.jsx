import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext.jsx"

function Login() {
  const [role, setRole] = useState("")
  const [error, setError] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!role) {
      setError("Please select a role to continue")
      return
    }

    login(role)

    if (role === "ngo") navigate("/ngo")
    if (role === "volunteer") navigate("/volunteer")
    if (role === "corporate") navigate("/corporate")
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Login to Voluntra
      </h1>

      <label className="block mb-2 text-sm font-medium">
        Select Role
      </label>

      <select
        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={role}
        onChange={(e) => {
          setRole(e.target.value)
          setError("")
        }}
      >
        <option value="">-- Choose a role --</option>
        <option value="ngo">NGO</option>
        <option value="volunteer">Volunteer</option>
        <option value="corporate">Corporate</option>
      </select>

      {error && (
        <p className="text-red-600 text-sm mb-4">
          {error}
        </p>
      )}

      <button
        onClick={handleLogin}
        disabled={!role}
        className={`w-full py-2 rounded text-white ${
          role
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  )
}

export default Login
