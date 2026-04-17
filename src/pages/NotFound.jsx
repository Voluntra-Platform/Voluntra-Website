import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-navy">
            <h1 className="text-8xl font-bold text-brand-gold">404</h1>
            <p className="text-2xl text-white mt-4 mb-8">Page not found</p>
            <Link
                to="/"
                className="px-6 py-3 rounded-lg font-semibold transition-colors bg-brand-gold text-brand-navy hover:bg-brand-gold-dark"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
