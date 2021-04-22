export const capitalise = (str?: string): string | undefined => str 
  ? `${str.charAt(0).toUpperCase()}${str.substr(1)}`
  : undefined;

export const capitaliseEachWord = (str?: string): string | undefined => str 
  ? str.split(' ').map(s => capitalise(s)).join(' ') 
  : undefined;

export const slugToLabel = (str?: string): string | undefined => str 
  ? capitaliseEachWord(str.replace('-', ' '))
  : undefined;