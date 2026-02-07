import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Auth from "./pages/Auth"

import NgoDashboard from "./dashboards/NgoDashboard"
import VolunteerDashboard from "./dashboards/VolunteerDashboard"
import CorporateDashboard from "./dashboards/CorporateDashboard"

import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected routes */}
          <Route
            path="/ngo"
            element={
              <ProtectedRoute allowedRole="ngo">
                <NgoDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/volunteer"
            element={
              <ProtectedRoute allowedRole="volunteer">
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/corporate"
            element={
              <ProtectedRoute allowedRole="corporate">
                <CorporateDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
