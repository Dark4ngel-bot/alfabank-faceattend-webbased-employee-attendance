export const CREATIVEMU_EMAIL_DOMAIN = "@alfabank.ac.id";
export const CREATIVEMU_EMAIL_EXAMPLE = `nama${CREATIVEMU_EMAIL_DOMAIN}`;

export function isValidEmailFormat(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

export function isCreativemuEmail(email: string) {
  return email.trim().toLowerCase().endsWith(CREATIVEMU_EMAIL_DOMAIN);
}

