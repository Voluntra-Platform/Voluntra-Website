// src/components/DonationForm.jsx 

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { DollarSign, Send } from "lucide-react";
import StatusMessage from "./StatusMessage.jsx";
import { useNavigate } from "react-router-dom"; // Need this for redirection

const DonationForm = ({ ngoId = 1 }) => {
    // Get authenticated axios instance and user data
    const { user, axiosInstance } = useAuth();
    const navigate = useNavigate(); // For redirecting unauthenticated users
    
    const [amount, setAmount] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    // const [ngoId, setNgoId] = useState(''); // Placeholder is fine, but not used yet
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [loading, setLoading] = useState(false);

    // --- SECURITY CHECK: If user is not logged in, prompt them to login ---
    if (!user) {
        return (
            <div className="max-w-md mx-auto p-8 bg-red-50 rounded-xl border border-red-200 shadow-lg text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-bold text-red-800 mb-2">Login Required</h3>
                <p className="text-gray-700 mb-4">
                    Please log in or register as a Volunteer or Corporate Partner to make a contribution.
                </p>
                <button 
                    onClick={() => navigate('/login')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Go to Login
                </button>
            </div>
        );
    }
    // --- END SECURITY CHECK ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        const payload = {
            amount: parseFloat(amount),
            is_anonymous: isAnonymous,
            ngo: ngoId,
        };

        try {
            // CRITICAL: Send POST request to the donations endpoint
            const response = await axiosInstance.post('/donations/', payload);

            if (response.status === 201) {
                setStatus('success');
                setAmount(''); // Clear form
                setIsAnonymous(false);
            }
        } catch (error) {
            console.error("Donation Submission Failed:", error.response || error);
            
            let errorMessage = "Failed to process donation. Please check the amount.";
            const errorData = error.response?.data;
            if (errorData && errorData.amount) {
                 errorMessage = `Amount Error: ${errorData.amount.join(', ')}`;
            }
            setStatus(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <DollarSign className="w-6 h-6 mr-3 text-green-500" /> Make a Contribution
            </h3>
            
            <StatusMessage status={status} successMessage="Thank you! Your donation was recorded successfully." errorPrefix="Error: " />

            {/* Display logged-in donor status */}
            <p className="text-sm mb-4 p-2 rounded" style={{backgroundColor: '#E5E5E5'}}>
                Donor: {user.username} ({user.role})
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Donation Amount (INR)</label>
                    <input 
                        type="number" 
                        step="0.01"
                        min="1"
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500"
                        placeholder="e.g., 500.00"
                    />
                </div>

                <div className="flex items-center">
                    <input 
                        id="anonymous"
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900">
                        Donate Anonymously (Your name won't be displayed publicly)
                    </label>
                </div>
                
                <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    style={{backgroundColor: '#D4AF37', color: '#0D1B2A'}}
                    disabled={loading || !amount}
                >
                    <Send className="mr-2 w-4 h-4" />
                    {loading ? 'Processing...' : 'Donate Now'}
                </button>
            </form>
        </div>
    );
};

export default DonationForm;