import { useQuery } from '@tanstack/react-query';
import { FALLBACK, fetchForecast, type ForecastPoint } from '../lib/met';

export interface UseForecastResult {
  forecast: ForecastPoint[];
  isError: boolean;
}

export function useForecast(): UseForecastResult {
  const { data, isError } = useQuery({
    queryKey: ['forecast'],
    queryFn: fetchForecast,
    staleTime: 30 * 60 * 1000,
    retry: 2,
  });

  return {
    forecast: data ?? [{ ...FALLBACK, time: new Date().toISOString() }],
    isError,
  };
}
