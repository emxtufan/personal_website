export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://esa-coder-solutions.com').replace(/\/$/, '');
export const SITE_NAME = 'Esa Coder Solutions';
export const SITE_ALTERNATE_NAME = 'Codexa Studio';
export const SITE_LOCALE = 'ro_RO';
export const SITE_LANGUAGE = 'ro-RO';
export const SITE_DESCRIPTION =
  'Agentie de web design si dezvoltare custom: landing page-uri, magazine online, Shopify, automatizari, aplicatii web, integrari API, SEO tehnic si mentenanta.';
export const SITE_KEYWORDS = [
  'agentie web design',
  'dezvoltare website custom',
  'magazin online custom',
  'Shopify Romania',
  'automatizari business',
  'aplicatii web',
  'frontend development',
  'SEO tehnic',
  'mentenanta website',
];

export const CONTACT_EMAIL = '';
export const CONTACT_PHONE = '+40755938367';
export const CONTACT_PHONE_DISPLAY = '0755 938 367';
export const BUSINESS_AREA = 'Romania';

export function toAbsoluteUrl(pathname = '/') {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${cleanPath}`;
}
