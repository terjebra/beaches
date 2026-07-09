export interface Beach {
  id: string;
  navn: string;
  lat: number;
  lon: number;
  venderMot: number; // kompassretning ut mot havet, grader
  yr: string | null; // lenke til fullt varsel på Yr
}

export const BEACHES: Beach[] = [
  {
    id: 'sjosanden',
    navn: 'Sjøsanden',
    lat: 58.0202217,
    lon: 7.4488752,
    venderMot: 165,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2007/Norge/Agder/Lindesnes/Sj%C3%B8sanden',
  },
  {
    id: 'lordens',
    navn: 'Lordens',
    lat: 58.0159995,
    lon: 7.4409779,
    venderMot: 130,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316229/Norge/Agder/Lindesnes/Lordens',
  },
  {
    id: 'stumpestrendene',
    navn: 'Stumpestrendene',
    lat: 58.0138,
    lon: 7.4335,
    venderMot: 175,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316231/Norge/Agder/Lindesnes/Stumpestrendene',
  },
  {
    id: 'kanelstranda',
    navn: 'Kanelstranda',
    lat: 58.0148437,
    lon: 7.4372559,
    venderMot: 180,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316230/Norge/Agder/Lindesnes/Kanelstranda',
  },
  {
    id: 'spidsbo',
    navn: 'Spidsbo',
    lat: 58.0148845,
    lon: 7.4343025,
    venderMot: 190,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316234/Norge/Agder/Lindesnes/Spidsbo',
  },
  {
    id: 'banken',
    navn: 'Banken',
    lat: 58.0169109,
    lon: 7.430882,
    venderMot: 245,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2039/Norge/Agder/Lindesnes/Banken',
  },
  {
    id: 'lillebanken',
    navn: 'Lillebanken',
    lat: 58.0186277,
    lon: 7.4302677,
    venderMot: 285,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316238/Norge/Agder/Lindesnes/Lillebanken',
  },
  {
    id: 'torkelshola',
    navn: 'Torkelshola',
    lat: 58.0183384,
    lon: 7.4284982,
    venderMot: 270,
    yr: null,
  },
  {
    id: 'lambertstranda',
    navn: 'Lambertstranda',
    lat: 58.0219956,
    lon: 7.4323051,
    venderMot: 205,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316312/Norge/Agder/Lindesnes/Bankebukta',
  },
];
