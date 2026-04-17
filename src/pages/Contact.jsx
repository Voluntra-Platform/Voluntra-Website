import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "../utils/axiosInstance";
import StatusMessage from "../components/StatusMessage.jsx";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // null, 'success', or error message
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    setLoading(true);
    setStatus(null);

    try {
        
        const response = await axios.post('/contact/', formData); 
        
        if (response.status === 201) {
            setStatus('success');
            // Clearing the form on success
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    } catch (error) {
        console.error("Contact Form Submission Failed:", error.response || error);
        
        let errorMessage = "An error occurred. Please try again.";
        // Detailed validation errors from Django's 400 Bad Request response
        const errorData = error.response?.data;
        if (errorData && typeof errorData === 'object') {
            // Joins all error messages (e.g., if both name and email failed validation)
            errorMessage = Object.values(errorData).flat().join(', ');
        }
        
        setStatus(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col text-gray-800 overflow-x-hidden" style={{backgroundColor: '#E5E5E5'}}>
      <Navbar />
      {/* Navbar */}
      {/* <nav className="shadow-md sticky top-0 z-50 w-full" style={{backgroundColor: '#FFFFFF'}}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{color: '#0D1B2A'}}>Voluntra</h1>
          <ul className="hidden md:flex space-x-6 text-lg font-medium" style={{color: '#0D1B2A'}}>
            <li className="cursor-pointer transition-colors hover:opacity-80">Home</li>
            <li className="cursor-pointer transition-colors hover:opacity-80">About Us</li>
            <li className="cursor-pointer transition-colors hover:opacity-80">Events</li>
            <li className="cursor-pointer transition-colors" style={{color: '#D4AF37'}}>Contact Us</li>
          </ul>
          <button className="md:hidden text-2xl" style={{color: '#0D1B2A'}}>☰</button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="w-full text-white py-16 px-4 sm:px-6 lg:px-8 text-center" style={{backgroundColor: '#0D1B2A'}}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions or want to get involved? We'd love to hear from you. 
            Reach out to us and join the Voluntra community today.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFFFFF'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5'}}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <Mail className="w-8 h-8" style={{color: '#0D1B2A'}} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#0D1B2A'}}>Email Us</h3>
              <p style={{color: '#666'}}>voluntra@example.com</p>
              <p style={{color: '#666'}}>support@voluntra.org</p>
            </div>

            <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5'}}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <Phone className="w-8 h-8" style={{color: '#0D1B2A'}} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#0D1B2A'}}>Call Us</h3>
              <p style={{color: '#666'}}>+91 98765 43210</p>
              <p style={{color: '#666'}}>+91 87654 32109</p>
            </div>

            <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5'}}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#D4AF37'}}>
                <MapPin className="w-8 h-8" style={{color: '#0D1B2A'}} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#0D1B2A'}}>Visit Us</h3>
              <p style={{color: '#666'}}>123 Volunteer Street</p>
              <p style={{color: '#666'}}>Chennai, Tamil Nadu 600001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Additional Info */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#E5E5E5'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8 rounded-lg shadow-md" style={{backgroundColor: '#FFFFFF'}}>
              <h3 className="text-2xl font-bold mb-6" style={{color: '#0D1B2A'}}>Send us a Message</h3>
              
              <StatusMessage status={status} successMessage="Success! Thank you for your message." errorPrefix="Submission Failed: " />

              {/* Form Tag added and linked to submission handler */}
              <form onSubmit={handleSubmit} className="space-y-6"> 
                  <div>
                      <label className="block text-sm font-medium mb-2" style={{color: '#0D1B2A'}}>Full Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                            placeholder="Enter your full name" />
                  </div>

                  <div>
                      <label className="block text-sm font-medium mb-2" style={{color: '#0D1B2A'}}>Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                            placeholder="Enter your email address" />
                  </div>

                  <div>
                      <label className="block text-sm font-medium mb-2" style={{color: '#0D1B2A'}}>Subject *</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                            placeholder="What's this about?" />
                  </div>

                  <div>
                      <label className="block text-sm font-medium mb-2" style={{color: '#0D1B2A'}}>Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} required
                                rows="5"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors resize-vertical"
                                placeholder="Tell us more about how we can help you..."
                      ></textarea>
                  </div>

                  <button
                      type="submit" // CRITICAL: Use type="submit" to trigger form's onSubmit
                      className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:opacity-90"
                      style={{backgroundColor: '#D4AF37', color: '#0D1B2A'}}
                      disabled={loading} 
                  >
                      <Send className="mr-2 w-4 h-4" />
                      {loading ? 'Sending...' : 'Send Message'}
                  </button>
              </form>
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="p-6 rounded-lg shadow-md" style={{backgroundColor: '#FFFFFF'}}>
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 mr-3" style={{color: '#D4AF37'}} />
                  <h3 className="text-xl font-semibold" style={{color: '#0D1B2A'}}>Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm" style={{color: '#666'}}>
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 rounded-lg shadow-md" style={{backgroundColor: '#FFFFFF'}}>
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 mr-3" style={{color: '#D4AF37'}} />
                  <h3 className="text-xl font-semibold" style={{color: '#0D1B2A'}}>Join Our Community</h3>
                </div>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                    style={{backgroundColor: '#25D366', color: '#FFFFFF'}}
                  >
                    <MessageCircle className="mr-2 w-4 h-4" />
                    WhatsApp Community
                  </a>
                  
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:opacity-90"
                    style={{backgroundColor: '#E5E5E5', color: '#0D1B2A'}}
                  >
                    <Mail className="mr-2 w-4 h-4" />
                    Newsletter Signup
                  </button>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="p-6 rounded-lg shadow-md" style={{backgroundColor: '#FFFFFF'}}>
                <h3 className="text-xl font-semibold mb-3" style={{color: '#0D1B2A'}}>Frequently Asked Questions</h3>
                <p className="text-sm mb-4" style={{color: '#666'}}>
                  Find quick answers to common questions about volunteering, events, and our organization.
                </p>
                <button
                  className="px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:opacity-90"
                  style={{backgroundColor: '#D4AF37', color: '#0D1B2A'}}
                >
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFFFFF'}}>
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8" style={{color: '#0D1B2A'}}>Find Us</h3>
          <div className="h-64 rounded-lg flex items-center justify-center" style={{backgroundColor: '#E5E5E5'}}>
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2" style={{color: '#D4AF37'}} />
              <p style={{color: '#0D1B2A'}}>Interactive Map Coming Soon</p>
              <p className="text-sm" style={{color: '#666'}}>123 Volunteer Street, Chennai, Tamil Nadu 600001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center mt-auto" style={{backgroundColor: '#0D1B2A', color: '#FFFFFF'}}>
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">© {new Date().getFullYear()} Voluntra. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;