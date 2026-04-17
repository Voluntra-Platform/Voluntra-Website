// src/features/ngo/AddEventPage.jsx
import React, { useState } from 'react';
import { ChevronLeft, Calendar, Clock, MapPin, PlusCircle } from 'lucide-react';
import StatusMessage from '../../components/StatusMessage.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 

const AddEventPage = () => {
    const navigate = useNavigate();
    // Retrieve the authenticated Axios instance
    const { axiosInstance } = useAuth(); 
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        is_published: false,
    });
    const [status, setStatus] = useState(null); // null, {type: 'success'}, or {type: 'error', message: '...'}
    const [loading, setLoading] = useState(false);

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

        // Payload matches the required fields of the Django EventSerializer
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
            // CRITICAL: POST to the secured /events/ endpoint. 
            // The user ID (created_by/ngo) is set automatically on the backend.
            const response = await axiosInstance.post('/events/', payload);
            
            if (response.status === 201) {
                setStatus({ type: 'success', message: `Event "${formData.title}" created successfully!` });
                // Clear form upon successful creation
                setFormData({ title: '', description: '', date: '', startTime: '', endTime: '', location: '', is_published: false });
            }
        } catch (error) {
            console.error("Event Creation Failed:", error.response || error);
            
            let errorMessage = "Failed to create event. Check required fields.";
            const errorData = error.response?.data;
            if (errorData && typeof errorData === 'object') {
                // Joins all error messages returned by Django's validation
                errorMessage = Object.values(errorData).flat().join(' | ');
            }
            setStatus({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        // Container for centering and styling
        <div className="min-h-screen flex justify-center w-full" style={{ backgroundColor: '#E5E5E5' }}> 
            
            <div className="w-full max-w-4xl p-8 pt-10">
                
                {/* Back Button (Retains dark text and gold hover accent) */}
                <button
                    onClick={() => navigate('/dashboard/ngo')}
                    className="flex items-center text-[#0D1B2A] hover:text-[#D4AF37] mb-6 font-medium" 
                >
                    <ChevronLeft size={18} className="mr-2" /> Back to Dashboard
                </button>
                
                {/* Header (Navy Blue text) */}
                <h1 className="text-3xl font-bold text-[#0D1B2A] mb-2">Create New Event</h1>
                <p className="text-gray-600 mb-8">Fill in the details below to schedule a new volunteer opportunity.</p>
                
                {/* Form Card (White Background, Shadow) */}
                <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
                    
                    <StatusMessage status={status} />

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-[#0D1B2A] mb-1">Event Title *</label>
                            <input
                                type="text" name="title" value={formData.title} onChange={handleChange} required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37] focus:border-white transition-colors"
                                placeholder="e.g., Beach Cleanup Drive"
                            />
                        </div>
                        
                        {/* Description Input */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-[#0D1B2A] mb-1">Description *</label>
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
                                <label htmlFor="date" className="block text-sm font-medium text-[#0D1B2A] mb-1 flex items-center">
                                    <Calendar size={14} className="mr-1 text-[#0D1B2A]" /> Date *
                                </label>
                                <input
                                    type="date" name="date" value={formData.date} onChange={handleChange} required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]"
                                />
                            </div>
                            {/* Start Time Field */}
                            <div>
                                <label htmlFor="startTime" className="block text-sm font-medium text-[#0D1B2A] mb-1 flex items-center">
                                    <Clock size={14} className="mr-1 text-[#0D1B2A]" /> Start Time *
                                </label>
                                <input
                                    type="time" name="startTime" value={formData.startTime} onChange={handleChange} required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]"
                                />
                            </div>
                            {/* End Time Field */}
                            <div>
                                <label htmlFor="endTime" className="block text-sm font-medium text-[#0D1B2A] mb-1 flex items-center">
                                    <Clock size={14} className="mr-1 text-[#0D1B2A]" /> End Time *
                                </label>
                                <input
                                    type="time" name="endTime" value={formData.endTime} onChange={handleChange} required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D4AF37]"
                                />
                            </div>
                        </div>
                        
                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-[#0D1B2A] mb-1 flex items-center">
                                <MapPin size={14} className="mr-1 text-[#0D1B2A]" /> Location *
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
                                className="h-4 w-4 text-[#0D1B2A] border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37]"
                            />
                            <label htmlFor="is_published" className="ml-2 block text-sm text-[#0D1B2A]">
                                Publish Immediately (Make visible to volunteers)
                            </label>
                        </div>

                        {/* Submit Button (Primary Action - Navy Blue/White Text) */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors bg-[#0D1B2A] text-white hover:bg-gray-700 mt-6"
                            disabled={loading}
                        >
                            <PlusCircle size={18} className="mr-2" />
                            {loading ? 'Creating...' : 'Create Event'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEventPage;