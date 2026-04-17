import React from "react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Clean-Up Drive",
      date: "2025-09-20",
      location: "Marina Beach, Chennai",
      volunteers: 45,
      description: "Join us for a beach cleaning initiative to protect our marine environment."
    },
    {
      id: 2,
      title: "Educational Support Program",
      date: "2025-09-25",
      location: "Government School, T. Nagar",
      volunteers: 20,
      description: "Help underprivileged children with their studies and career guidance."
    },
    {
      id: 3,
      title: "Food Distribution Drive",
      date: "2025-10-02",
      location: "Various Locations, Chennai",
      volunteers: 60,
      description: "Distribute meals to homeless and needy families across the city."
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col text-gray-800 overflow-x-hidden bg-brand-gray">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full text-white py-20 px-4 sm:px-6 lg:px-8 bg-brand-navy">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Making a Difference,
            <span className="block text-brand-gold">One Act at a Time</span>
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of volunteers across Chennai who are creating positive change in our communities.
            Together, we can build a better tomorrow for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:opacity-90 bg-brand-gold text-brand-navy">
              Become a Volunteer
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-300 transform hover:scale-105 border-brand-gold text-brand-gold">
              View Upcoming Events
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-brand-navy">Our Mission</h3>
            <p className="text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed text-gray-600">
              At <span className="font-bold text-brand-gold">Voluntra</span>, we believe in the power of
              collective action. Our platform connects passionate volunteers with meaningful NGO initiatives,
              creating lasting impact in communities across Tamil Nadu.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Users, title: "Connect", text: "Bridge the gap between volunteers and NGOs, creating meaningful partnerships for social good." },
              { icon: Calendar, title: "Organize", text: "Streamline event management and volunteer coordination for maximum community impact." },
              { icon: ArrowRight, title: "Impact", text: "Create lasting positive change in education, environment, health, and community development." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white border border-brand-gray">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-brand-gold">
                  <Icon className="w-10 h-10 text-brand-navy" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-brand-navy">{title}</h4>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-brand-gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-navy">Upcoming Events</h3>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              Join us in our upcoming volunteer initiatives and make a difference in your community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-3 text-brand-navy">{event.title}</h4>
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-brand-gold" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-brand-gold" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-brand-gold" />
                      {event.volunteers} volunteers registered
                    </div>
                  </div>
                  <p className="text-sm mb-6 leading-relaxed text-gray-600">{event.description}</p>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:opacity-90 bg-brand-gold text-brand-navy">
                      Register Now
                    </button>
                    <button className="px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:opacity-90 bg-brand-gray text-brand-navy">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:opacity-90 bg-brand-navy text-white hover:bg-brand-navy-light">
              View All Events
            </button>
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

export default HomePage;
