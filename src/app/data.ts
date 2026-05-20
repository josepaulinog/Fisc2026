import {
  Calendar,
  Globe,
  Users,
  Mic,
  FileText,
  Play,
  Download,
  Image as ImageIcon,
} from "lucide-react";
import logoUrl from "../imports/Asset_1.svg";
import aboutImage from "../imports/about.png";
import aboutHeroImage from "../imports/about-hero.png";
import agendaImage from "../imports/agenda.jpeg";

// Trinidad & Tobago editorial photography — sourced from AdobeStock, copied
// into src/imports/ during the prototype build. Replaces the earlier generic
// Unsplash placeholders so the prototype reads as the actual destination.
import portOfSpainAerial from "../imports/port-of-spain-aerial.jpg";
import maracasBeach from "../imports/maracas-beach.jpg";
import maracasCabin from "../imports/maracas-cabin.jpg";
import scarletIbis from "../imports/scarlet-ibis.jpg";
import queensRoyalCollege from "../imports/queens-royal-college.jpg";
import carnivalDancer from "../imports/carnival-dancer.jpg";

// Host-country officials — Trinidad & Tobago is FISC 2026's host, so the
// 2025 Timor-Leste keynotes are replaced by the current PM and Minister of
// Finance.
import kamlaPersadBissessar from "../imports/kamla-persad-bissessar.png";
import davendranathTancoo from "../imports/davendranath-tancoo.png";

// Manuel Schiappa Pietra portrait — bundled locally so the prototype isn't
// dependent on the live FISC WP-uploads CDN and the headshot can be tuned
// without round-tripping through the WordPress media library.
import manuelPietra from "../imports/manuel-pietra.png";

export const FB_LOGO = logoUrl;
export const HERO_IMG = portOfSpainAerial;
export const ABOUT_IMG = aboutImage;
export const VENUE_IMG_1 = maracasCabin;
export const VENUE_IMG_2 = queensRoyalCollege;
export const VENUE_IMG_3 =
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80";

export const HERO_ABOUT = aboutHeroImage;
export const HERO_AGENDA = agendaImage;
export const HERO_SPEAKERS =
  "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=2000&q=85";
export const HERO_VENUE = maracasBeach;
export const HERO_RESOURCES =
  "https://images.unsplash.com/photo-1568667256549-094345857637?w=2000&q=85";
export const HERO_ATTENDEES =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=2000&q=85";
export const HERO_MATERIALS =
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=2000&q=85";
export const HERO_GUIDE = maracasBeach;
export const HERO_GALLERY =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=2000&q=85";
export const HERO_VIDEOS =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2000&q=85";
export const HERO_MEDIA =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=2000&q=85";
export const HERO_SIGNIN =
  "https://replicate.delivery/xezq/jWh9MKFLGZ61KBEdNPT1P2TyowbN0EMHzWeJv4pmILjfSlXUA/tmp6_134lj_.jpg";

export const VENUE_HOTEL =
  "https://images.unsplash.com/photo-1455587734955-081b22074882?w=2000&q=85";
export const VENUE_STREET = portOfSpainAerial;
export const VENUE_FOOD =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80";
export const VENUE_STEELPAN = carnivalDancer;
export const VENUE_NATURE = scarletIbis;

export const BRAND = "#fd6b18";
export const BRAND_SOFT = "#ffb27a";
export const INK = "#0a0a0a";

export type NavChild = { label: string; to: string; gated?: boolean };
export type NavItem = { label: string; to?: string; children?: NavChild[] };

export const navItems: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "Agenda", to: "/agenda" },
  { label: "Speakers", to: "/speakers" },
  { label: "Venue", to: "/venue" },
  {
    label: "Resources",
    to: "/resources",
    children: [
      { label: "Delegate Guide", to: "/delegate-guide", gated: true },
      { label: "Materials", to: "/materials", gated: true },
      { label: "Videos", to: "/videos", gated: true },
      { label: "Gallery", to: "/gallery", gated: true },
      { label: "Media Coverage", to: "/media-coverage", gated: true },
      { label: "Delegate Community", to: "/attendees", gated: true },
    ],
  },
];

export const stats = [
  { value: "40+", label: "Countries", icon: Globe },
  { value: "300+", label: "Delegates", icon: Users },
  { value: "25+", label: "Sessions", icon: Mic },
  { value: "4", label: "Days", icon: Calendar },
];

export type Session = {
  time: string;
  title: string;
  desc?: string;
  tag?: "Presentation" | "Workshop" | "Demonstration" | "Panel";
  speakers?: { name: string; role: string; img?: string }[];
  /** Titles of related entries in `materials`, looked up at render time. */
  materials?: string[];
};

/**
 * URL slug derived from a day's `short` label.
 * "Welcome" → "welcome", "Day 1" → "day-1", etc.
 * Used by the /agenda/:daySlug/:sessionIdx detail route.
 */
export function daySlugFor(day: { short: string }): string {
  return day.short.toLowerCase().replace(/\s+/g, "-");
}

export type AgendaDay = {
  label: string;
  date: string;
  short: string;
  sessions: Session[];
};

export const S = {
  matthew: { name: "Matthew Olivier", role: "VP, Revenue Marketing", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/matthew-oliver.png" },
  carolyn: { name: "Carolyn Bowick", role: "Director of Marketing Communication", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/carolyn2.jpeg" },
  manuel: { name: "Manuel Schiappa Pietra", role: "President and CEO", img: manuelPietra },
  tancoo: { name: "Davendranath Tancoo", role: "Minister of Finance", img: davendranathTancoo },
  kamla:  { name: "The Hon. Kamla Persad-Bissessar", role: "Prime Minister", img: kamlaPersadBissessar },
  aldo: { name: "Aldo Sagastume", role: "VP, Public Financial Management", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/aldo-bustamante.png" },
  pedro: { name: "Pedro Jorge", role: "VP, Research and Development", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/pedro-jorge.png" },
  doug: { name: "Doug Hadden", role: "EVP, Strategy and Innovation", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/doug-hadden.jpg" },
  gerard: { name: "Gerard Rao", role: "VP, Services", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/gerard-rao.jpg" },
  fbStaff: { name: "FreeBalance Staff", role: "" },
  customers: { name: "Customer Representatives", role: "" },
};

export const agenda: AgendaDay[] = [
  {
    label: "Welcome Reception & Gala Dinner",
    date: "Sun · Jun 28, 2026",
    short: "Welcome",
    sessions: [
      { time: "6:00 PM – 10:00 PM", title: "Welcome Reception & Gala Dinner at Hyatt Regency", desc: "Join us for a gala dinner with performances from local Trinidad & Tobago cultural artists and a live music band." },
    ],
  },
  {
    label: "Day 1",
    date: "Mon · Jun 29, 2026",
    short: "Day 1",
    sessions: [
      { time: "8:45 AM – 9:30 AM", title: "Welcome", desc: "A session to greet participants and introduce the main themes of the conference.", speakers: [S.matthew, S.carolyn] },
      { time: "9:30 AM – 10:00 AM", title: "Opening Remarks", desc: "Official conference opening by the Minister of Finance and the CEO of FreeBalance.", speakers: [S.manuel, S.tancoo] },
      { time: "10:00 AM – 11:00 AM", title: "Implement Public Financial Management for National Strategies", tag: "Presentation", materials: ["FreeBalance Chart of Goals", "Government Performance Management", "Key Performance Indicators"], desc: "What should be the North Star for government performance in your country? This session builds the case for aligning public finance classifications and programs directly with national development strategies and other strategic objectives.", speakers: [S.manuel] },
      { time: "11:00 AM – 11:30 AM", title: "Break" },
      { time: "11:30 AM – 12:00 PM", title: "Address from Prime Minister", tag: "Presentation", desc: "Address from the Prime Minister of Trinidad and Tobago.", speakers: [S.kamla] },
      { time: "12:00 PM – 1:00 PM", title: "Group Photo" },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:30 PM", title: "Workshop: Government Public Finances Practices Country Experiences", tag: "Workshop", desc: "How have governments achieved public finance objectives even in difficult circumstances? This session highlights obstacles overcome and successes achieved by FreeBalance customers.", speakers: [S.fbStaff] },
      { time: "3:30 PM – 4:00 PM", title: "Closing Remarks", desc: "A summary of the first day's discussions, highlighting key lessons and setting expectations for the coming sessions." },
      { time: "5:00 PM – 6:30 PM", title: "Cultural Tour" },
      { time: "7:00 PM – 10:00 PM", title: "Dinner at Local Restaurant", desc: "Evening dinner featuring local and international cuisine." },
    ],
  },
  {
    label: "Day 2",
    date: "Tue · Jun 30, 2026",
    short: "Day 2",
    sessions: [
      { time: "8:45 AM – 9:00 AM", title: "Opening Remarks", desc: "Brief welcome and overview of the day's agenda." },
      { time: "9:00 AM – 10:30 AM", title: "What's New: FreeBalance Accountability Suite Product", tag: "Demonstration", materials: ["FreeBalance Suite Functionality", "FreeBalance Advisory Services"], desc: "What has FreeBalance been developing since the last FISC in 2019? This session will focus on new functionality including: Medium-Term Financial Frameworks, biometrics, legislative oversight, and drill-down dashboards with demonstrations.", speakers: [S.aldo] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 1:00 PM", title: "Workshop: Implementing Public Financial Management for National Strategies", tag: "Workshop", materials: ["FreeBalance Chart of Goals", "Balanced Scorecard", "Objectives and Key Results"], desc: "How can government performance management theory become reality? This workshop demonstrates how to align public accounting with performance management through integration of a Chart of Accounts with a Chart of Goals.", speakers: [S.aldo] },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:30 PM", title: "Workshop: Government Public Finances Practices Aspirations", tag: "Workshop", desc: "How can governments leverage FISC lessons? Subjects include Government Resource Planning (GRP), progressive activation, project management, organizational change management, and capacity building.", speakers: [S.fbStaff] },
      { time: "3:30 PM – 4:30 PM", title: "What's New: FreeBalance Accountability Platform", tag: "Presentation", desc: "How can an open platform protect your public finance investment? This session describes our open system mandate with deployment portability.", speakers: [S.pedro] },
      { time: "4:30 PM – 5:30 PM", title: "FreeBalance Product Roadmap Introduction", tag: "Presentation", materials: ["FreeBalance Suite Functionality"], desc: "How can you influence FreeBalance product priorities? This session introduces you to new product ideas generated from recent FreeBalance experience in the PFM world, research, conferences, and government tenders.", speakers: [S.doug] },
      { time: "5:30 PM – 6:00 PM", title: "Closing Remarks", desc: "Brief summary and recap of the day's events." },
      { time: "6:00 PM – 6:30 PM", title: "Free time" },
      { time: "7:30 PM – 10:00 PM", title: "Dinner at Sky Garden", desc: "A fantastic dining experience awaits at Sky Garden." },
    ],
  },
  {
    label: "Day 3",
    date: "Wed · Jul 1, 2026",
    short: "Day 3",
    sessions: [
      { time: "8:45 AM – 9:00 AM", title: "Opening Remarks", desc: "Brief welcome and overview of the day's agenda." },
      { time: "9:00 AM – 10:30 AM", title: "Digital Public Finance Framework", tag: "Presentation", materials: ["Digital Public Finance Framework"], desc: "How can public finance transform digitally? Governments are increasingly looking to technology to improve outcomes and efficiency. This session introduces the FreeBalance Digital Public Finance Framework Template, covering digital readiness, digital scope, digital maturity, public finance reform and digital core.", speakers: [S.doug] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 1:00 PM", title: "Artificial Intelligence in Public Finance", tag: "Demonstration", materials: ["AI Tools to Consider", "Digital Public Finance Framework"], desc: "Should AI automate or augment public service activities? This session builds the case for human-augmented PFM as the more effective and ethical choice. We'll introduce the FreeBalance human augmentation and open system approach, explore prompt engineering examples for research, summarization, and insight.", speakers: [S.doug] },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:00 PM", title: "What's New: FreeBalance Services", tag: "Presentation", desc: "How can public finance project success rates improve? This session describes Key Success Factors and why agile approaches are more successful than legacy waterfall.", speakers: [S.gerard] },
      { time: "3:00 PM – 3:15 PM", title: "Closing Remarks" },
      { time: "3:15 PM – 4:30 PM", title: "Free time" },
      { time: "4:30 PM – 5:30 PM", title: "Travel to Local Market" },
      { time: "5:30 PM – 6:30 PM", title: "Visit to the National Museum & Cultural Centre" },
      { time: "8:00 PM – 10:00 PM", title: "Dinner at Local Heritage Restaurant", desc: "Enjoy a relaxed dinner in one of the city's top dining spots." },
    ],
  },
  {
    label: "Day 4",
    date: "Thu · Jul 2, 2026",
    short: "Day 4",
    sessions: [
      { time: "8:45 AM – 9:00 AM", title: "Opening Remarks", desc: "Brief welcome and overview of the day's agenda." },
      { time: "9:00 AM – 10:30 AM", title: "Public Financial Management Resilience", tag: "Presentation", materials: ["Debt Management Performance (DeMPA)", "PEFA Assessments", "Value for Money"], desc: "How can governments achieve financial resilience? This session explores good practices in public finance resilience including: emerging trends, early warning, debt sustainability, disaster response, climate mitigation, and fiscal transparency.", speakers: [S.carolyn] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 12:00 PM", title: "GovTech and Public Financial Management", tag: "Demonstration", materials: ["Value for Money", "Digital Public Finance Framework"], desc: "Why did so many governments adopt GovTech tools during the pandemic? This session shows the importance of Government Resource Planning (GRP), like the FreeBalance Accountability Suite, as the digital core for GovTech.", speakers: [S.matthew] },
      { time: "12:00 PM – 1:00 PM", title: "Public Financial Management in the Public Cloud", tag: "Presentation", desc: "Why has public cloud adoption in government accelerated? This session describes how government cloud trends and introduces mainstream public cloud concepts. The value of public cloud is rarely total cost; governments benefit from resiliency, elasticity, maintainability, scalability and security.", speakers: [S.doug] },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:30 PM", title: "Government Public Finances Practices: Lessons Learned", tag: "Panel", materials: ["PEFA Assessments", "MAPS — Methodology for Assessing Procurement Systems", "Public Investment Management (PIMA)", "Tax Administration Diagnostic (TADAT)"], desc: "This workshop follows up from previous ones by creating reform and modernization action items based on success factors and international assessments like PEFA, MAPS, and PIMA.", speakers: [S.customers] },
      { time: "3:30 PM – 4:30 PM", title: "FreeBalance Product Roadmap Voting", tag: "Panel", materials: ["FreeBalance Suite Functionality"], desc: "How do FreeBalance customers influence the value of implementations over time? Roadmap voting has been the cornerstone for every FISC. This session enables participants to prioritize FreeBalance and government ideas using this customer-centric approach.", speakers: [S.fbStaff] },
      { time: "4:30 PM – 4:45 PM", title: "Closing Remarks", desc: "Brief summary and wrap-up of the day's events." },
      { time: "4:45 PM – 7:00 PM", title: "Free Time" },
      { time: "7:00 PM – 10:00 PM", title: "Closing Reception and dinner at Hyatt Regency", desc: "Closing Reception and dinner at the Hyatt Regency, featuring a cultural performance and live music." },
    ],
  },
];

export const TAG_COLORS: Record<string, string> = {
  Presentation: "#fd6b18",
  Workshop: "#16a34a",
  Demonstration: "#2563eb",
  Panel: "#a855f7",
};

export type SpeakerEntry = {
  name: string;
  slug: string;
  role: string;
  org: string;
  img: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  featured?: boolean;
};

export const speakers: SpeakerEntry[] = [
  { name: "Manuel Schiappa Pietra", slug: "manuel-schiappa-pietra", role: "President and CEO", org: "FreeBalance", img: manuelPietra, linkedin: "https://www.linkedin.com/in/manuel-schiappa-pietra/", twitter: "https://twitter.com/PietraCEO", featured: true, bio: "Manuel leads FreeBalance's worldwide mission to modernise public financial management. A vocal advocate for country-led reform, he has spent over two decades partnering with governments on Chart-of-Accounts redesign, performance budgeting, and the digital transformation of treasury operations." },
  { name: "Davendranath Tancoo", slug: "davendranath-tancoo", role: "Minister of Finance", org: "Government of Trinidad & Tobago", img: davendranathTancoo, linkedin: "https://www.linkedin.com/in/davendranath-tancoo", featured: true, bio: "Minister Tancoo is the Member of Parliament for Oropouche West and Trinidad & Tobago's Minister of Finance. A long-serving advocate for fiscal transparency, his work focuses on Chart of Accounts modernisation, debt sustainability and a closer alignment between the budget cycle and national development priorities." },
  { name: "The Hon. Kamla Persad-Bissessar", slug: "kamla-persad-bissessar", role: "Prime Minister", org: "Government of Trinidad & Tobago", img: kamlaPersadBissessar, featured: true, bio: "The Honourable Kamla Persad-Bissessar SC leads Trinidad & Tobago as Prime Minister and is the country's first woman to hold the office. A seasoned attorney and parliamentarian, she has championed economic diversification, a digitally modernised public service and stronger Caribbean cooperation across her time in office." },
  { name: "Doug Hadden", slug: "doug-hadden", role: "EVP, Strategy and Innovation", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/doug-hadden.jpg", email: "mailto:dhadden@freebalance.com", linkedin: "https://www.linkedin.com/in/haddencatalyst/", twitter: "https://twitter.com/dalytics", bio: "Doug authors the FreeBalance Digital Public Finance Framework and leads research on AI-augmented PFM. His work centres on the human side of digital transformation in government." },
  { name: "Aldo Sagastume", slug: "aldo-sagastume", role: "VP, Public Financial Management", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/aldo-bustamante.png", email: "mailto:asagastume@freebalance.com", linkedin: "https://www.linkedin.com/in/aldo-sagastume-b2b7319/", bio: "Aldo guides FreeBalance Accountability Suite implementations across the Americas and Africa. He specialises in aligning Chart of Accounts modernisation with national development strategy." },
  { name: "Carolyn Bowick", slug: "carolyn-bowick", role: "Director of Marketing Communication", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/carolyn2.jpeg", email: "mailto:carolyn.bowick@freebalance.com", linkedin: "https://www.linkedin.com/in/carolynbowick", bio: "Carolyn shapes FreeBalance's public narrative on PFM reform — from policy briefs and FISC programming to the delegate experience itself." },
  { name: "Gerard Rao", slug: "gerard-rao", role: "VP, Services", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/gerard-rao.jpg", email: "mailto:grao@freebalance.com", linkedin: "https://www.linkedin.com/in/gerard-s-rao-9bb8611/", twitter: "https://x.com/freebalance", bio: "Gerard runs the global services organisation, partnering with governments on phased delivery, change management and capacity building across FreeBalance Accountability Suite engagements." },
  { name: "Matthew Olivier", slug: "matthew-olivier", role: "VP, Revenue Marketing", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/matthew-oliver.png", email: "mailto:molivier@freebalance.com", linkedin: "https://www.linkedin.com/in/matthewolivier/", twitter: "https://x.com/oliviermktg", bio: "Matthew leads revenue and customer marketing at FreeBalance, where he focuses on government technology adoption and the value of integrated GRP platforms." },
  { name: "Pedro Jorge", slug: "pedro-jorge", role: "VP, Research and Development", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/pedro-jorge.png", email: "mailto:pjorge@freebalance.com", linkedin: "https://www.linkedin.com/in/pedro-jorge-81a177b/", bio: "Pedro directs FreeBalance R&D, including the open platform strategy that protects customers' public-finance investments through deployment portability and product extensibility." },
];

/**
 * URL slug for a speaker's detail page.
 * Drives the /speakers/:slug route. Diacritic-stripped + kebab-cased.
 */
export function speakerSlugFor(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ResourceCard = {
  icon: typeof FileText;
  label: string;
  desc: string;
  to: string;
  gated?: boolean;
};

export const resources: ResourceCard[] = [
  { icon: FileText, label: "Delegate Guide", desc: "Trinidad & Tobago essentials — visas, climate, shuttles, and on-the-ground tips.", to: "/delegate-guide", gated: true },
  { icon: Play, label: "Recorded Sessions", desc: "Daily highlight reels and full plenary recordings from FISC 2026.", to: "/videos", gated: true },
  { icon: Download, label: "Presentations", desc: "FISC Takeaways — every slide deck and one-pager from the programme.", to: "/materials", gated: true },
  { icon: ImageIcon, label: "Photo Gallery", desc: "Curated photography from gala dinners, plenaries and pan-yard evenings.", to: "/gallery", gated: true },
  { icon: Mic, label: "Media Coverage", desc: "Press articles, broadcast clips and partner posts covering the conference.", to: "/media-coverage", gated: true },
  { icon: Globe, label: "Delegate Community", desc: "The ministers, secretaries and reformers shaping PFM across 40+ countries.", to: "/attendees", gated: true },
];

export const countries = [
  "Trinidad & Tobago", "Timor-Leste", "Ghana", "Sierra Leone", "Liberia",
  "Guyana", "Honduras", "Mongolia", "Kosovo", "Afghanistan", "Suriname",
  "St. Lucia", "Barbados", "Jamaica", "Antigua", "South Sudan",
];

/**
 * Country name → ISO 3166-1 alpha-2 code. Drives the <CountryFlag>
 * component. `Antigua` and `Kosovo` use the standard short forms (AG, XK).
 */
export const COUNTRY_ISO: Record<string, string> = {
  "Trinidad & Tobago": "TT",
  "Timor-Leste": "TL",
  "Ghana": "GH",
  "Sierra Leone": "SL",
  "Liberia": "LR",
  "Guyana": "GY",
  "Honduras": "HN",
  "Mongolia": "MN",
  "Kosovo": "XK",
  "Afghanistan": "AF",
  "Suriname": "SR",
  "St. Lucia": "LC",
  "Barbados": "BB",
  "Jamaica": "JM",
  "Antigua": "AG",
  "South Sudan": "SS",
  // Attendee countries not in the primary list:
  "Laos": "LA",
  "Sri Lanka": "LK",
  "Tuvalu": "TV",
  "Seychelles": "SC",
  // Speaker/staff org countries:
  "Canada": "CA",
};

// ---------------------------------------------------------------------------
// Attendees (delegate community) — gated content
// ---------------------------------------------------------------------------

export type AttendeeEntry = {
  salutation?: "Mr." | "Mrs." | "Ms." | "Dr." | "HE";
  name: string;
  role: string;
  org: string;
  country: string;
  img?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  delegationLead?: boolean;
};

export const attendees: AttendeeEntry[] = [
  { name: "Davendranath Tancoo", role: "Minister of Finance", org: "Government of Trinidad & Tobago", country: "Trinidad & Tobago", img: davendranathTancoo, linkedin: "https://www.linkedin.com/in/davendranath-tancoo", delegationLead: true },
  { name: "The Hon. Kamla Persad-Bissessar", role: "Prime Minister", org: "Government of Trinidad & Tobago", country: "Trinidad & Tobago", img: kamlaPersadBissessar, delegationLead: true },
  { salutation: "Mr.", name: "Brandon Francis", role: "Senior Systems Analyst", org: "Government of Antigua and Barbuda", country: "Antigua", delegationLead: true },
  { salutation: "Mr.", name: "Brendan J. Toner", role: "Finance Reform Director", org: "Government of Barbados", country: "Barbados" },
  { salutation: "Ms.", name: "Christina Elnei", role: "Director, Budget Modernization", org: "Ministry of Finance", country: "South Sudan" },
  { salutation: "Mr.", name: "Jerry Van Ommeren", role: "IT Manager, Ministry of Finance", org: "Ministry of Finance", country: "Suriname" },
  { salutation: "Mr.", name: "Abraham Makur Mangok", role: "Principal Adviser to the Minister", org: "Ministry of Finance", country: "South Sudan" },
  { salutation: "Mr.", name: "Arben Rama", role: "Senior Systems Administrator, IT", org: "Treasury", country: "Kosovo" },
  { salutation: "Mr.", name: "Benjamin Wislon Jr.", role: "Deputy Comptroller and Accountant General", org: "Ministry of Finance", country: "Liberia" },
  { salutation: "Mr.", name: "Dagvadorj Tserennadmid", role: "Specialist, Treasury Department", org: "Ministry of Finance", country: "Mongolia" },
  { salutation: "Mr.", name: "Imer Rudari", role: "Government IT Officer", org: "Government of Kosovo", country: "Kosovo" },
  { salutation: "Mr.", name: "Joseph K. Fahnbulleh", role: "Coordinator, Public Financial Management Reform", org: "Ministry of Finance", country: "Liberia", delegationLead: true },
  { salutation: "Mr.", name: "Raymond A. Coker", role: "Deputy Director General, Resource Management", org: "Government of Sierra Leone", country: "Sierra Leone" },
  { salutation: "Mr.", name: "Saythong Ouiphilavong", role: "Deputy Director General", org: "Ministry of Finance", country: "Laos" },
  { salutation: "Mr.", name: "Yau Teulilo", role: "PFMC Specialist, MFED", org: "Ministry of Finance", country: "Tuvalu" },
  { salutation: "Mr.", name: "Tsogbadrakh Beltreg", role: "Division Director, Treasury Department", org: "Ministry of Finance", country: "Mongolia" },
  { salutation: "Mr.", name: "Viengkham Thongsavat", role: "National Academy of Finance and Accounting", org: "Government of Laos", country: "Laos" },
  { salutation: "Mr.", name: "W.S.R. Jagath Kumara", role: "Additional Director General, Department of National Budget", org: "Treasury", country: "Sri Lanka" },
  { salutation: "Mr.", name: "A.D.L.G. Kalansuriya", role: "Additional Director General", org: "Treasury", country: "Sri Lanka" },
  { salutation: "Mrs.", name: "Jemima Jackline Lugala", role: "Director for IFMIS, Ministry of Finance", org: "Ministry of Finance", country: "South Sudan", delegationLead: true },
  { salutation: "Mrs.", name: "Lauratu Johnson", role: "Resource Management Director", org: "Government of Sierra Leone", country: "Sierra Leone" },
  { salutation: "Mrs.", name: "Noella Brioche", role: "Director of Budget", org: "Government of Seychelles", country: "Seychelles" },
  { salutation: "Mrs.", name: "Shella Mohideen", role: "Chief Accountant", org: "Treasury", country: "Sri Lanka" },
  { salutation: "Ms.", name: "Maaman Loakim", role: "Deputy Secretary, MFED", org: "Ministry of Finance", country: "Tuvalu" },
  { salutation: "Ms.", name: "Sharlene Sookraj-Ablack", role: "Director of Public Budget", org: "Ministry of Finance", country: "Trinidad & Tobago", delegationLead: true },
  { salutation: "Ms.", name: "Yvonne Neemacharan", role: "Deputy Permanent Secretary, Finance", org: "Government of Trinidad and Tobago", country: "Trinidad & Tobago" },
  { name: "Nicola Callender", role: "Director, Information Systems", org: "Government of Antigua and Barbuda", country: "Antigua" },
  { name: "Venicia Valentine-Ferris", role: "Senior Budget Analyst", org: "Government of Antigua and Barbuda", country: "Antigua" },
  { name: "Vickey McConney", role: "Senior Budget Analyst", org: "Ministry of Finance", country: "Barbados" },
  { name: "Vikash Mahabier", role: "Director, Public Financial Management", org: "Ministry of Finance", country: "Suriname" },
  { salutation: "Mr.", name: "Kwame Asante", role: "Director, Macro-Fiscal Policy", org: "Ministry of Finance", country: "Ghana", delegationLead: true },
  { salutation: "Mrs.", name: "Akosua Mensah", role: "Controller and Accountant General", org: "Government of Ghana", country: "Ghana" },
  { salutation: "Ms.", name: "Marcia James", role: "Deputy Financial Secretary", org: "Ministry of Finance", country: "Jamaica", delegationLead: true },
];

// ---------------------------------------------------------------------------
// Materials (FISC Takeaways)
// ---------------------------------------------------------------------------

export type MaterialEntry = {
  title: string;
  topic: "PFM" | "AI" | "Performance" | "Assessments" | "Product" | "Reform";
  summary: string;
  pdfUrl: string;
  pages?: number;
};

export const materials: MaterialEntry[] = [
  { title: "AI Tools to Consider", topic: "AI", summary: "A curated catalogue of AI tools relevant to public finance teams in 2026, with use-cases and procurement notes.", pdfUrl: "#", pages: 6 },
  { title: "Balanced Scorecard", topic: "Performance", summary: "Applying the balanced scorecard model to government performance — finance, customer, internal, and learning perspectives.", pdfUrl: "#", pages: 4 },
  { title: "Debt Management Performance (DeMPA)", topic: "Assessments", summary: "Field guide to running a DeMPA assessment and translating results into reform priorities.", pdfUrl: "#", pages: 8 },
  { title: "FreeBalance Advisory Services", topic: "Product", summary: "How FreeBalance Advisory engagements scope, deliver and measure PFM reform programmes.", pdfUrl: "#", pages: 5 },
  { title: "FreeBalance Chart of Goals", topic: "Performance", summary: "Mapping a national development strategy onto a Chart of Goals integrated with the Chart of Accounts.", pdfUrl: "#", pages: 7 },
  { title: "FreeBalance Suite Functionality", topic: "Product", summary: "Module-by-module overview of the FreeBalance Accountability Suite — Budget, Treasury, Revenue, Payroll.", pdfUrl: "#", pages: 10 },
  { title: "Government Performance Management", topic: "Performance", summary: "Building a performance culture inside the ministry of finance: cadence, dashboards, and accountability loops.", pdfUrl: "#", pages: 6 },
  { title: "Key Performance Indicators", topic: "Performance", summary: "A taxonomy of public-finance KPIs with definitions, formulas and reporting frequencies.", pdfUrl: "#", pages: 5 },
  { title: "MAPS — Methodology for Assessing Procurement Systems", topic: "Assessments", summary: "What MAPS measures, how to prepare, and how to use results in reform sequencing.", pdfUrl: "#", pages: 6 },
  { title: "Objectives and Key Results", topic: "Performance", summary: "Applying OKRs in a public-sector context without losing strategic alignment.", pdfUrl: "#", pages: 4 },
  { title: "PEFA Assessments", topic: "Assessments", summary: "Understanding PEFA 2025 indicators and turning results into a reform sequencing plan.", pdfUrl: "#", pages: 8 },
  { title: "PFM Research and News", topic: "Reform", summary: "Selected research and journalism on PFM reform from the last 12 months, with FreeBalance commentary.", pdfUrl: "#", pages: 6 },
  { title: "Public Investment Management (PIMA)", topic: "Assessments", summary: "PIMA-light checklist for ministries planning large infrastructure programmes.", pdfUrl: "#", pages: 7 },
  { title: "Tax Administration Diagnostic (TADAT)", topic: "Assessments", summary: "Running a TADAT and integrating findings with broader PFM reform efforts.", pdfUrl: "#", pages: 7 },
  { title: "Value for Money", topic: "PFM", summary: "Defining, measuring and demonstrating value for money across the budget cycle.", pdfUrl: "#", pages: 5 },
  { title: "Digital Public Finance Framework", topic: "Reform", summary: "FreeBalance's framework for digital PFM — readiness, scope, maturity, and digital core.", pdfUrl: "#", pages: 9 },
];

// ---------------------------------------------------------------------------
// Videos
// ---------------------------------------------------------------------------

export type VideoEntry = {
  title: string;
  day?: "Welcome" | "Day 1" | "Day 2" | "Day 3" | "Day 4" | "Feature";
  duration: string;
  thumb: string;
  url: string;
  description?: string;
};

export const videos: VideoEntry[] = [
  { title: "Welcome to FISC 2026", day: "Welcome", duration: "2:14", thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80", url: "#", description: "Opening cinematic from the gala reception at Hyatt Regency, Port of Spain." },
  { title: "Day 1 Highlights — National Strategies", day: "Day 1", duration: "4:32", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80", url: "#", description: "Country-led keynotes and the opening workshop on aligning PFM with national strategies." },
  { title: "Day 2 Highlights — Product Co-Creation", day: "Day 2", duration: "5:08", thumb: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80", url: "#", description: "Workshops on the FreeBalance Suite roadmap and customer-driven feature prioritisation." },
  { title: "Day 3 Highlights — AI in Public Finance", day: "Day 3", duration: "4:55", thumb: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80", url: "#", description: "From human-augmented PFM to prompt patterns the secretariat actually uses." },
  { title: "Day 4 Highlights — Resilience & Roadmap Voting", day: "Day 4", duration: "6:21", thumb: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80", url: "#", description: "Closing panels on resilience and the customer-driven product roadmap vote." },
  { title: "Why Trinidad? — A Letter from the Minister", day: "Feature", duration: "3:45", thumb: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80", url: "#", description: "The Minister of Finance on hosting FISC 2026 in Port of Spain." },
];

// ---------------------------------------------------------------------------
// Media coverage
// ---------------------------------------------------------------------------

export type MediaItem = {
  title: string;
  source: string;
  date: string;
  url: string;
  type: "Article" | "Video" | "Social";
  excerpt?: string;
};

export const mediaItems: MediaItem[] = [
  { title: "Trinidad & Tobago to Host FreeBalance International Steering Committee 2026", source: "Trinidad Express", date: "2026-04-18", url: "#", type: "Article", excerpt: "Government of Trinidad and Tobago confirms it will host the 2026 edition of FISC, bringing 300+ public finance delegates to Port of Spain." },
  { title: "FISC 2026: Why Public Financial Management Matters Now", source: "FreeBalance Insights", date: "2026-05-02", url: "#", type: "Article", excerpt: "A deep-dive interview with Doug Hadden on the themes shaping the 2026 programme." },
  { title: "Minister Highlights Digital PFM Ahead of FISC", source: "Newsday TT", date: "2026-05-09", url: "#", type: "Article", excerpt: "Minister of Finance discusses the digital transformation agenda Trinidad will showcase at the event." },
  { title: "FISC 2026 Trailer — Watch on YouTube", source: "FreeBalance · YouTube", date: "2026-05-12", url: "#", type: "Video", excerpt: "Two minutes of Caribbean rhythm and Hyatt Regency previews." },
  { title: "Sharlene Sookraj-Ablack on Trinidad's Reform Journey", source: "Caribbean Finance Review", date: "2026-04-30", url: "#", type: "Article", excerpt: "The Director of Public Budget on what hosting FISC means for the country." },
  { title: "Live from Port of Spain — Day 1 Recap", source: "FreeBalance · LinkedIn", date: "2026-06-29", url: "#", type: "Social", excerpt: "Field updates and photos from the first day of plenary sessions." },
  { title: "Tatoli Sai Uma Sai Nain: Cobertura FISC 2026", source: "Tatoli", date: "2026-07-01", url: "#", type: "Article", excerpt: "Cobertura em português sobre a participação de Timor-Leste no FISC 2026." },
  { title: "Roadmap Voting Drives FreeBalance Product Direction", source: "Public Finance Today", date: "2026-07-03", url: "#", type: "Article", excerpt: "How the customer roadmap vote at FISC has shaped the 2026–2028 product cycle." },
];

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export type GalleryPhoto = {
  src: string;
  caption: string;
  span?: "wide" | "tall";
};

// FISC 2026 gallery only. When future editions are added, this list will be
// re-tagged with a `year` field and the Gallery page will reintroduce a year filter.
export const galleryPhotos: GalleryPhoto[] = [
  { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80", caption: "Plenary applause", span: "wide" },
  { src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80", caption: "Roadmap voting session" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80", caption: "Welcome gala at the Hyatt" },
  { src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200&q=80", caption: "Country breakout" },
  { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80", caption: "Opening keynote" },
  { src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200&q=80", caption: "Coffee break in the lobby" },
  { src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80", caption: "Workshop tables", span: "wide" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80", caption: "Audience in the round" },
  { src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&q=80", caption: "On stage in Port of Spain" },
  { src: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=80", caption: "Hyatt Regency at dusk" },
  { src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80", caption: "Downtown Port of Spain" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80", caption: "Cultural performance" },
];

// ---------------------------------------------------------------------------
// Delegate Guide (Trinidad & Tobago, 2026 edition)
// ---------------------------------------------------------------------------

export type ChecklistItem = { task: string; detail?: string; deadline?: string };
export type EssentialGroup = {
  category: "Passport & Visa" | "Health & Vaccinations" | "Money & Payments" | "Connectivity" | "Etiquette & Dress";
  items: string[];
};

export type DelegateGuide = {
  countryName: string;
  edition: string;
  dates: string;
  intro: string;
  keyFacts: { capital: string; languages: string[]; currency: string; timezone: string; voltage: string; population: string };
  flight: { airport: string; code: string; transit: string; majorRoutes: string[] };
  weather: { season: string; tempC: string; humidity: string; notes: string };
  checklist: ChecklistItem[];
  essentials: EssentialGroup[];
  emergency: { service: string; number: string }[];
};

export const delegateGuide: DelegateGuide = {
  countryName: "Trinidad & Tobago",
  edition: "FISC 2026",
  dates: "June 29 – July 2, 2026",
  intro:
    "Welcome to Trinidad & Tobago. This pre-arrival guide walks you through what to pack, how to land, and how to make the most of four days in Port of Spain. The secretariat will follow up with personalised travel details two weeks before arrival.",
  keyFacts: {
    capital: "Port of Spain",
    languages: ["English (official)", "Trinidadian Creole"],
    currency: "Trinidad & Tobago Dollar (TTD)",
    timezone: "AST · UTC−4 (no daylight saving)",
    voltage: "115 V / 230 V · Type A, B",
    population: "≈ 1.4 million",
  },
  flight: {
    airport: "Piarco International Airport",
    code: "POS",
    transit: "~30 minutes by shuttle to the Hyatt Regency",
    majorRoutes: ["Miami (MIA)", "New York (JFK)", "London (LGW)", "Toronto (YYZ)", "Panama City (PTY)", "Bridgetown (BGI)"],
  },
  weather: {
    season: "Late dry season → early wet season",
    tempC: "28 – 32 °C",
    humidity: "Humidity 70 – 85%",
    notes: "Pack light, breathable layers and a compact umbrella. Sessions are air-conditioned; consider a light jacket.",
  },
  checklist: [
    { task: "Confirm your delegation lead with the secretariat", deadline: "10 weeks out" },
    { task: "Request a formal invitation letter from the secretariat for visa purposes", deadline: "8 weeks out" },
    { task: "Book international flights routed to Piarco International (POS)", deadline: "8 weeks out" },
    { task: "Reserve your room using delegate code FISC26 at the Hyatt Regency", deadline: "6 weeks out" },
    { task: "Upload your delegate profile and headshot in the portal", deadline: "4 weeks out" },
    { task: "Complete the consent form for photography and recording", deadline: "2 weeks out" },
    { task: "Download the offline-capable delegate companion app", deadline: "1 week out" },
  ],
  essentials: [
    {
      category: "Passport & Visa",
      items: [
        "Passport must be valid for at least six months beyond arrival.",
        "Most delegations enter visa-free for up to 90 days; the secretariat coordinates official invitation letters for visa-required nationalities.",
        "Keep a digital and a paper copy of your invitation letter while in transit.",
      ],
    },
    {
      category: "Health & Vaccinations",
      items: [
        "No vaccinations are currently required for entry; routine immunisations recommended.",
        "Yellow fever certificate required only if arriving from a country with risk of transmission.",
        "Tap water at the Hyatt Regency is potable. Bottled water is widely available.",
      ],
    },
    {
      category: "Money & Payments",
      items: [
        "TTD is the local currency; USD is widely accepted at the venue and major hotels.",
        "Visa and Mastercard accepted almost everywhere; American Express coverage is partial.",
        "ATMs are available at the airport, the venue, and along Wrightson Road.",
      ],
    },
    {
      category: "Connectivity",
      items: [
        "Hyatt Regency offers complimentary high-speed Wi-Fi for delegates.",
        "Local SIMs (bmobile, Digicel) available at Piarco arrivals.",
        "Mobile coverage on the north coast (Maracas Bay) can be spotty.",
      ],
    },
    {
      category: "Etiquette & Dress",
      items: [
        "Plenaries: business smart. Workshops: business casual is fine.",
        "Gala dinner: smart cocktail or national dress.",
        "Greet using a handshake; titles are appreciated on first introduction.",
      ],
    },
  ],
  emergency: [
    { service: "Police", number: "999" },
    { service: "Ambulance", number: "811" },
    { service: "Fire", number: "990" },
    { service: "Secretariat (24h)", number: "+1 868 555 0126" },
  ],
};
