import React, { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = useMemo(() => [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Contact Us", path: "/contact" },
  ], []);

  return (
    <nav className="shadow-md sticky top-0 z-50 w-full bg-brand-navy">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-bold text-brand-gold">
          Voluntra
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8 text-base lg:text-lg font-medium text-white">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`cursor-pointer transition-colors ${
                  location.pathname === link.path ? "text-brand-gold" : "hover:text-brand-gold"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => navigate('/login')} className="text-white hover:text-brand-gold transition-colors">
            Sign In
          </button>
          <button onClick={() => navigate('/login')} className="bg-brand-gold text-brand-navy px-4 py-2 rounded-lg hover:bg-brand-gold-dark transition-colors font-semibold">
            Register
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 bg-brand-navy shadow-lg transition-all">
          <div className="py-4">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.name} className="px-8 py-3">
                  <Link
                    to={link.path}
                    className={`block transition-colors ${
                      location.pathname === link.path ? "text-brand-gold" : "text-white hover:text-brand-gold"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="px-8 py-3">
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="text-brand-gold hover:text-white transition-colors w-full text-left">
                  Sign In
                </button>
              </li>
              <li className="px-8 py-3">
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="bg-brand-gold text-brand-navy px-4 py-2 rounded-lg hover:bg-brand-gold-dark transition-colors w-full">
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
