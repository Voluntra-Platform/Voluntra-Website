import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Calendar, Users } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar.jsx';

const navItems = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'volunteers', label: 'Volunteers', icon: Users },
];

const defaultProps = {
    navItems,
    activeTab: 'events',
    onTabChange: vi.fn(),
    username: 'testuser',
    onHome: vi.fn(),
    onSignOut: vi.fn(),
};

describe('DashboardSidebar', () => {
    it('renders the Voluntra brand name', () => {
        render(<DashboardSidebar {...defaultProps} />);
        expect(screen.getByText('Voluntra')).toBeInTheDocument();
    });

    it('displays username when provided', () => {
        render(<DashboardSidebar {...defaultProps} />);
        expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    it('does not display username section when username is not provided', () => {
        render(<DashboardSidebar {...defaultProps} username={undefined} />);
        expect(screen.queryByText('Logged in as:')).not.toBeInTheDocument();
    });

    it('renders all nav items', () => {
        render(<DashboardSidebar {...defaultProps} />);
        expect(screen.getByText('Events')).toBeInTheDocument();
        expect(screen.getByText('Volunteers')).toBeInTheDocument();
    });

    it('calls onTabChange with the correct id when a nav button is clicked', () => {
        const onTabChange = vi.fn();
        render(<DashboardSidebar {...defaultProps} onTabChange={onTabChange} />);
        fireEvent.click(screen.getByText('Volunteers'));
        expect(onTabChange).toHaveBeenCalledWith('volunteers');
    });

    it('calls onSignOut when Sign Out button is clicked', () => {
        const onSignOut = vi.fn();
        render(<DashboardSidebar {...defaultProps} onSignOut={onSignOut} />);
        fireEvent.click(screen.getByText('Sign Out'));
        expect(onSignOut).toHaveBeenCalledTimes(1);
    });

    it('calls onHome when Home button is clicked (footer mode)', () => {
        const onHome = vi.fn();
        render(<DashboardSidebar {...defaultProps} onHome={onHome} homeInNav={false} />);
        fireEvent.click(screen.getByText('Home'));
        expect(onHome).toHaveBeenCalledTimes(1);
    });

    it('renders Home inside nav list when homeInNav is true', () => {
        render(<DashboardSidebar {...defaultProps} homeInNav={true} />);
        const nav = screen.getByRole('list');
        expect(nav).toContainElement(screen.getByText('Home'));
    });

    it('does NOT render Home in nav list when homeInNav is false', () => {
        render(<DashboardSidebar {...defaultProps} homeInNav={false} />);
        const nav = screen.getByRole('list');
        const homeButtons = screen.getAllByText('Home');
        // Home is in footer, not nav list
        homeButtons.forEach((btn) => {
            expect(nav).not.toContainElement(btn);
        });
    });
});
