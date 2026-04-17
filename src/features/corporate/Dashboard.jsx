import React, { useState, useCallback, useMemo } from "react";
import { Users, Calendar, DollarSign, BarChart2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Profile from '../volunteer/Profile.jsx';
import DonationForm from '../../components/DonationForm.jsx';
import DashboardSidebar from '../../components/DashboardSidebar.jsx';

const EventsContent = () => (
    <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-semibold text-[#0D1B2A] mb-4">Your Events</h3>
        <p className="text-gray-600 mb-6">View and manage your corporate events and volunteer campaigns.</p>
    </div>
);

const VolunteersContent = () => (
    <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-semibold text-[#0D1B2A] mb-4">Employee Volunteers</h3>
        <p className="text-gray-600 mb-6">Monitor employee participation and volunteer hours.</p>
    </div>
);

const ReportingContent = () => (
    <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-semibold text-[#0D1B2A] mb-4">Reporting & Analytics</h3>
        <p className="text-gray-600 mb-6">Generate and download reports on your social impact.</p>
    </div>
);

const CorporateDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("events");

    if (!user) {
        navigate("/login", { replace: true });
        return null;
    }

    const handleSignOut = useCallback(() => { logout(); }, [logout]);

    const navItems = useMemo(() => [
        { id: "events", label: "Events", icon: Calendar },
        { id: "volunteers", label: "Volunteers", icon: Users },
        { id: "reporting", label: "Reporting", icon: BarChart2 },
        { id: "profile", label: "Profile", icon: User },
    ], []);

    const stats = useMemo(() => [
        { value: "3", label: "Active Campaigns", icon: Calendar, color: "text-[#D4AF37]" },
        { value: "452", label: "Employee Volunteers", icon: Users, color: "text-green-500" },
        { value: "1,200", label: "Hours Logged", icon: BarChart2, color: "text-purple-500" },
    ], []);

    const renderTabContent = () => {
        switch (activeTab) {
            case "events": return <EventsContent />;
            case "volunteers": return <VolunteersContent />;
            case "reporting": return <ReportingContent />;
            case "profile": return <Profile />;
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#E5E5E5]">
            <DashboardSidebar
                navItems={navItems}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                username={user?.username}
                onHome={() => navigate("/")}
                onSignOut={handleSignOut}
            />

            <main className="flex-1 p-6 md:p-10 overflow-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#0D1B2A] mb-2">
                        Welcome back, {user ? user.first_name || user.username : 'Corporate Admin'}! 👋
                    </h1>
                    <p className="text-lg text-gray-600">Track your company's social impact</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map(({ value, label, icon: Icon, color }, i) => (
                        <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg p-6 transition-all duration-300">
                            <div className="flex items-center space-x-4">
                                <div className={`w-14 h-14 rounded-lg flex items-center justify-center bg-gray-100 ${color}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-[#0D1B2A]">{value}</h3>
                                    <p className="text-gray-600 font-medium">{label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-10 max-w-lg">
                    <DonationForm />
                </div>

                {renderTabContent()}
            </main>
        </div>
    );
};

export default CorporateDashboard;
