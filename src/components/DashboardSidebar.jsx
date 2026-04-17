import { Home, LogOut } from "lucide-react";

const DashboardSidebar = ({ navItems, activeTab, onTabChange, username, onHome, onSignOut, homeInNav = false }) => (
    <aside className="w-64 bg-brand-navy text-white flex flex-col p-4 shadow-xl">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-brand-gold">Voluntra</h1>
        </div>

        {username && (
            <div className="mt-4 mb-8">
                <p className="text-sm text-gray-400">Logged in as:</p>
                <h2 className="text-lg font-semibold text-white">{username}</h2>
            </div>
        )}

        <nav className="flex-1">
            <ul className="space-y-2">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <li key={id}>
                        <button
                            onClick={() => onTabChange(id)}
                            className={`w-full flex items-center p-3 rounded-lg font-medium transition-colors ${
                                activeTab === id
                                    ? "bg-brand-navy-light text-brand-gold border-r-4 border-brand-gold"
                                    : "text-gray-300 hover:bg-brand-navy-light hover:text-brand-gold"
                            }`}
                        >
                            <Icon size={18} className="mr-3" />
                            <span>{label}</span>
                        </button>
                    </li>
                ))}
                {homeInNav && (
                    <li>
                        <button
                            onClick={onHome}
                            className="w-full flex items-center p-3 rounded-lg font-medium text-gray-300 hover:bg-brand-navy-light hover:text-white transition-colors"
                        >
                            <Home size={18} className="mr-3" />
                            <span>Home</span>
                        </button>
                    </li>
                )}
            </ul>
        </nav>

        <div className="mt-auto border-t border-gray-700 pt-4">
            {!homeInNav && (
                <button
                    onClick={onHome}
                    className="w-full flex items-center p-3 rounded-lg font-medium text-gray-300 hover:bg-brand-navy-light hover:text-white transition-colors"
                >
                    <Home size={18} className="mr-3" />
                    <span>Home</span>
                </button>
            )}
            <button
                onClick={onSignOut}
                className="w-full flex items-center p-3 rounded-lg font-medium text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
            >
                <LogOut size={18} className="mr-3" />
                <span>Sign Out</span>
            </button>
        </div>
    </aside>
);

export default DashboardSidebar;
