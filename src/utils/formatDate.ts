import { format as formatDateFns } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

type LocaleType = 'en' | 'vi';
type CommonFormat = 'short' | 'long' | 'full' | 'time' | 'datetime';

const formatMap: Record<string, string> = {
  short: 'dd/MM/yyyy',
  long: 'dd MMMM yyyy',
  full: 'PPPP',
  time: 'HH:mm',
  datetime: 'dd/MM/yyyy HH:mm',
};

/**
 * Format a date string or Date object with optional locale and common format
 * @param date - Input date (string or Date)
 * @param formatStr - Common format keyword or custom date-fns format
 * @param locale - Language code ('en' | 'vi')
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date,
  formatStr: CommonFormat = 'short',
  locale: LocaleType = 'en',
): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  const localeMap = {
    en: enUS,
    vi: vi,
  };

  const resolvedFormat = formatMap[formatStr] || formatStr;

  return formatDateFns(parsedDate, resolvedFormat, {
    locale: localeMap[locale],
  });
};
