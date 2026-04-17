// src/features/ngo/EventListPage.jsx

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Edit, Send, Loader, Trash } from 'lucide-react'; // Added Trash
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 

const EventListPage = () => {
    const navigate = useNavigate();
    const { user, axiosInstance } = useAuth();
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch data (refactored for easy re-use)
    const fetchEvents = async () => {
        if (!user || !user.id) return;
        setLoading(true);
        try {
            // Filter by current logged-in NGO user
            const response = await axiosInstance.get(`/events/?created_by=${user.id}`);
            setEvents(response.data);
            setError(null);
        } catch (err) {
            console.error("Event List Fetch Error:", err);
            setError("Failed to load events. Check API connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [user]); // Re-run when user object is available/changes

    // --- NEW ACTION HANDLERS ---
    
    const handleEdit = (eventId) => {
        // Navigate to a specific edit route (You will set up this route later)
        navigate(`/dashboard/ngo/events/edit/${eventId}`);
    };

    const handlePublishToggle = async (eventId, currentStatus) => {
        const newStatus = !currentStatus;
        if (!window.confirm(`Are you sure you want to ${newStatus ? 'PUBLISH' : 'UNPUBLISH'} this event?`)) {
            return;
        }

        try {
            // Send PATCH request to Django API
            await axiosInstance.patch(`/events/${eventId}/`, {
                is_published: newStatus
            });
            
            // Refresh the list to show the updated status
            fetchEvents(); 

        } catch (err) {
            console.error("Publish Toggle Failed:", err.response || err);
            alert(`Failed to update status. Error: ${err.response?.data?.detail || 'Network error'}`);
        }
    };
    // --- END NEW ACTION HANDLERS ---

    // --- Conditional Renderings (Loading/Error) remain the same ---
    if (loading) { /* ... Loading JSX ... */ }
    if (error) { /* ... Error JSX ... */ }
    
    // --- Main JSX Render ---
    return (
        <div className="p-8">
            <button
                onClick={() => navigate('/dashboard/ngo')}
                className="flex items-center text-gray-600 hover:text-brand-gold mb-6 font-medium"
            >
                <ChevronLeft size={18} className="mr-2" /> Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold text-brand-navy mb-4">All Managed Events ({events.length})</h1>
            <p className="text-gray-600 mb-8">View, edit, or publish events created by your organization.</p>
            
            <div className="bg-white p-8 rounded-xl shadow-2xl">
                
                {/* ... (Empty State JSX) ... */}
                {events.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <Calendar className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                        <p className="font-semibold text-gray-700">No events created yet.</p>
                        <button
                            onClick={() => navigate('/dashboard/ngo/events/add')}
                            className="mt-4 px-4 py-2 bg-brand-gold text-brand-navy rounded-lg font-medium hover:bg-yellow-600 transition"
                        >
                            Create First Event
                        </button>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* ... (Table Head remains the same) ... */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {events.map((event) => (
                                <tr key={event.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-navy">{event.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {event.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                                        
                                        {/* EDIT BUTTON: Links to the Edit Page */}
                                        <button 
                                            onClick={() => handleEdit(event.id)} // <-- ADD HANDLER
                                            className="text-blue-600 hover:text-blue-800 flex items-center p-1 rounded-lg hover:bg-blue-50 transition-colors"
                                        >
                                            <Edit size={16} className="mr-1" /> Edit
                                        </button>
                                        
                                        {/* PUBLISH/UNPUBLISH BUTTON: Sends PATCH request */}
                                        <button 
                                            onClick={() => handlePublishToggle(event.id, event.is_published)} // <-- ADD HANDLER
                                            className={`flex items-center p-1 rounded-lg font-medium transition-colors ${
                                                event.is_published 
                                                    ? 'text-red-600 bg-red-100 hover:bg-red-200'
                                                    : 'text-green-600 bg-green-100 hover:bg-green-200'
                                            }`}
                                        >
                                            {event.is_published ? (
                                                <><Trash size={16} className="mr-1" /> Unpublish</>
                                            ) : (
                                                <><Send size={16} className="mr-1" /> Publish</>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default EventListPage;