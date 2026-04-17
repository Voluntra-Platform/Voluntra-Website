import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { FaEnvelope, FaLock, FaUser, FaArrowRight, FaUndo } from "react-icons/fa"; 


// Reusable Input Component (Moved outside AuthPage)
const InputField = ({ icon, type, placeholder, value, onChange, required = true, isDisabled = false }) => (
    <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500" aria-hidden="true">
            {icon}
        </span>
        <input
            type={type}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            aria-label={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={isDisabled}
        />
    </div>
);

const AuthPage = () => {
    // Local input state variables
    const [localUsername, setLocalUsername] = useState('');
    const [localEmail, setLocalEmail] = useState('');
    const [localPassword, setLocalPassword] = useState('');
    const [localRole, setLocalRole] = useState('volunteer');
    
    // Global state and functions from AuthContext
    const { 
        login, register, authError, loading, 
        authStep, checkedUsername, checkUser, resetAuthStep 
    } = useAuth();


    // --- Handlers for Step Transitions ---
    
    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        // Call backend to check if user exists
        checkUser(localUsername);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Login always uses the confirmed username and the current password input
        login(checkedUsername, localPassword);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const registrationData = {
            username: checkedUsername,
            email: localEmail,
            password: localPassword,
            role: localRole.toLowerCase(),
        };
        register(registrationData);
    };


    // --- Content Renderers ---

    // Enter Username (Initial Screen)
    const renderStep1 = () => (
        <form onSubmit={handleUsernameSubmit}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Login/Signup</h2>
            <p className="text-center text-gray-600 mb-6">Enter your username to get started.</p>
            
            <InputField 
                icon={<FaUser />}
                type="text"
                placeholder="Username"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
            />
            
            {authError && <p className="text-red-500 text-sm text-center mb-4">{authError}</p>}
            
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                disabled={loading}
            >
                {loading ? 'Checking...' : (
                    <><span className="mr-2">Next</span> <FaArrowRight /></>
                )}
            </button>
        </form>
    );

    // Password Prompt (User Exists)
    const renderStep2 = () => (
        <form onSubmit={handleLoginSubmit}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-center text-gray-600 mb-6">
                Please enter the password for: 
                <span className="font-semibold text-blue-600 ml-1">{checkedUsername}</span>
            </p>
            
            <InputField 
                icon={<FaLock />}
                type="password"
                placeholder="Password"
                value={localPassword}
                onChange={(e) => setLocalPassword(e.target.value)}
            />
            
            {authError && <p className="text-red-500 text-sm text-center mb-4">{authError}</p>}

            <div className="space-y-3">
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Logging In...' : 'Log In'}
                </button>
                <button
                    type="button"
                    onClick={resetAuthStep}
                    className="w-full bg-gray-300 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center space-x-2"
                    disabled={loading}
                >
                    <FaUndo size={14} /> <span>Change User</span>
                </button>
            </div>
        </form>
    );

    // Registration Form (If User Does Not Exist)
    const renderStep3 = () => (
        <form onSubmit={handleRegisterSubmit}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">New Account</h2>
            <p className="text-center text-gray-600 mb-6">
                Registering new user: 
                <span className="font-semibold text-blue-600 ml-1">{checkedUsername}</span>
            </p>

            <InputField 
                icon={<FaUser />}
                type="text"
                placeholder="Username"
                value={checkedUsername} // Display the fixed username
                onChange={() => {}} 
                isDisabled={true} 
            />
            
            <InputField 
                icon={<FaEnvelope />}
                type="email"
                placeholder="Email Address"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
            />
            
            <InputField 
                icon={<FaLock />}
                type="password"
                placeholder="Choose Password"
                value={localPassword}
                onChange={(e) => setLocalPassword(e.target.value)}
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sign up as:</label>
                <select 
                    value={localRole} 
                    onChange={(e) => setLocalRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="volunteer">Volunteer</option>
                    <option value="ngo">NGO</option>
                    <option value="corporate">Corporate Partner</option>
                </select>
            </div>
            
            {authError && <p className="text-red-500 text-sm text-center mb-4">{authError}</p>}
            
            <div className="space-y-3">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Complete Sign Up'}
                </button>
                <button
                    type="button"
                    onClick={resetAuthStep}
                    className="w-full bg-gray-300 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center space-x-2"
                    disabled={loading}
                >
                    <FaUndo size={14} /> <span>Change User</span>
                </button>
            </div>
        </form>
    );

    // --- Main Render Logic ---
    const renderAuthStep = () => {
        if (authStep === 2) return renderStep2();
        if (authStep === 3) return renderStep3();
        return renderStep1();
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                {renderAuthStep()}
            </div>
        </div>
    );
};

export default AuthPage;