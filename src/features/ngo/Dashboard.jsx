import React, { useState, useCallback, useMemo } from "react";
import { Users, DollarSign, Calendar, PlusCircle, BarChart2, Info, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Profile from '../volunteer/Profile.jsx';
import DashboardSidebar from '../../components/DashboardSidebar.jsx';

const EventsContent = ({ navigate }) => (
    <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-semibold text-brand-navy mb-4">Manage Events</h3>
        <p className="text-gray-600 mb-6">Create, edit, and track all your organization's events.</p>
        <div className="space-y-4">
            <div
                onClick={() => navigate('/dashboard/ngo/events/add')}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
                <PlusCircle size={24} className="text-brand-navy" />
                <p className="text-brand-navy font-semibold">Add New Event</p>
            </div>
            <div
                onClick={() => navigate('/dashboard/ngo/events/list')}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
                <Calendar size={24} className="text-brand-navy" />
                <p className="text-brand-navy font-semibold">View All Events</p>
            </div>
        </div>
    </div>
);

const VolunteersContent = () => (
    <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-semibold text-brand-navy mb-4">Manage Volunteers</h3>
        <p className="text-gray-600 mb-6">View and manage your registered volunteers and their activities.</p>
        <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Users size={24} className="text-brand-navy" />
                <p className="text-brand-navy font-semibold">View Volunteer List</p>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <BarChart2 size={24} className="text-brand-navy" />
                <p className="text-brand-navy font-semibold">Volunteer Statistics</p>
            </div>
        </div>
    </div>
);

const DonationsContent = () => (
    <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-semibold text-brand-navy mb-4">Track Donations</h3>
        <p className="text-gray-600 mb-6">Monitor your fundraising campaigns and donation history.</p>
        <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <DollarSign size={24} className="text-brand-navy" />
                <p className="text-brand-navy font-semibold">Donation Reports</p>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Info size={24} className="text-brand-navy" />
                <p className="text-brand-navy font-semibold">View Campaigns</p>
            </div>
        </div>
    </div>
);

const NGODashboard = () => {
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
        { id: "donations", label: "Donations", icon: DollarSign },
        { id: "profile", label: "Profile", icon: User },
    ], []);

    const stats = useMemo(() => [
        { value: "45", label: "Events Created", icon: Calendar, color: "text-brand-gold" },
        { value: "500", label: "Volunteers Registered", icon: Users, color: "text-green-500" },
        { value: "$12,500", label: "Funds Raised", icon: DollarSign, color: "text-purple-500" },
    ], []);

    const renderTabContent = () => {
        switch (activeTab) {
            case "events": return <EventsContent navigate={navigate} />;
            case "volunteers": return <VolunteersContent />;
            case "donations": return <DonationsContent />;
            case "profile": return <Profile />;
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-brand-gray">
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
                    <h1 className="text-4xl font-bold text-brand-navy mb-2">
                        Welcome back, {user ? user.first_name || user.username : 'NGO Admin'}! 👋
                    </h1>
                    <p className="text-lg text-gray-600">Track and manage your organization's activities</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map(({ value, label, icon: Icon, color }, i) => (
                        <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg p-6 transition-all duration-300">
                            <div className="flex items-center space-x-4">
                                <div className={`w-14 h-14 rounded-lg flex items-center justify-center bg-gray-100 ${color}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-brand-navy">{value}</h3>
                                    <p className="text-gray-600 font-medium">{label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {renderTabContent()}
            </main>
        </div>
    );
};

export default NGODashboard;
