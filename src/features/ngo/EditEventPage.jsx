// src/features/ngo/EditEventPage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Clock, MapPin, Edit, Loader } from 'lucide-react';
import StatusMessage from '../../components/StatusMessage.jsx';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext.jsx'; 

const EditEventPage = () => {
    const navigate = useNavigate();
    // useParams gets the dynamic part of the URL (the event ID)
    const { id } = useParams(); 
    const { axiosInstance } = useAuth();
    
    // State to hold and manage form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        is_published: false,
    });
    const [status, setStatus] = useState(null); // null, {type: 'success'}, or {type: 'error'}
    const [loading, setLoading] = useState(true); // Start loading to fetch initial data
    const [apiError, setApiError] = useState(null); // For fetching error

    // --- EFFECT TO FETCH EXISTING EVENT DATA ---
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                // GET request to the event detail endpoint: /events/{id}/
                const response = await axiosInstance.get(`/events/${id}/`);
                const data = response.data;

                // Pre-fill form state with existing data
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    // Date field needs date part only (e.g., '2025-10-05')
                    date: data.date ? data.date.split('T')[0] : '',
                    // Time fields are usually stored as strings in Django TimeField
                    startTime: data.startTime || '', 
                    endTime: data.endTime || '',
                    location: data.location || '',
                    is_published: data.is_published || false,
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch event details:", error.response || error);
                setApiError("Failed to load event details. Please verify the event ID.");
                setLoading(false);
            }
        };

        if (id) {
            fetchEventDetails();
        } else {
            setApiError("Invalid event ID.");
            setLoading(false);
        }
    }, [id, axiosInstance]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // Payload contains all fields to be sent for update
        const payload = {
            title: formData.title,
            description: formData.description,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            location: formData.location,
            is_published: formData.is_published,
        };

        try {
            // CRITICAL: Send PATCH request to update the resource
            const response = await axiosInstance.patch(`/events/${id}/`, payload);
            
            if (response.status === 200) {
                setStatus({ type: 'success', message: `Event "${formData.title}" updated successfully!` });
            }
        } catch (error) {
            console.error("Event Update Failed:", error.response || error);
            
            let errorMessage = "Failed to update event. Check required fields or permissions.";
            const errorData = error.response?.data;
            if (errorData && typeof errorData === 'object') {
                errorMessage = Object.values(errorData).flat().join(' | ');
            }
            setStatus({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    if (apiError) {
        return <div className="p-8 text-center text-red-700 min-h-screen">Error: {apiError}</div>;
    }

    return (
        <div className="min-h-screen flex justify-center w-full bg-brand-gray"> 
            
            <div className="w-full max-w-4xl p-8 pt-10">
                
                <button
                    onClick={() => navigate('/dashboard/ngo/events/list')}
                    className="flex items-center text-brand-navy hover:text-brand-gold mb-6 font-medium" 
                >
                    <ChevronLeft size={18} className="mr-2" /> Back to Event List
                </button>
                
                <h1 className="text-3xl font-bold text-brand-navy mb-2">Edit Event ID: {id}</h1>
                <p className="text-gray-600 mb-8">Modify the details for the scheduled volunteer opportunity.</p>
                
                {/* Form Card (White Background, Shadow) */}
                <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
                    
                    {/* Render Loading Spinner if data is still fetching */}
                    {loading && !status ? (
                         <div className="text-center py-10">
                            <Loader className="w-8 h-8 animate-spin text-brand-navy mx-auto" />
                            <p className="mt-2 text-brand-navy">Loading event data...</p>
                         </div>
                    ) : (
                        <>
                            <StatusMessage status={status} />

                            <form onSubmit={handleSubmit} className="space-y-5">
                                
                                {/* Title Input */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-brand-navy mb-1">Event Title *</label>
                                    <input
                                        type="text" name="title" value={formData.title} onChange={handleChange} required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:border-white transition-colors"
                                        placeholder="e.g., Beach Cleanup Drive"
                                    />
                                </div>
                                
                                {/* Description Input */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-brand-navy mb-1">Description *</label>
                                    <textarea
                                        name="description" value={formData.description} onChange={handleChange} required
                                        rows="4"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:border-white transition-colors"
                                        placeholder="Describe the event goals, necessary skills, and location details..."
                                    ></textarea>
                                </div>

                                {/* Date and Time (Side by Side) */}
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Date Field */}
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-brand-navy mb-1 flex items-center">
                                            <Calendar size={14} className="mr-1 text-brand-navy" /> Date *
                                        </label>
                                        <input
                                            type="date" name="date" value={formData.date} onChange={handleChange} required
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]"
                                        />
                                    </div>
                                    {/* Start Time Field */}
                                    <div>
                                        <label htmlFor="startTime" className="block text-sm font-medium text-brand-navy mb-1 flex items-center">
                                            <Clock size={14} className="mr-1 text-brand-navy" /> Start Time *
                                        </label>
                                        <input
                                            type="time" name="startTime" value={formData.startTime} onChange={handleChange} required
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]"
                                        />
                                    </div>
                                    {/* End Time Field */}
                                    <div>
                                        <label htmlFor="endTime" className="block text-sm font-medium text-brand-navy mb-1 flex items-center">
                                            <Clock size={14} className="mr-1 text-brand-navy" /> End Time *
                                        </label>
                                        <input
                                            type="time" name="endTime" value={formData.endTime} onChange={handleChange} required
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]"
                                        />
                                    </div>
                                </div>
                                
                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-brand-navy mb-1 flex items-center">
                                        <MapPin size={14} className="mr-1 text-brand-navy" /> Location *
                                    </label>
                                    <input
                                        type="text" name="location" value={formData.location} onChange={handleChange} required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]"
                                        placeholder="e.g., Elliot's Beach, Besant Nagar"
                                    />
                                </div>
                                
                                {/* Published Checkbox */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange}
                                        id="is_published"
                                        className="h-4 w-4 text-brand-navy border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37]"
                                    />
                                    <label htmlFor="is_published" className="ml-2 block text-sm text-brand-navy">
                                        Publish Immediately (Make visible to volunteers)
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors bg-brand-navy text-white hover:bg-gray-700 mt-6"
                                    disabled={loading}
                                >
                                    <Edit size={18} className="mr-2" />
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditEventPage;