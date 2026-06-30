import { FeatureItem, PricingPlan, WorkflowStep, Testimonial, FAQItem } from './types';

export const FEATURES: FeatureItem[] = [
  {
    id: 'web-creation',
    title: 'Creare Site-uri Custom',
    description: 'Dezvoltăm site-uri de prezentare de mare impact, portofolii și landing page-uri optimizate pentru conversie, scrise cu tehnologii de ultimă generație.',
    iconName: 'Laptop',
    metric: '100%',
    metricLabel: 'Scor Google PageSpeed',
    codeSnippet: `// Componentă React Premium pentru Site Prezentare
import React from 'react';
import { motion } from 'framer-motion';

export const PremiumHero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.h1 className="text-5xl font-extrabold tracking-tight text-white">
        Transformăm ideea ta într-o <span className="text-zinc-400">experiență digitală</span>
      </motion.h1>
      <p className="max-w-xl mt-4 text-zinc-400">Design exclusivist, adaptat pe toate ecranele.</p>
    </div>
  );
};`,
    badge: 'UX/UI & Dev'
  },
  {
    id: 'ecommerce',
    title: 'Magazine Online complete',
    description: 'Soluții e-commerce complete (Shopify, WooCommerce sau Custom) cu plăți securizate, facturare automată, integrări curieri și panou intuitiv de administrare.',
    iconName: 'ShoppingBag',
    metric: '0.8s',
    metricLabel: 'Timp mediu de încărcare',
    codeSnippet: `// Integrare Securizată Stripe Checkout & Gestiune Stocuri
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(cartItems: any[]) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cartItems.map(item => ({
      price_data: {
        currency: 'ron',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'https://site-ul-tau.ro/succes',
    cancel_url: 'https://site-ul-tau.ro/cos',
  });
}`,
    badge: 'Vânzări Directe'
  },
  {
    id: 'administration',
    title: 'Administrare & Mentenanță',
    description: 'Ne ocupăm de backup zilnic, actualizări constante, monitorizare uptime, rezolvare bug-uri și optimizări SEO lunare ca tu să te poți concentra pe afacerea ta.',
    iconName: 'Wrench',
    metric: '24/7',
    metricLabel: 'Uptime Monitorizat',
    codeSnippet: `// Script Automat Backup Zilnic & Verificare Securitate
import { backupDatabase, scanForVulnerabilities } from './sys-admin';

export async function dailyMaintenanceTask() {
  console.log('[SYSTEM] Începere backup baza de date...');
  const backup = await backupDatabase();
  
  console.log('[SYSTEM] Scanare fișiere împotriva malware-ului...');
  const securityReport = await scanForVulnerabilities();
  
  return {
    status: backup.success && securityReport.clean ? 'SECURE_AND_UPDATED' : 'WARN',
    timestamp: new Date().toISOString()
  };
}`,
    badge: 'Siguranță Totală'
  },
  {
    id: 'branding',
    title: 'Design Grafic & Prototipare',
    description: 'De la design de logo și identitate vizuală completă, până la wireframe-uri interactive în Figma, îți conturăm brandul înainte de a scrie prima linie de cod.',
    iconName: 'Palette',
    metric: 'Figma',
    metricLabel: 'Prototip Interactiv',
    codeSnippet: `// Configurație Tailwind CSS - Identitate Vizuală Studio
export const creativeTheme = {
  colors: {
    primary: '#ffffff',
    background: '#0a0d11',
    accent: '#f4f4f5', // Zinc-100
    brandGold: '#eab308',
  },
  typography: {
    sans: 'Inter, system-ui, sans-serif',
    display: 'Space Grotesk, sans-serif'
  }
};`,
    badge: 'Identitate Brand'
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: 1,
    title: 'Brief & Design Figma',
    description: 'Discutăm structura, analizăm publicul țintă și creăm design-ul vizual în Figma. Îți oferim un prototip interactiv pe care îl perfecționăm împreună.',
    illustrationType: 'code'
  },
  {
    number: 2,
    title: 'Dezvoltare & Integrare',
    description: 'Transformăm design-ul aprobat în cod de înaltă calitate, complet responsive. Integrăm funcționalitățile dorite, magazinul online și panoul de administrare.',
    illustrationType: 'nodes'
  },
  {
    number: 3,
    title: 'Testare & Lansare Oficială',
    description: 'Efectuăm teste riguroase de performanță, viteză și securitate. Conectăm domeniul, configurăm serverul, optimizăm SEO on-page și lansăm site-ul.',
    illustrationType: 'logs'
  }
];

export const RELIABILITY_PRINCIPLES = [
  {
    title: 'Performanță de top la încărcare',
    description: 'Optimizăm fiecare imagine, script și linie de cod pentru ca site-ul tău să se încarce instantaneu pe mobil și desktop. Acest lucru îți garantează o poziționare mai bună pe Google.',
    details: 'Uptime garantat de 99.9% pe hosting de viteză.'
  },
  {
    title: 'Securitate și protecție maximă',
    description: 'Fiecare site dezvoltat de noi include certificate SSL, configurări de securitate împotriva atacurilor cibernetice și module de monitorizare permanentă.',
    details: 'Conformitate GDPR și protecție activă Firewall.'
  },
  {
    title: 'Panou de administrare intuitiv',
    description: 'Fie că este Shopify, WordPress sau o platformă custom, te vei putea descurca excelent. Îți oferim ghiduri video pentru a învăța cum să adaugi singur produse sau text.',
    details: 'Asistență tehnică 1-la-1 inclusă la fiecare proiect.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'prezentare',
    name: 'Site Prezentare',
    priceMonthly: 299,
    priceYearly: 249,
    description: 'Ideal pentru liber-profesioniști, clinici, avocați sau afaceri la început de drum.',
    features: [
      'Design UX/UI complet personalizat',
      'Până la 5 pagini responsive',
      'Formular contact & integrare WhatsApp',
      'Optimizare SEO On-Page de bază',
      'Integrare rețele sociale',
      'Certificat SSL gratuit inclus'
    ],
    ctaText: 'Alege Planul'
  },
  {
    id: 'magazin',
    name: 'Magazin Online',
    priceMonthly: 799,
    priceYearly: 649,
    description: 'Pentru afacerile pregătite să vândă produse fizice sau digitale la nivel național.',
    features: [
      'Design e-commerce premium custom',
      'Produse nelimitate & categorii structurate',
      'Plată online card (Stripe / Netopia)',
      'Integrare curieri (Sameday / Fan / DPD)',
      'Generare automată de facturi (FGO / SmartBill)',
      'Instruire video administrare magazin',
      'Urmărire coșuri abandonate'
    ],
    isPopular: true,
    ctaText: 'Dezvoltă Magazinul'
  },
  {
    id: 'custom',
    name: 'Platformă Custom / Admin',
    priceMonthly: 1499,
    priceYearly: 1299,
    description: 'Sisteme complexe, CRM-uri, directoare sau site-uri mari cu cerințe speciale.',
    features: [
      'Arhitectură custom (Next.js / Express)',
      'Bază de date scalabilă dedicată',
      'Sisteme de conturi pentru utilizatori',
      'Panou de administrare ultra-customizat',
      'Integrări API externe complexe',
      'Garanție completă de cod de 12 luni',
      'Suport tehnic dedicat prioritar'
    ],
    ctaText: 'Solicită Propunere'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Andrei Popescu',
    handle: 'andrei_clinica',
    role: 'Fondator',
    companyName: 'DentSmile',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    content: "Băieții de la Codexa ne-au refăcut complet site-ul clinicii stomatologice. Am văzut o creștere de 45% a programărilor online în primele două luni datorită vitezei site-ului și a designului simplu."
  },
  {
    id: '2',
    name: 'Elena Ionescu',
    handle: 'elena_boutique',
    role: 'Owner',
    companyName: 'Boutique-ul de haine',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    content: "Magazinul nostru online pe Shopify zbârnâie! Integrarea automată cu curierii și sistemul de facturare ne salvează ore întregi în fiecare zi. Recomand cu toată încrederea."
  },
  {
    id: '3',
    name: 'Mihai Radu',
    handle: 'mihai_tech',
    role: 'Director Operațiuni',
    companyName: 'LogiTrans',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    content: "Administrarea site-ului este ireproșabilă. Nu ne mai facem griji de servere căzute sau actualizări stricate. Suportul tehnic răspunde la orice oră și rezolvă problemele în minute."
  },
  {
    id: '4',
    name: 'Diana Stan',
    handle: 'diana_creative',
    role: 'Marketing Manager',
    companyName: 'Alpha Academy',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    content: "Identitatea vizuală primită de la designerii lor a fost genială. Figma mock-up-ul a arătat exact ca site-ul final, fără promisiuni nerealiste. Un flux de lucru extrem de profesionist."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Cât timp durează realizarea unui site web?',
    answer: 'Un site de prezentare simplu durează de obicei între 7 și 14 zile. Un magazin online complex pe Shopify sau WooCommerce durează în medie între 15 și 30 de zile, iar o platformă web customizată poate dura peste 45 de zile, în funcție de funcționalitățile dorite.'
  },
  {
    id: 'faq-2',
    question: 'Site-ul va fi optimizat pentru telefoanele mobile?',
    answer: 'Absolut. Peste 70% din traficul de pe internet provine de pe mobil. Toate site-urile noastre sunt dezvoltate cu filozofia "Mobile-First", garantând că se văd și funcționează impecabil pe orice telefon, tabletă sau monitor mare.'
  },
  {
    id: 'faq-3',
    question: 'Ce presupune serviciul de administrare și mentenanță?',
    answer: 'Serviciul include monitorizarea continuă a funcționării site-ului, actualizări săptămânale ale platformei, modulelor și temelor, backup zilnic securizat, măsuri active anti-hacking, corectare de erori ce pot apărea și adăugare/modificare de conținut în limita orelor incluse.'
  },
  {
    id: 'faq-4',
    question: 'Mă puteți ajuta cu un magazin online dacă am mii de produse?',
    answer: 'Sigur! Putem configura structuri complexe de baze de date sau putem importa automat produsele din fișiere Excel, feed-uri XML sau alte platforme vechi pentru a reduce la minimum efortul tău.'
  },
  {
    id: 'faq-5',
    question: 'Cum se procedează cu găzduirea (hosting) și domeniul?',
    answer: 'Dacă nu deții deja, te ajutăm să achiziționezi cel mai potrivit domeniu (.ro, .com, etc.) și un pachet de găzduire stabil. Colaborăm cu furnizori de top din România pentru a asigura o viteză maximă de încărcare locală.'
  },
  {
    id: 'faq-6',
    question: 'Cum se realizează plata proiectelor?',
    answer: 'Pentru transparență deplină, lucrăm pe bază de avans de 30-50% înainte de începerea proiectului, iar restul sumei se achită doar după ce site-ul este complet finalizat, testat și gata de lansare în conformitate cu cerințele agreate.'
  },
  {
    id: 'faq-7',
    question: 'Oferiți factură fiscală și contract de colaborare?',
    answer: 'Da, toate serviciile noastre se desfășoară legal pe bază de contract comercial semnat de ambele părți și factură fiscală. Oferim, de asemenea, perioadă de garanție extinsă la cod după predarea proiectului.'
  },
  {
    id: 'faq-8',
    question: 'Ce se întâmplă după ce site-ul este lansat?',
    answer: 'Nu te lăsăm singur! Îți oferim un tutorial video înregistrat special pentru site-ul tău în care îți arătăm cum să schimbi texte, imagini sau să adaugi produse noi. De asemenea, poți opta pentru unul din abonamentele noastre accesibile de mentenanță.'
  }
];
