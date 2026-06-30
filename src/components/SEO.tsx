import { useEffect } from 'react';
import { SERVICE_PROCESSES, type ServiceProcess } from '../service-processes';
import {
  BUSINESS_AREA,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
} from '../seo-config';

type SEOProps = {
  pathname: string;
  activeService: ServiceProcess | null;
  isAdminPage: boolean;
};

function normalizePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', url);
}

function setJsonLd(data: unknown) {
  let element = document.getElementById('codexa-json-ld') as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.id = 'codexa-json-ld';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function buildJsonLd({
  title,
  description,
  canonicalUrl,
  activeService,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  activeService: ServiceProcess | null;
}) {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  const serviceCatalog = SERVICE_PROCESSES.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.summary,
      url: toAbsoluteUrl(`/procese/${service.slug}/`),
      provider: { '@id': organizationId },
      areaServed: BUSINESS_AREA,
    },
  }));

  const organization: Record<string, unknown> = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': organizationId,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: BUSINESS_AREA,
    priceRange: '$$',
    knowsAbout: SITE_KEYWORDS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicii digitale',
      itemListElement: serviceCatalog,
    },
  };

  if (CONTACT_EMAIL) {
    organization.email = CONTACT_EMAIL;
  }

  if (CONTACT_PHONE) {
    organization.telephone = CONTACT_PHONE;
  }

  const graph: Array<Record<string, unknown>> = [
    organization,
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: SITE_LANGUAGE,
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: SITE_LANGUAGE,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
    },
  ];

  if (activeService) {
    graph.push(
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: activeService.title,
        serviceType: activeService.kicker,
        description: activeService.heroDescription,
        provider: { '@id': organizationId },
        areaServed: BUSINESS_AREA,
        url: canonicalUrl,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'EUR',
          category: activeService.kicker,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Acasa',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Proces',
            item: toAbsoluteUrl('/#process'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: activeService.title,
            item: canonicalUrl,
          },
        ],
      },
    );
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export default function SEO({ pathname, activeService, isAdminPage }: SEOProps) {
  useEffect(() => {
    const normalizedPath = normalizePath(pathname);
    const canonicalUrl = isAdminPage ? toAbsoluteUrl('/admin') : toAbsoluteUrl(normalizedPath);
    const title = activeService
      ? `${activeService.title} | ${SITE_NAME}`
      : isAdminPage
        ? `Admin | ${SITE_NAME}`
        : `${SITE_NAME} | Agentie web design, dezvoltare custom si automatizari`;
    const description = activeService ? activeService.summary : SITE_DESCRIPTION;
    const robots = isAdminPage ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

    document.documentElement.lang = SITE_LANGUAGE;
    document.title = title;

    setCanonical(canonicalUrl);
    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('name', 'keywords', SITE_KEYWORDS.join(', '));
    setMeta('name', 'author', SITE_NAME);
    setMeta('property', 'og:locale', SITE_LOCALE);
    setMeta('property', 'og:type', activeService ? 'article' : 'website');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    setJsonLd(buildJsonLd({ title, description, canonicalUrl, activeService }));
  }, [activeService, isAdminPage, pathname]);

  return null;
}
