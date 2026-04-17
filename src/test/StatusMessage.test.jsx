import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusMessage from '../components/StatusMessage.jsx';

describe('StatusMessage', () => {
    it('renders nothing when status is null', () => {
        const { container } = render(<StatusMessage status={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders success state from object shape', () => {
        render(<StatusMessage status={{ type: 'success', message: 'Event created!' }} />);
        expect(screen.getByText('Event created!')).toBeInTheDocument();
    });

    it('renders error state from object shape', () => {
        render(<StatusMessage status={{ type: 'error', message: 'Something went wrong' }} />);
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('renders success from string shape using successMessage prop', () => {
        render(
            <StatusMessage
                status="success"
                successMessage="Form submitted successfully!"
            />
        );
        expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
    });

    it('renders error from string shape using errorPrefix prop', () => {
        render(
            <StatusMessage
                status="Network error"
                errorPrefix="Error: "
            />
        );
        expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });

    it('applies green classes for success', () => {
        const { container } = render(
            <StatusMessage status={{ type: 'success', message: 'OK' }} />
        );
        expect(container.firstChild).toHaveClass('bg-green-100', 'text-green-700');
    });

    it('applies red classes for error', () => {
        const { container } = render(
            <StatusMessage status={{ type: 'error', message: 'Fail' }} />
        );
        expect(container.firstChild).toHaveClass('bg-red-100', 'text-red-700');
    });
});
