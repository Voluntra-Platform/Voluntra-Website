import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';

// Mock the axios instance used inside AuthContext
vi.mock('../utils/axiosInstance', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
    },
}));

import axiosInstance from '../utils/axiosInstance';

const mockNavigate = vi.fn();

// Consumer component to expose context values for assertions
const AuthConsumer = () => {
    const { user, loading, authError, authStep, checkedUsername } = useAuth();
    return (
        <div>
            <span data-testid="loading">{String(loading)}</span>
            <span data-testid="user">{user ? JSON.stringify(user) : 'null'}</span>
            <span data-testid="authError">{authError || 'none'}</span>
            <span data-testid="authStep">{authStep}</span>
            <span data-testid="checkedUsername">{checkedUsername || 'none'}</span>
        </div>
    );
};

const renderWithProvider = () =>
    render(
        <AuthProvider navigate={mockNavigate}>
            <AuthConsumer />
        </AuthProvider>
    );

describe('AuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('initialization', () => {
        it('sets loading to false after checking localStorage (no stored user)', async () => {
            renderWithProvider();
            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );
            expect(screen.getByTestId('user').textContent).toBe('null');
        });

        it('restores user from localStorage when valid user_data and access_token exist', async () => {
            const storedUser = { username: 'alice', role: 'volunteer' };
            localStorage.setItem('access_token', 'tok123');
            localStorage.setItem('user_data', JSON.stringify(storedUser));

            renderWithProvider();
            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );
            expect(screen.getByTestId('user').textContent).toContain('alice');
        });

        it('clears corrupt localStorage data and keeps user null', async () => {
            localStorage.setItem('access_token', 'tok123');
            localStorage.setItem('user_data', '{invalid json}');

            renderWithProvider();
            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );
            expect(screen.getByTestId('user').textContent).toBe('null');
        });

        it('clears user_data when stored user has no role field', async () => {
            localStorage.setItem('access_token', 'tok123');
            localStorage.setItem('user_data', JSON.stringify({ username: 'noRole' }));

            renderWithProvider();
            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );
            expect(screen.getByTestId('user').textContent).toBe('null');
        });
    });

    describe('checkUser', () => {
        it('sets authStep to 2 when username exists', async () => {
            axiosInstance.post.mockResolvedValueOnce({ data: { exists: true } });

            let authCtx;
            const Capture = () => {
                authCtx = useAuth();
                return null;
            };

            render(
                <AuthProvider navigate={mockNavigate}>
                    <AuthConsumer />
                    <Capture />
                </AuthProvider>
            );

            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );

            await act(async () => { await authCtx.checkUser('existinguser'); });

            expect(screen.getByTestId('authStep').textContent).toBe('2');
            expect(screen.getByTestId('checkedUsername').textContent).toBe('existinguser');
        });

        it('sets authStep to 3 when username does not exist', async () => {
            axiosInstance.post.mockResolvedValueOnce({ data: { exists: false } });

            let authCtx;
            const Capture = () => { authCtx = useAuth(); return null; };

            render(
                <AuthProvider navigate={mockNavigate}>
                    <AuthConsumer />
                    <Capture />
                </AuthProvider>
            );

            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );

            await act(async () => { await authCtx.checkUser('newuser'); });

            expect(screen.getByTestId('authStep').textContent).toBe('3');
        });

        it('sets authError when check_user API call fails', async () => {
            axiosInstance.post.mockRejectedValueOnce(new Error('Network Error'));

            let authCtx;
            const Capture = () => { authCtx = useAuth(); return null; };

            render(
                <AuthProvider navigate={mockNavigate}>
                    <AuthConsumer />
                    <Capture />
                </AuthProvider>
            );

            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );

            await act(async () => { await authCtx.checkUser('someuser'); });

            expect(screen.getByTestId('authError').textContent).toContain('Error checking user');
        });
    });

    describe('login', () => {
        it('sets user and navigates to volunteer dashboard on successful login', async () => {
            const volunteerUser = { username: 'vol1', role: 'volunteer' };
            axiosInstance.post.mockResolvedValueOnce({
                data: { access: 'access_tok', refresh: 'refresh_tok' },
            });
            axiosInstance.get.mockResolvedValueOnce({ data: volunteerUser });

            let authCtx;
            const Capture = () => { authCtx = useAuth(); return null; };

            render(
                <AuthProvider navigate={mockNavigate}>
                    <AuthConsumer />
                    <Capture />
                </AuthProvider>
            );

            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );

            await act(async () => { await authCtx.login('vol1', 'password'); });

            expect(screen.getByTestId('user').textContent).toContain('vol1');
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard/volunteer');
            expect(localStorage.getItem('access_token')).toBe('access_tok');
        });

        it('sets user and navigates to ngo dashboard for ngo role', async () => {
            const ngoUser = { username: 'ngo1', role: 'ngo' };
            axiosInstance.post.mockResolvedValueOnce({
                data: { access: 'a', refresh: 'r' },
            });
            axiosInstance.get.mockResolvedValueOnce({ data: ngoUser });

            let authCtx;
            const Capture = () => { authCtx = useAuth(); return null; };

            render(
                <AuthProvider navigate={mockNavigate}>
                    <AuthConsumer />
                    <Capture />
                </AuthProvider>
            );

            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );

            await act(async () => { await authCtx.login('ngo1', 'password'); });

            expect(mockNavigate).toHaveBeenCalledWith('/dashboard/ngo');
        });

        it('sets authError when credentials are wrong (401)', async () => {
            axiosInstance.post.mockRejectedValueOnce({
                response: { status: 401, data: { detail: 'No active account' } },
            });

            let authCtx;
            const Capture = () => { authCtx = useAuth(); return null; };

            render(
                <AuthProvider navigate={mockNavigate}>
                    <AuthConsumer />
                    <Capture />
                </AuthProvider>
            );

            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );

            await act(async () => { await authCtx.login('bad', 'creds'); });

            expect(screen.getByTestId('authError').textContent).toContain('Login failed');
            expect(screen.getByTestId('user').textContent).toBe('null');
        });
    });

    describe('logout', () => {
        it('clears user state, localStorage, and navigates to /', async () => {
            localStorage.setItem('access_token', 'tok');
            localStorage.setItem('refresh_token', 'ref');
            localStorage.setItem('user_data', JSON.stringify({ username: 'u', role: 'volunteer' }));

            let authCtx;
            const Capture = () => { authCtx = useAuth(); return null; };

            render(
                <AuthProvider navigate={mockNavigate}>
                    <AuthConsumer />
                    <Capture />
                </AuthProvider>
            );

            await waitFor(() =>
                expect(screen.getByTestId('user').textContent).toContain('volunteer')
            );

            act(() => { authCtx.logout(); });

            await waitFor(() =>
                expect(screen.getByTestId('user').textContent).toBe('null')
            );

            expect(localStorage.getItem('access_token')).toBeNull();
            expect(localStorage.getItem('refresh_token')).toBeNull();
            expect(localStorage.getItem('user_data')).toBeNull();
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    describe('resetAuthStep', () => {
        it('resets authStep to 1 and clears checkedUsername and authError', async () => {
            axiosInstance.post.mockResolvedValueOnce({ data: { exists: true } });

            let authCtx;
            const Capture = () => { authCtx = useAuth(); return null; };

            render(
                <AuthProvider navigate={mockNavigate}>
                    <AuthConsumer />
                    <Capture />
                </AuthProvider>
            );

            await waitFor(() =>
                expect(screen.getByTestId('loading').textContent).toBe('false')
            );

            await act(async () => { await authCtx.checkUser('alice'); });
            expect(screen.getByTestId('authStep').textContent).toBe('2');

            act(() => { authCtx.resetAuthStep(); });

            expect(screen.getByTestId('authStep').textContent).toBe('1');
            expect(screen.getByTestId('checkedUsername').textContent).toBe('none');
        });
    });
});
