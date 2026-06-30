export type ServiceStep = {
  id: string;
  title: string;
  description: string;
};

export type ServiceProcess = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  heroDescription: string;
  duration: string;
  stack: string;
  outcome: string;
  deliverables: string[];
  steps: ServiceStep[];
};

export const SERVICE_PROCESSES: ServiceProcess[] = [
  {
    slug: 'landing-page-uri',
    index: '01',
    title: 'Landing Page-uri care trimit clar spre actiune',
    kicker: 'LANDING PAGES',
    summary:
      'Pagini construite pentru campanii, lead-uri si funnel-uri clare, cu design premium si redirect inteligent catre pasul urmator.',
    heroDescription:
      'Gandim landing page-ul ca o piesa de vanzare, nu ca o simpla pagina. Structuram mesajul, designul, redirect-urile si trigger-ele astfel incat vizitatorul sa inteleaga rapid oferta si sa ajunga exact unde trebuie.',
    duration: '7 - 14 zile',
    stack: 'Copywriting, UX, design custom, tracking, redirect logic',
    outcome: 'Pagina gata de campanii si conversii',
    deliverables: [
      'Wireframe si structura de conversie',
      'Design custom desktop + mobile',
      'Implementare front-end rapida',
      'Tracking pentru lead-uri si click-uri',
      'Redirect catre formular, checkout sau CRM',
    ],
    steps: [
      {
        id: 'lp-01',
        title: 'Clarificam oferta si obiectivul paginii',
        description:
          'Stabilim exact pentru ce construim pagina: lead generation, vanzare directa, rezervare sau redirect intr-un funnel mai mare.',
      },
      {
        id: 'lp-02',
        title: 'Organizam continutul si mesajul principal',
        description:
          'Punem in ordine headline-ul, beneficiile, dovada sociala, CTA-urile si punctele de incredere, ca pagina sa aiba ritm clar.',
      },
      {
        id: 'lp-03',
        title: 'Cream designul si experienta de scroll',
        description:
          'Desenam pagina in jurul brandului tau si lucram zona vizuala astfel incat fiecare sectiune sa sustina actiunea principala.',
      },
      {
        id: 'lp-04',
        title: 'Implementam redirect-urile si masurarea',
        description:
          'Legam butoanele si formularele de checkout, CRM, WhatsApp sau alte destinatii si configuram tracking pentru fiecare pas important.',
      },
      {
        id: 'lp-05',
        title: 'Testam si lansam pagina',
        description:
          'Verificam mobilul, viteza, textele, evenimentele si redirect-urile, apoi lansam pagina pregatita pentru trafic real.',
      },
    ],
  },
  {
    slug: 'magazine-online-custom',
    index: '02',
    title: 'Magazine online custom dezvoltate de la zero',
    kicker: 'CUSTOM ECOMMERCE',
    summary:
      'Pentru proiecte care au nevoie de control total: cod custom, CRM dedicat, baze de date, securitate si integrari complexe.',
    heroDescription:
      'Cand Shopify sau solutiile standard nu sunt suficiente, construim magazinul de la fundatie. Facem arhitectura, designul, baza de date, logica de business, CRM-ul intern si integrari de plata sau livrare exact pe fluxul tau.',
    duration: '4 - 10 saptamani',
    stack: 'Frontend custom, backend, CRM, baze de date, Netopia, securitate',
    outcome: 'Platforma e-commerce scalabila si control total',
    deliverables: [
      'Arhitectura tehnica si baza de date',
      'Design UI complet custom',
      'Panou de administrare / CRM intern',
      'Integrare Netopia si alte metode de plata',
      'Securitate, roluri, protectie si backup',
    ],
    steps: [
      {
        id: 'ce-01',
        title: 'Mapam procesele reale din business',
        description:
          'Pornim de la cum vin comenzile, cine le proceseaza, ce date trebuie stocate si ce fluxuri interne trebuie automatizate.',
      },
      {
        id: 'ce-02',
        title: 'Proiectam arhitectura, CRM-ul si baza de date',
        description:
          'Definim structura platformei, panoul intern, relatiile dintre entitati si regulile de business pe care va rula magazinul.',
      },
      {
        id: 'ce-03',
        title: 'Cream designul complet al platformei',
        description:
          'Construim interfata magazinului si zonele de administrare astfel incat totul sa fie premium, rapid si usor de operat.',
      },
      {
        id: 'ce-04',
        title: 'Dezvoltam modulele si integratiile cheie',
        description:
          'Implementam produsul, cosul, checkout-ul, Netopia, emailurile tranzactionale, conturile, gestiunea si eventualele API-uri externe.',
      },
      {
        id: 'ce-05',
        title: 'Securizam si testam fiecare flux',
        description:
          'Verificam accesul pe roluri, validarea datelor, securitatea platilor, performanta si scenariile critice din magazin.',
      },
      {
        id: 'ce-06',
        title: 'Lansam si pregatim administrarea pe termen lung',
        description:
          'Facem onboarding pentru echipa, documentam fluxurile esentiale si lansam platforma cu o baza curata pentru crestere.',
      },
    ],
  },
  {
    slug: 'shopify-custom',
    index: '03',
    title: 'Magazine Shopify cu cod custom si integrari complete',
    kicker: 'SHOPIFY CUSTOM',
    summary:
      'Construim pe Shopify, dar nu ne oprim la template. Facem custom code, automatizari, curierat, facturare si experienta curata.',
    heroDescription:
      'Shopify este rapid si stabil, dar adevarata diferenta vine din personalizare. Adaptam tema, construim sectiuni custom, optimizam conversia si legam magazinul cu plati, curieri, facturare si procesele tale reale.',
    duration: '2 - 5 saptamani',
    stack: 'Shopify, Liquid, custom sections, curieri, facturare, automatizari',
    outcome: 'Shopify premium, personalizat si gata de operare',
    deliverables: [
      'Setare magazin si structura produse',
      'Customizare tema si sectiuni',
      'Integrari curierat si AWB',
      'Facturare si emailuri tranzactionale',
      'Flux operational simplificat',
    ],
    steps: [
      {
        id: 'sh-01',
        title: 'Configuram fundatia magazinului',
        description:
          'Setam contul, colectiile, taxele, navigarea, paginile esentiale si structura de produse in functie de catalogul tau.',
      },
      {
        id: 'sh-02',
        title: 'Adaptam designul si codul la brand',
        description:
          'Personalizam tema, construim sectiuni Liquid custom si ajustam fiecare pagina importanta pentru o experienta premium.',
      },
      {
        id: 'sh-03',
        title: 'Implementam checkout si platile',
        description:
          'Configuram platile potrivite, zonele de incredere si toate detaliile care ajuta clientul sa finalizeze comanda fara frictiune.',
      },
      {
        id: 'sh-04',
        title: 'Legam curierii si facturarea',
        description:
          'Conectam platformele de livrare, generarea AWB-urilor si facturarea automata, astfel incat operatiunea zilnica sa fie simpla.',
      },
      {
        id: 'sh-05',
        title: 'Testam scenariile si lansam magazinul',
        description:
          'Verificam comenzile, emailurile, stocurile, livrarile si comportamentul pe mobil, apoi lansam magazinul in productie.',
      },
    ],
  },
  {
    slug: 'programe-si-automatizari',
    index: '04',
    title: 'Programe si automatizari pentru uz intern sau personal',
    kicker: 'AUTOMATIONS & TOOLS',
    summary:
      'De la scrappere si unelte de email, pana la sisteme de SMS, call center si pipeline-uri automate, construim exact ce ai nevoie.',
    heroDescription:
      'Aici pornim mereu de la idee si problema reala. Fie ca vrei un scrapper, un sistem de email marketing, un tool intern sau o integrare speciala, transformam cerinta intr-un program clar, stabil si usor de folosit.',
    duration: '1 - 6 saptamani',
    stack: 'Python, JavaScript, scraping, email, SMS, call flows, automatizari',
    outcome: 'Tool functional care iti economiseste timp',
    deliverables: [
      'Analiza ideii si a fluxului real',
      'Prototip tehnic si validare',
      'Dezvoltare script sau aplicatie',
      'Automatizari email / SMS / CRM',
      'Documentatie si mentenanta',
    ],
    steps: [
      {
        id: 'au-01',
        title: 'Ne spui ideea si obiectivul',
        description:
          'Pornim de la ce vrei sa obtii: colectare de date, trimitere automata, proces intern, lead-uri sau integrarea mai multor sisteme.',
      },
      {
        id: 'au-02',
        title: 'Traducem ideea intr-un flux tehnic clar',
        description:
          'Decidem ce surse de date exista, ce automatizari sunt posibile si care este cea mai simpla arhitectura pentru rezultat stabil.',
      },
      {
        id: 'au-03',
        title: 'Facem prototipul si validam scenariul',
        description:
          'Construim rapid prima versiune functionala ca sa verificam logica, datele si output-ul inainte de a extinde tool-ul.',
      },
      {
        id: 'au-04',
        title: 'Implementam automatizarile si integratiile',
        description:
          'Legam tool-ul de email, SMS, API-uri, dashboard-uri sau alte sisteme, in functie de ce trebuie sa faca efectiv.',
      },
      {
        id: 'au-05',
        title: 'Testam, documentam si predam',
        description:
          'Verificam erorile, stabilitatea, limitele si modul de utilizare, apoi predam tool-ul cu instructiuni clare.',
      },
    ],
  },
  {
    slug: 'design-si-branding',
    index: '05',
    title: 'Design si branding cu directie clara',
    kicker: 'BRANDING',
    summary:
      'Punem ordine in imaginea brandului tau: identitate, directie vizuala, sistem de folosire si materiale gata de lansare.',
    heroDescription:
      'Nu facem doar logo-uri izolate. Construim un sistem vizual coerent: ton, stil, culori, tipografie, reguli si materiale care se pot folosi usor in site, social media, prezentari si campanii.',
    duration: '1 - 3 saptamani',
    stack: 'Brand strategy, identity, logo, social kit, UI direction',
    outcome: 'Identitate vizuala coerenta si usor de aplicat',
    deliverables: [
      'Directie de brand si moodboard',
      'Logo si versiuni secundare',
      'Paleta, fonturi si reguli vizuale',
      'Social / deck / assets de baza',
      'Ghid scurt de folosire',
    ],
    steps: [
      {
        id: 'br-01',
        title: 'Clarificam pozitionarea brandului',
        description:
          'Discutam ce transmite brandul, cui se adreseaza si ce imagine trebuie sa lase in mintea oamenilor.',
      },
      {
        id: 'br-02',
        title: 'Stabilim directia vizuala',
        description:
          'Cream referinte, moodboard-uri si o directie de design care sa fie relevanta, distincta si sustenabila.',
      },
      {
        id: 'br-03',
        title: 'Construim identitatea principala',
        description:
          'Dezvoltam logo-ul, tipografia, culorile si structura de baza a sistemului vizual.',
      },
      {
        id: 'br-04',
        title: 'Aplicam brandul pe materiale reale',
        description:
          'Pregatim exemple concrete pentru online si offline: cover-uri, prezentari, postari, landing-uri sau mockup-uri relevante.',
      },
      {
        id: 'br-05',
        title: 'Predam pachetul final si regulile de folosire',
        description:
          'Organizam fisierele, versiunile si un ghid simplu ca brandul sa poata fi folosit coerent in continuare.',
      },
    ],
  },
  {
    slug: 'video-marketing',
    index: '06',
    title: 'Video marketing gandit pentru atentie si conversie',
    kicker: 'VIDEO MARKETING',
    summary:
      'Construim continut video pentru ads, social media si lansari, cu directie clara si productie adaptata platformei.',
    heroDescription:
      'Video-ul bun nu inseamna doar edit frumos. Inseamna hook puternic, ritm bun, mesaj clar si adaptare pentru canalul pe care va rula. Facem concept, script, directie vizuala si versiuni pentru multiple formate.',
    duration: '5 - 14 zile',
    stack: 'Concept, script, edit, motion, ad creatives, social formats',
    outcome: 'Pachet video pregatit de rulare',
    deliverables: [
      'Concept si unghi creativ',
      'Script sau structura de mesaj',
      'Edit si motion graphics',
      'Versiuni verticale / orizontale',
      'Exporturi pentru campanii',
    ],
    steps: [
      {
        id: 'vm-01',
        title: 'Stabilim scopul clipului',
        description:
          'Vedem daca video-ul trebuie sa vanda, sa explice, sa lanseze un produs sau sa creasca atentia in social media.',
      },
      {
        id: 'vm-02',
        title: 'Construim hook-ul si scenariul',
        description:
          'Punem cap la cap structura, mesajul, ritmul si secventele astfel incat primele secunde sa retina imediat atentia.',
      },
      {
        id: 'vm-03',
        title: 'Pregatim materialele si directia vizuala',
        description:
          'Organizam asset-urile video, grafica, textele, muzica si regulile vizuale pentru rezultatul final.',
      },
      {
        id: 'vm-04',
        title: 'Editam si optimizam pentru platforma',
        description:
          'Ajustam timing-ul, subtitrarile, hook-urile si exporturile pentru Meta, TikTok, YouTube sau campaniile tale dedicate.',
      },
      {
        id: 'vm-05',
        title: 'Livram versiunile finale si recomandari de folosire',
        description:
          'Predam fisierele finale, variantele de format si recomandari practice pentru publicare sau campanii.',
      },
    ],
  },
  {
    slug: 'administrare-si-mentenanta',
    index: '07',
    title: 'Administrare si mentenanta 24/7',
    kicker: 'MAINTENANCE',
    summary:
      'Monitorizare, backup, update-uri, reparatii rapide si suport continuu pentru proiectele care trebuie sa mearga fara pauza.',
    heroDescription:
      'Dupa lansare, partea importanta este stabilitatea. Ne ocupam de uptime, update-uri, securitate, backup, bug-fixing si interventii rapide, astfel incat proiectul sa ramana functional si sigur in fiecare zi.',
    duration: 'Abonament lunar',
    stack: 'Monitoring, update-uri, backup, securitate, suport tehnic',
    outcome: 'Proiect mentinut, protejat si actualizat',
    deliverables: [
      'Monitorizare 24/7',
      'Backup si restaurare',
      'Update-uri regulate',
      'Fix-uri rapide si suport',
      'Optimizari periodice',
    ],
    steps: [
      {
        id: 'mt-01',
        title: 'Preluam proiectul si evaluam starea actuala',
        description:
          'Verificam hostingul, panourile, accesul, versiunile, pluginurile, dependintele si eventualele riscuri tehnice existente.',
      },
      {
        id: 'mt-02',
        title: 'Setam monitorizarea si backup-urile',
        description:
          'Configuram alertele, punctele de control si copiile de siguranta astfel incat orice problema sa poata fi detectata si remediata rapid.',
      },
      {
        id: 'mt-03',
        title: 'Facem mentenanta periodica si update-uri',
        description:
          'Actualizam componentele relevante, verificam compatibilitatea si intervenim preventiv inainte sa apara blocaje reale.',
      },
      {
        id: 'mt-04',
        title: 'Intervenim rapid la bug-uri sau incidente',
        description:
          'Daca apare o problema, actionam direct pe simptom, cauza si rezolvare, fara sa lasam proiectul in stare instabila.',
      },
      {
        id: 'mt-05',
        title: 'Raportam si optimizam constant',
        description:
          'Iti aratam ce s-a facut, ce a fost prevenit si unde putem imbunatati performanta sau siguranta proiectului.',
      },
    ],
  },
  {
    slug: 'seo-performanta-si-optimizare',
    index: '08',
    title: 'SEO tehnic, performanta si optimizare pentru conversii',
    kicker: 'SEO & PERFORMANCE',
    summary:
      'Optimizam viteza, structura, indexarea si experienta paginilor ca site-ul sa fie mai rapid, mai clar si mai usor de gasit.',
    heroDescription:
      'Un site bun trebuie sa arate bine, dar trebuie si sa incarce rapid, sa fie inteles de motoarele de cautare si sa transforme vizitele in actiuni. Analizam partea tehnica, continutul, structura, performanta si punctele unde utilizatorii se pot bloca.',
    duration: '1 - 4 saptamani',
    stack: 'SEO tehnic, Core Web Vitals, analytics, tracking, CRO',
    outcome: 'Site mai rapid, mai clar si mai pregatit pentru crestere',
    deliverables: [
      'Audit tehnic si raport de prioritati',
      'Optimizare viteza si imagini',
      'Structura SEO pentru pagini importante',
      'Tracking evenimente si conversii',
      'Recomandari pentru continut si UX',
    ],
    steps: [
      {
        id: 'seo-01',
        title: 'Analizam starea actuala a site-ului',
        description:
          'Verificam viteza, structura paginilor, indexarea, erorile tehnice, comportamentul pe mobil si punctele care pot afecta conversia.',
      },
      {
        id: 'seo-02',
        title: 'Stabilim prioritatile cu impact real',
        description:
          'Separarea lucrurilor importante de detaliile mici este esentiala. Alegem ce trebuie rezolvat prima data pentru rezultate vizibile.',
      },
      {
        id: 'seo-03',
        title: 'Optimizam performanta si experienta',
        description:
          'Lucram pe imagini, cod, incarcare, layout, microcopy si structura astfel incat site-ul sa fie rapid si placut de folosit.',
      },
      {
        id: 'seo-04',
        title: 'Configuram masurarea actiunilor importante',
        description:
          'Setam evenimentele si conversiile importante, ca sa poti vedea ce functioneaza si unde trebuie imbunatatit mai departe.',
      },
      {
        id: 'seo-05',
        title: 'Predam raportul si directia de crestere',
        description:
          'La final ai o imagine clara asupra modificarilor facute si asupra urmatorilor pasi pentru trafic, conversii si stabilitate.',
      },
    ],
  },
  {
    slug: 'integrari-api-crm-si-sisteme',
    index: '09',
    title: 'Integrari API, CRM si sisteme conectate intre ele',
    kicker: 'API & INTEGRATIONS',
    summary:
      'Conectam site-ul sau magazinul cu CRM-uri, plati, curieri, facturare, email, SMS si tool-uri interne care trebuie sa lucreze impreuna.',
    heroDescription:
      'Multe businessuri pierd timp pentru ca datele stau imprastiate in mai multe platforme. Construim integrari curate intre sisteme, automatizam transferul de date si facem fluxurile interne mai rapide, mai sigure si mai usor de urmarit.',
    duration: '1 - 5 saptamani',
    stack: 'API-uri, CRM, webhook-uri, baze de date, plati, automatizari',
    outcome: 'Sisteme conectate si procese operationale mai rapide',
    deliverables: [
      'Mapare fluxuri si surse de date',
      'Integrare API sau webhook-uri',
      'Conectare CRM / email / SMS',
      'Sincronizare comenzi si clienti',
      'Testare erori, loguri si fallback-uri',
    ],
    steps: [
      {
        id: 'api-01',
        title: 'Inventariem sistemele care trebuie conectate',
        description:
          'Vedem ce platforme folosesti, ce date trebuie mutate intre ele si care sunt momentele unde procesul manual consuma timp.',
      },
      {
        id: 'api-02',
        title: 'Desenam fluxul tehnic si regulile de sincronizare',
        description:
          'Stabilim cand se trimit datele, in ce format, ce campuri sunt obligatorii si ce trebuie sa se intample daca apare o eroare.',
      },
      {
        id: 'api-03',
        title: 'Construim integrarea si validarile',
        description:
          'Implementam API-urile, webhook-urile, logica de transformare a datelor si verificarile care tin fluxul stabil.',
      },
      {
        id: 'api-04',
        title: 'Testam scenarii reale si cazuri limita',
        description:
          'Verificam comenzi, clienti, plati, emailuri, erori si duplicate, ca integrarea sa reziste in utilizarea de zi cu zi.',
      },
      {
        id: 'api-05',
        title: 'Lansam si monitorizam primele sincronizari',
        description:
          'Dupa lansare urmarim primele rulari, ajustam unde este nevoie si documentam modul in care functioneaza integrarea.',
      },
    ],
  },
];

export function getServiceProcessBySlug(slug: string) {
  return SERVICE_PROCESSES.find((service) => service.slug === slug);
}
