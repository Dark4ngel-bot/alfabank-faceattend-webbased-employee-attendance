export const ALFABANK_EMAIL_DOMAIN = "@alfabankjogja.com";
export const ALFABANK_EMAIL_EXAMPLE = `nama${ALFABANK_EMAIL_DOMAIN}`;

export const CREATIVEMU_EMAIL_DOMAIN = ALFABANK_EMAIL_DOMAIN;
export const CREATIVEMU_EMAIL_EXAMPLE = ALFABANK_EMAIL_EXAMPLE;

export function isValidEmailFormat(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

export function isCreativemuEmail(email: string) {
  return isAlfabankEmail(email);
}

export function isAlfabankEmail(email: string) {
  return email.trim().toLowerCase().endsWith(ALFABANK_EMAIL_DOMAIN);
}
