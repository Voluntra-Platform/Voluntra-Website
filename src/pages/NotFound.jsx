import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#0D1B2A" }}>
            <h1 className="text-8xl font-bold" style={{ color: "#D4AF37" }}>404</h1>
            <p className="text-2xl text-white mt-4 mb-8">Page not found</p>
            <Link
                to="/"
                className="px-6 py-3 rounded-lg font-semibold transition-colors"
                style={{ backgroundColor: "#D4AF37", color: "#0D1B2A" }}
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
