import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AddEventPage from '../features/ngo/AddEventPage.jsx';

const mockNavigate = vi.fn();
const mockPost = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../context/AuthContext.jsx', () => ({
    useAuth: () => ({ axiosInstance: { post: mockPost } }),
}));

const renderPage = () =>
    render(
        <MemoryRouter>
            <AddEventPage />
        </MemoryRouter>
    );

const fillRequiredFields = () => {
    fireEvent.change(screen.getByPlaceholderText('e.g., Beach Cleanup Drive'), {
        target: { value: 'Tree Planting', name: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Describe the event/i), {
        target: { value: 'Plant trees in the park.', name: 'description' },
    });
    const dateInput = document.querySelector('input[name="date"]');
    fireEvent.change(dateInput, { target: { value: '2025-12-01', name: 'date' } });
    const startInput = document.querySelector('input[name="startTime"]');
    fireEvent.change(startInput, { target: { value: '09:00', name: 'startTime' } });
    const endInput = document.querySelector('input[name="endTime"]');
    fireEvent.change(endInput, { target: { value: '12:00', name: 'endTime' } });
    fireEvent.change(screen.getByPlaceholderText(/Elliot's Beach/i), {
        target: { value: 'City Park', name: 'location' },
    });
};

describe('AddEventPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the form with all required fields', () => {
        renderPage();
        expect(screen.getByText('Create New Event')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('e.g., Beach Cleanup Drive')).toBeInTheDocument();
        expect(screen.getByLabelText('Publish Immediately (Make visible to volunteers)')).toBeInTheDocument();
    });

    it('navigates back to dashboard when back button is clicked', () => {
        renderPage();
        fireEvent.click(screen.getByText('Back to Dashboard'));
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/ngo');
    });

    it('shows success message after successful submission', async () => {
        mockPost.mockResolvedValueOnce({ status: 201 });
        renderPage();
        fillRequiredFields();

        fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

        await waitFor(() =>
            expect(screen.getByText(/Tree Planting.*created successfully/i)).toBeInTheDocument()
        );
    });

    it('shows error message when API returns validation errors', async () => {
        mockPost.mockRejectedValueOnce({
            response: {
                data: { title: ['This field is required.'] },
            },
        });
        renderPage();
        fillRequiredFields();

        fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

        await waitFor(() =>
            expect(screen.getByText('This field is required.')).toBeInTheDocument()
        );
    });

    it('shows fallback error message when API error has no data', async () => {
        mockPost.mockRejectedValueOnce(new Error('Network Error'));
        renderPage();
        fillRequiredFields();

        fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

        await waitFor(() =>
            expect(screen.getByText(/Failed to create event/i)).toBeInTheDocument()
        );
    });

    it('clears the form after successful submission', async () => {
        mockPost.mockResolvedValueOnce({ status: 201 });
        renderPage();
        fillRequiredFields();

        fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

        await waitFor(() =>
            expect(screen.getByPlaceholderText('e.g., Beach Cleanup Drive').value).toBe('')
        );
    });

    it('disables the submit button while loading', async () => {
        mockPost.mockImplementation(() => new Promise(() => {})); // never resolves
        renderPage();
        fillRequiredFields();

        fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

        expect(screen.getByRole('button', { name: /Creating.../i })).toBeDisabled();
    });
});
