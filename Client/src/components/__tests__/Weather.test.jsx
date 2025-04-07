import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Weather from '../Weather';
import { getWeatherByCity } from '../../services/weatherService';

// Mock the weather service
jest.mock('../../services/weatherService');

describe('Weather Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders weather search form', () => {
    render(<Weather />);
    expect(screen.getByPlaceholderText('Enter city name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('displays weather data when search is successful', async () => {
    const mockWeatherData = {
      name: 'London',
      main: {
        temp: 20,
        humidity: 65
      },
      weather: [{ description: 'clear sky' }]
    };

    getWeatherByCity.mockResolvedValueOnce(mockWeatherData);

    render(<Weather />);
    
    const input = screen.getByPlaceholderText('Enter city name');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('Temperature: 20°C')).toBeInTheDocument();
      expect(screen.getByText('Humidity: 65%')).toBeInTheDocument();
      expect(screen.getByText('Weather: clear sky')).toBeInTheDocument();
    });
  });

  test('displays error message when search fails', async () => {
    getWeatherByCity.mockRejectedValueOnce(new Error('Weather data not found'));

    render(<Weather />);
    
    const input = screen.getByPlaceholderText('Enter city name');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'InvalidCity' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch weather data')).toBeInTheDocument();
    });
  });
}); 