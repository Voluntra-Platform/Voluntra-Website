import { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";
import VolunteerDashboard from "./features/volunteer/Dashboard";
import NGODashboard from './features/ngo/Dashboard';
import CorporateDashboard from './features/corporate/Dashboard';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AddEventPage from './features/ngo/AddEventPage.jsx';
import EventListPage from './features/ngo/EventListPage.jsx';
import EditEventPage from './features/ngo/EditEventPage.jsx';

import NotFound from "./pages/NotFound";
import './App.css';

// Reusable Layout Component
function Layout({ children }) {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}

function App() {
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* --- Public Routes --- */}
                    <Route path="/" element={<Welcome />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<AuthPage />} />

                    {/* --- Secured/Role-Based Dashboard Routes --- */}
                    
                    {/* Volunteer Dashboard - Access via /dashboard/volunteer */}
                    <Route element={<ProtectedRoute allowedRoles={['volunteer']} />}>
                        <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
                    </Route>

                    {/* NGO Dashboard - Access via /dashboard/ngo */}
                    <Route element={<ProtectedRoute allowedRoles={['ngo']} />}>
                        <Route path="/dashboard/ngo" element={<NGODashboard />} />
                        <Route path="/dashboard/ngo/events/add" element={<AddEventPage />} />
                        <Route path="/dashboard/ngo/events/list" element={<EventListPage />} />
                        <Route path="/dashboard/ngo/events/edit/:id" element={<EditEventPage />} />
                    </Route>

                    {/* Corporate Dashboard - Access via /dashboard/corporate */}
                    <Route element={<ProtectedRoute allowedRoles={['corporate']} />}>
                        <Route path="/dashboard/corporate" element={<CorporateDashboard />} />
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Layout>
    );
}

export default App;