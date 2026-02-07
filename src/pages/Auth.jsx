import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext.jsx"

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!username || !password) {
      setError("Username and password are required")
      return
    }

    const users = JSON.parse(localStorage.getItem("users")) || []

    if (isLogin) {
      // 🔹 LOGIN FLOW
      const existingUser = users.find(
        (u) => u.username === username && u.password === password
      )

      if (!existingUser) {
        setError("Invalid username or password")
        return
      }

      login(existingUser)
      redirect(existingUser.role)
    } else {
      // 🔹 SIGNUP FLOW
      if (!role) {
        setError("Please select a role")
        return
      }

      const userExists = users.some((u) => u.username === username)
      if (userExists) {
        setError("Username already exists")
        return
      }

      const newUser = { username, password, role }
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      login(newUser)
      redirect(role)
    }
  }

  const redirect = (role) => {
    if (role === "ngo") navigate("/ngo")
    if (role === "volunteer") navigate("/volunteer")
    if (role === "corporate") navigate("/corporate")
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Login to Voluntra" : "Create an Account"}
      </h1>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 rounded mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {!isLogin && (
        <select
          className="w-full border p-2 rounded mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="ngo">NGO</option>
          <option value="volunteer">Volunteer</option>
          <option value="corporate">Corporate</option>
        </select>
      )}

      {error && (
        <p className="text-red-600 text-sm mb-3">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        className="btn btn-primary w-full"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p className="text-sm text-center mt-4">
        {isLogin ? "New here?" : "Already have an account?"}{" "}
        <button
          className="text-green-600 underline"
          onClick={() => {
            setIsLogin(!isLogin)
            setError("")
          }}
        >
          {isLogin ? "Create an account" : "Login"}
        </button>
      </p>
    </div>
  )
}

export default Auth
