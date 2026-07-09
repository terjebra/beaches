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
    lat: 58.0215,
    lon: 7.443,
    venderMot: 165,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2007/Norge/Agder/Lindesnes/Sj%C3%B8sanden',
  },
  {
    id: 'lordens',
    navn: 'Lordens',
    lat: 58.0163,
    lon: 7.4368,
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
    lat: 58.0139,
    lon: 7.4305,
    venderMot: 180,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316230/Norge/Agder/Lindesnes/Kanelstranda',
  },
  {
    id: 'spidsbo',
    navn: 'Spidsbo',
    lat: 58.0139,
    lon: 7.4265,
    venderMot: 190,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316234/Norge/Agder/Lindesnes/Spidsbo',
  },
  {
    id: 'banken',
    navn: 'Banken',
    lat: 58.0163,
    lon: 7.423,
    venderMot: 245,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2039/Norge/Agder/Lindesnes/Banken',
  },
  {
    id: 'lillebanken',
    navn: 'Lillebanken',
    lat: 58.0203,
    lon: 7.4238,
    venderMot: 285,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316238/Norge/Agder/Lindesnes/Lillebanken',
  },
  {
    id: 'torkelshola',
    navn: 'Torkelshola',
    lat: 58.0186,
    lon: 7.4206,
    venderMot: 270,
    yr: null,
  },
  {
    id: 'lambertstranda',
    navn: 'Lambertstranda',
    lat: 58.0233,
    lon: 7.4222,
    venderMot: 205,
    yr: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-2316312/Norge/Agder/Lindesnes/Bankebukta',
  },
];
