const ENDPOINT =
  'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=58.0180&lon=7.4310';

const OFFSETS = [0, 3, 6, 9];

export interface ForecastPoint {
  time: string;
  temp: number;
  speed: number;
  from: number;
  gust?: number; // compact-endepunktet oppgir ikke alltid kastdata
}

export const FALLBACK: ForecastPoint = {
  time: '',
  temp: 19,
  speed: 5,
  from: 225,
  gust: 8,
};

interface MetInstantDetails {
  air_temperature: number;
  wind_speed: number;
  wind_from_direction: number;
  wind_speed_of_gust?: number;
}

interface MetTimeseriesEntry {
  time: string;
  data: {
    instant: {
      details: MetInstantDetails;
    };
  };
}

interface MetResponse {
  properties: {
    timeseries: MetTimeseriesEntry[];
  };
}

export async function fetchForecast(): Promise<ForecastPoint[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`MET svarte ${res.status}`);
  const json: MetResponse = await res.json();
  const serie = json.properties.timeseries;
  return OFFSETS.map((i) => {
    const entry = serie[Math.min(i, serie.length - 1)];
    const d = entry.data.instant.details;
    return {
      time: entry.time,
      temp: d.air_temperature,
      speed: d.wind_speed,
      from: d.wind_from_direction,
      gust: d.wind_speed_of_gust,
    };
  });
}
