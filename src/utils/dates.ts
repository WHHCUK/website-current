import format from 'date-fns/format';

export const isoToShortDate = (isoStr: string) =>
  format(new Date(isoStr), 'd MMM y');
