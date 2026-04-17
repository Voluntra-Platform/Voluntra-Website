import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';

// Mock AuthContext so we can control user/loading state
vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: vi.fn(),
}));

import { useAuth } from '../context/AuthContext.jsx';

const ProtectedPage = () => <div>Protected Content</div>;

const renderWithRoute = (allowedRoles) =>
    render(
        <MemoryRouter initialEntries={['/protected']}>
            <Routes>
                <Route element={<ProtectedRoute allowedRoles={allowedRoles} />}>
                    <Route path="/protected" element={<ProtectedPage />} />
                </Route>
                <Route path="/login" element={<div>Login Page</div>} />
                <Route path="/home" element={<div>Home Page</div>} />
            </Routes>
        </MemoryRouter>
    );

describe('ProtectedRoute', () => {
    it('shows loading indicator while auth is being determined', () => {
        useAuth.mockReturnValue({ user: null, loading: true });
        renderWithRoute(['volunteer']);
        expect(screen.getByText('Loading user session...')).toBeInTheDocument();
    });

    it('redirects unauthenticated user to /login', () => {
        useAuth.mockReturnValue({ user: null, loading: false });
        renderWithRoute(['volunteer']);
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('renders protected content for user with matching role', () => {
        useAuth.mockReturnValue({ user: { role: 'volunteer' }, loading: false });
        renderWithRoute(['volunteer']);
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('redirects user with wrong role to /home', () => {
        useAuth.mockReturnValue({ user: { role: 'corporate' }, loading: false });
        renderWithRoute(['volunteer']);
        expect(screen.getByText('Home Page')).toBeInTheDocument();
    });

    it('renders content when user has one of multiple allowed roles', () => {
        useAuth.mockReturnValue({ user: { role: 'ngo' }, loading: false });
        renderWithRoute(['volunteer', 'ngo', 'corporate']);
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('renders content when allowedRoles is not specified (open to all authenticated users)', () => {
        useAuth.mockReturnValue({ user: { role: 'volunteer' }, loading: false });
        renderWithRoute(undefined);
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
});
