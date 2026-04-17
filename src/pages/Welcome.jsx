import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";

const WelcomePage = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col text-gray-800 overflow-x-hidden bg-brand-gray">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="w-full text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                Make a Difference Through Volunteering
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8">
                Join our community of changemakers and connect with NGOs making real impact.
                Your skills can transform lives and communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-brand-gold text-brand-navy font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:bg-brand-gold-dark transition flex items-center justify-center">
                  Get Started <span className="ml-2">→</span>
                </button>
                <button className="border-2 border-brand-gold text-brand-gold font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-brand-gold/10 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/volunteer-hero.jpg"
                alt="Volunteers working together"
                className="rounded-lg shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy">Upcoming Events</h3>
            <button className="mt-4 sm:mt-0 text-base sm:text-lg font-medium flex items-center text-brand-navy hover:text-brand-gold transition-colors">
              View All Events <span className="ml-2">→</span>
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((event) => (
              <div key={event} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="px-4 py-3 flex justify-between items-center bg-brand-navy text-white">
                  <span className="text-sm font-medium">20 spots left</span>
                  <span className="text-sm">9:00 AM - 2:00 PM</span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg sm:text-xl font-semibold mb-3 text-brand-navy">Event Title {event}</h4>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <span className="mr-2">📅</span>
                    <span>Sept 15, 2024</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <span className="mr-2">📍</span>
                    <span>Downtown Community Center</span>
                  </div>
                  <p className="mb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                    Join us for this amazing event that will make a real difference in our community.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-brand-gold text-brand-navy hover:bg-brand-gold-dark">
                      Register Now
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-brand-navy text-white hover:bg-brand-navy-light">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-brand-gray">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-brand-navy">About Us</h3>
          <p className="text-center leading-relaxed text-base sm:text-lg text-brand-navy">
            At <span className="font-bold text-brand-gold">Voluntra</span>, our mission is to create a
            platform that bridges the gap between NGOs and passionate volunteers.
            We aim to bring people together for social causes, organize impactful
            events, and contribute towards a better society.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-brand-navy">Contact Us</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a
              href="mailto:voluntra@example.com"
              className="flex items-center justify-center px-5 py-3 rounded-lg shadow transition-all duration-300 transform hover:scale-105 hover:opacity-90 bg-brand-gold text-brand-navy"
            >
              <Mail className="mr-2 w-4 h-4" /> Email Us
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-5 py-3 rounded-lg shadow transition-all duration-300 transform hover:scale-105 hover:opacity-90"
              style={{ backgroundColor: '#25D366', color: '#FFFFFF' }}
            >
              <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp
            </a>
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

export default WelcomePage;
