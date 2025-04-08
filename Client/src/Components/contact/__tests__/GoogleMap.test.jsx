import { render } from '@testing-library/react';
import GoogleMap from '../GoogleMap';

// Mock the Google Maps API
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useEffect: (callback) => callback(),
  };
});

describe('GoogleMap Component', () => {
  beforeEach(() => {
    // Mock the Google Maps API
    window.google = {
      maps: {
        Map: jest.fn(),
        Marker: jest.fn(),
      },
    };
  });

  test('renders without crashing', () => {
    const { container } = render(<GoogleMap />);
    expect(container.firstChild).toHaveStyle({ height: '400px', width: '100%' });
  });
}); 