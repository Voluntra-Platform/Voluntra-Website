import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "../utils/axiosInstance";
import StatusMessage from "../components/StatusMessage.jsx";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const response = await axios.post('/contact/', formData);
      if (response.status === 201) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error("Contact Form Submission Failed:", error.response || error);
      let errorMessage = "An error occurred. Please try again.";
      const errorData = error.response?.data;
      if (errorData && typeof errorData === 'object') {
        errorMessage = Object.values(errorData).flat().join(', ');
      }
      setStatus(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col text-gray-800 overflow-x-hidden bg-brand-gray">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full text-white py-16 px-4 sm:px-6 lg:px-8 text-center bg-brand-navy">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions or want to get involved? We'd love to hear from you.
            Reach out to us and join the Voluntra community today.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              { icon: Mail, title: "Email Us", lines: ["voluntra@example.com", "support@voluntra.org"] },
              { icon: Phone, title: "Call Us", lines: ["+91 98765 43210", "+91 87654 32109"] },
              { icon: MapPin, title: "Visit Us", lines: ["123 Volunteer Street", "Chennai, Tamil Nadu 600001"] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white border border-brand-gray">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-brand-gold">
                  <Icon className="w-8 h-8 text-brand-navy" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-brand-navy">{title}</h3>
                {lines.map((l) => <p key={l} className="text-gray-600">{l}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Additional Info */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-brand-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8 rounded-lg shadow-md bg-white">
              <h3 className="text-2xl font-bold mb-6 text-brand-navy">Send us a Message</h3>

              <StatusMessage status={status} successMessage="Success! Thank you for your message." errorPrefix="Submission Failed: " />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-navy">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                    placeholder="Enter your full name" aria-label="Full Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-navy">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                    placeholder="Enter your email address" aria-label="Email Address" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-navy">Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                    placeholder="What's this about?" aria-label="Subject" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-navy">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors resize-vertical"
                    placeholder="Tell us more about how we can help you..." aria-label="Message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:opacity-90 bg-brand-gold text-brand-navy"
                  disabled={loading}
                >
                  <Send className="mr-2 w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              <div className="p-6 rounded-lg shadow-md bg-white">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 mr-3 text-brand-gold" />
                  <h3 className="text-xl font-semibold text-brand-navy">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  {[["Monday - Friday:", "9:00 AM - 6:00 PM"], ["Saturday:", "10:00 AM - 4:00 PM"], ["Sunday:", "Closed"]].map(([day, hours]) => (
                    <div key={day} className="flex justify-between"><span>{day}</span><span>{hours}</span></div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-lg shadow-md bg-white">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 mr-3 text-brand-gold" />
                  <h3 className="text-xl font-semibold text-brand-navy">Join Our Community</h3>
                </div>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                    style={{ backgroundColor: '#25D366', color: '#FFFFFF' }}
                  >
                    <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp Community
                  </a>
                  <button className="w-full flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:opacity-90 bg-brand-gray text-brand-navy">
                    <Mail className="mr-2 w-4 h-4" /> Newsletter Signup
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-3 text-brand-navy">Frequently Asked Questions</h3>
                <p className="text-sm mb-4 text-gray-600">
                  Find quick answers to common questions about volunteering, events, and our organization.
                </p>
                <button className="px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:opacity-90 bg-brand-gold text-brand-navy">
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-brand-navy">Find Us</h3>
          <div className="h-64 rounded-lg flex items-center justify-center bg-brand-gray">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-brand-gold" />
              <p className="text-brand-navy">Interactive Map Coming Soon</p>
              <p className="text-sm text-gray-600">123 Volunteer Street, Chennai, Tamil Nadu 600001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center mt-auto bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">© {new Date().getFullYear()} Voluntra. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
