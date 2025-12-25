import { CALENDAR_YEAR, TIMEZONE } from '../constants';

export const getBogotaDate = (): Date => {
  const now = new Date();
  const bogotaTimeDetails = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const part = (type: string) => parseInt(bogotaTimeDetails.find(p => p.type === type)?.value || '0', 10);
  
  // Construct a date object representing "now" in Bogota, but as a local date object
  // so we can compare day/month easily.
  return new Date(part('year'), part('month') - 1, part('day'), part('hour'), part('minute'), part('second'));
};

export const isCardUnlocked = (day: number): boolean => {
  // TEMPORAL: Desbloquear tarjeta 25 para previsualización
  // TODO: Eliminar esta línea después de la previsualización
  // if (day === 25) return true;
  
  const now = getBogotaDate();
  
  // If year is past the calendar year, unlock all
  if (now.getFullYear() > CALENDAR_YEAR) return true;
  // If year is before, lock all
  if (now.getFullYear() < CALENDAR_YEAR) return false;

  // We are in the calendar year.
  // Assuming December is month 11 (0-indexed)
  const DECEMBER = 11;
  
  if (now.getMonth() < DECEMBER) return false; // Not December yet
  if (now.getMonth() > DECEMBER) return true; // Past December

  // It is December
  return now.getDate() >= day;
};