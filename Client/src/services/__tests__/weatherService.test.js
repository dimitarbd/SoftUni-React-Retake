import { getWeatherByCity, getWeatherForecast } from '../weatherService';

describe('Weather Service', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getWeatherByCity returns weather data', async () => {
    const mockWeatherData = {
      name: 'London',
      main: {
        temp: 20,
        humidity: 65
      }
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData
    });

    const result = await getWeatherByCity('London');
    expect(result).toEqual(mockWeatherData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('getWeatherByCity handles errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(getWeatherByCity('InvalidCity')).rejects.toThrow('Weather data not found');
  });
}); 