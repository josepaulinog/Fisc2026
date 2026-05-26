import {
  Globe,
  Mic,
  FileText,
  Play,
  Download,
  Image as ImageIcon,
} from "lucide-react";
import logoUrl from "../imports/Asset_1.svg";
import aboutImage from "../imports/about.png";
import aboutHeroImage from "../imports/about-hero.jpg";
import agendaImage from "../imports/agenda.jpeg";
import eventsImage from "../imports/events.jpg";
import speakers6 from "../imports/speakers6.png";

// Trinidad & Tobago editorial photography — sourced from AdobeStock, copied
// into src/imports/ during the prototype build. Replaces the earlier generic
// Unsplash placeholders so the prototype reads as the actual destination.
import portOfSpainAerial from "../imports/port-of-spain-aerial.jpg";
import hyattTrinidad from "../imports/hyatt-trinidad.webp";
import collage1Img from "../imports/collage1.png";
import delegationImg from "../imports/delegation3.png";
import tobagoImg from "../imports/tobago.png";
import maracasBeach from "../imports/maracas-beach.jpg";
import maracasCabin from "../imports/maracas-cabin.jpg";
import scarletIbis from "../imports/scarlet-ibis.jpg";
import queensRoyalCollege from "../imports/queens-royal-college.jpg";
import carnivalDancer from "../imports/carnival-dancer.jpg";
import fisc2025DiliDay3 from "../imports/fisc-2025-dili-day3.jpg";
import speakersHero from "../imports/speakers5.png";
import newsletterImage from "../imports/newsletter.jpg";
import resourcesHero from "../imports/resources-hero.webp";
import materialsHero from "../imports/replicate-materials.webp";
import videosHero from "../imports/replicate-videos.webp";
import galleryHero from "../imports/replicate-gallery.webp";
import mediaHero from "../imports/replicate-media.webp";
import attendeesHero from "../imports/replicate-attendees.webp";
import delegateGuideHero from "../imports/replicate-delegate.webp";

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
// Dedicated tiles for the Home About-FISC photo collage. Kept separate
// from HERO_IMG / HERO_GALLERY / ABOUT_IMG (which are also consumed by
// the homepage hero video poster, Gallery page, About hero, Footer aerial)
// so we can swap the collage independently of every other surface.
export const COLLAGE_1 = collage1Img;
// COLLAGE_2 feeds the right column (3:5 with "The delegation" badge) →
// collage4.png, the curated delegation portrait. COLLAGE_3 feeds the
// bottom-left atmospheric square → Tobago imagery (the second island
// in the country's name — adds visual range alongside the Trinidad
// aerial top-left).
export const COLLAGE_2 = delegationImg;
export const COLLAGE_3 = tobagoImg;
export const VENUE_IMG_1 = maracasCabin;
export const VENUE_IMG_2 = queensRoyalCollege;
export const VENUE_IMG_3 = maracasBeach;

// Hero backgrounds. Public narrative pages stay anchored in bundled Trinidad
// imagery; resource/detail surfaces use generated editorial table scenes so
// each gated section reads as a distinct tool/archive rather than a repeated
// destination photo.
export const HERO_ABOUT = aboutHeroImage;
export const NEWSLETTER_IMG = newsletterImage;
export const HERO_AGENDA = speakers6;
export const HERO_SPEAKERS = speakersHero;
export const HERO_VENUE = maracasBeach;
export const HERO_RESOURCES = resourcesHero;
export const HERO_ATTENDEES = attendeesHero;
export const HERO_MATERIALS = materialsHero;
export const HERO_GUIDE = delegateGuideHero;
export const HERO_GALLERY = galleryHero;
export const HERO_VIDEOS = videosHero;
export const HERO_MEDIA = mediaHero;
// Sign-in background is a purpose-generated Replicate image (no Trinidad
// stand-in covers the same composition), so it stays remote — the only
// non-bundled hero in the build.
export const HERO_SIGNIN =
  "https://replicate.delivery/xezq/jWh9MKFLGZ61KBEdNPT1P2TyowbN0EMHzWeJv4pmILjfSlXUA/tmp6_134lj_.jpg";

// The Hyatt Regency stands on the Port of Spain waterfront. VENUE_HOTEL
// is the hotel's own property photography (hyatt-trinidad.webp) used on
// the Venue page's Hotel hero. The wider aerial (portOfSpainAerial) is
// still available for context-of-place surfaces via VENUE_STREET / HERO_MEDIA.
export const VENUE_HOTEL = hyattTrinidad;
export const VENUE_STREET = portOfSpainAerial;
export const VENUE_FOOD = maracasCabin;
export const VENUE_STEELPAN = carnivalDancer;
export const VENUE_NATURE = scarletIbis;
export const VENUE_TOBAGO = tobagoImg;

export const BRAND = "#fd6b18";
export const BRAND_SOFT = "#ffb27a";
export const INK = "#171311";
// Solid button/CTA background — light gray with near-black text
// (text-neutral-900). Single source of truth; nudge here to adjust the shade.
export const BTN = "#d4d4d4";

// Conference kickoff — Mon Jun 29 2026, 09:00 Atlantic Standard Time (UTC-4).
// Single source of truth for the homepage countdown. Inline strings in the
// hero strap, footer date row, and Agenda day labels still hardcode the
// human-readable form; a future cleanup can drive those from this constant.
export const EVENT_START = new Date("2026-06-29T09:00:00-04:00");

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

// Stats shown in the homepage one-line ticker.
// Order = visual order, left → right. "4 Days" was dropped (redundant with
// the hero strap and the footer meta); "18 Editions" takes the fourth slot
// as the real heritage stat (FISC has run since 2007). No icon field — the
// ticker renders number + label on a shared baseline with a brand-orange
// "+" accent doing all the colour work.
export const stats = [
  { value: "10+",  label: "Countries" },
  { value: "20+",  label: "Delegates" },
  { value: "25+",  label: "Sessions" },
  { value: "18",   label: "Editions" },
];

export type SessionReference = {
  label: string;
  to: string;
  /** Outbound link — opens in a new tab. Internal links are react-router Links. */
  external?: boolean;
};

export type Session = {
  time: string;
  title: string;
  /** Short, scannable summary — used by row-level previews on /agenda and the
   *  homepage Highlights. Cap at ~110 chars for clean truncation. */
  desc?: string;
  /** Expanded briefing paragraph — rendered on the session detail page only.
   *  60-120 words. Frames the session's "why" and "what's in it for delegates". */
  briefing?: string;
  /** What delegates should leave with — rendered as a checkmark list. */
  takeaways?: string[];
  /** Related links — internal materials, speakers, sessions, or standards
   *  references. Rendered as a list at the bottom of the briefing. */
  references?: SessionReference[];
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
      { time: "10:00 AM – 11:00 AM", title: "Aligning Public Financial Management with National Strategies", tag: "Presentation", materials: ["FreeBalance Chart of Goals", "Government Performance Management", "Key Performance Indicators"], desc: "What should guide government performance in your country? This session explores how public finance can support national strategy, accountability, and reform — by aligning classifications and programs directly with development priorities.", briefing: "Most governments still classify spending by ministry or economic input — line items that satisfy auditors but obscure whether the budget moved the dial on what citizens elected you to deliver. Manuel reframes the chart of accounts as a strategic instrument: a public ledger that maps every dollar to a national development outcome. Drawing on a decade of FreeBalance engagements across Africa, the Caribbean and Southeast Asia, the session walks through three production examples — Liberia, Mongolia, Honduras — of countries that rewired their COA around their National Development Plan, and the political, technical and capacity hurdles each cleared.", takeaways: ["Why the Chart of Goals matters as much as the Chart of Accounts", "Three real-world COA-to-NDP alignment patterns from FreeBalance deployments", "Practical sequencing — what to reform in year one, year three, year five", "How to instrument outcome KPIs without inflating the COA"], references: [{ label: "FreeBalance Chart of Goals", to: "/materials" }, { label: "Government Performance Management", to: "/materials" }, { label: "About Manuel Schiappa Pietra", to: "/speakers/manuel-schiappa-pietra" }], speakers: [S.manuel] },
      { time: "11:00 AM – 11:30 AM", title: "Break" },
      { time: "11:30 AM – 12:00 PM", title: "Address from Prime Minister", tag: "Presentation", desc: "Address from the Prime Minister of Trinidad and Tobago.", briefing: "A keynote address from The Hon. Kamla Persad-Bissessar, Prime Minister of Trinidad & Tobago, framing FISC 2026 in the context of the country's hosting mandate. Expected themes: the role of small-island PFM reform in Caribbean economic resilience, Trinidad's own modernisation agenda, and what the region expects from the next generation of public-finance technology. Open press; no live Q&A but the secretariat will collect written questions for the closing-day panel.", takeaways: ["The host country's framing of FISC's themes for 2026", "Trinidad's PFM reform priorities and where they intersect with the delegate community", "Context for Caribbean-led conversations across the rest of the programme"], references: [{ label: "About The Hon. Kamla Persad-Bissessar", to: "/speakers/kamla-persad-bissessar" }, { label: "About Minister Tancoo", to: "/speakers/davendranath-tancoo" }], speakers: [S.kamla] },
      { time: "12:00 PM – 1:00 PM", title: "Group Photo" },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:30 PM", title: "Workshop: Country Experiences in Public Finance Reform", tag: "Workshop", desc: "How have governments achieved public finance objectives even in difficult circumstances? This session highlights obstacles overcome and successes achieved by FreeBalance customers.", briefing: "A working session, not a presentation. Delegates split into four working groups by region — Africa, Americas, Caribbean and Asia-Pacific — to surface the toughest PFM challenges of the last 24 months and the workarounds that actually moved the needle. FreeBalance services leads facilitate but stay out of the way: this is country-to-country knowledge transfer first. Each group produces a one-page case capture for the secretariat's post-FISC briefings, distributed to the full delegation within two weeks.", takeaways: ["Concrete experiences from delegate-led conversations, not vendor talking points", "Cross-regional comparison of common reform blockers", "A written case capture you co-author and take home", "The chance to find your counterpart in another country tackling the same problem"], references: [{ label: "FreeBalance Advisory Services", to: "/materials" }, { label: "About Gerard Rao", to: "/speakers/gerard-rao" }], speakers: [S.fbStaff] },
      { time: "3:30 PM – 4:00 PM", title: "Closing Remarks", desc: "Day 1 wrap-up. Tuesday's roadmap-introduction reading distributed in delegate packs." },
      { time: "5:00 PM – 6:30 PM", title: "Cultural Tour", desc: "Optional excursion. Coach departs Hyatt 4:45 PM." },
      { time: "7:00 PM – 10:00 PM", title: "Dinner at Local Restaurant", desc: "Veni Mangé, Woodbrook. Coach departs Hyatt 6:45 PM, return 10:30 PM." },
    ],
  },
  {
    label: "Day 2",
    date: "Tue · Jun 30, 2026",
    short: "Day 2",
    sessions: [
      { time: "8:45 AM – 9:00 AM", title: "Opening Remarks", desc: "Brief welcome and overview of the day's agenda." },
      { time: "9:00 AM – 10:30 AM", title: "What's New in the FreeBalance Accountability Suite", tag: "Demonstration", materials: ["FreeBalance Suite Functionality", "FreeBalance Advisory Services"], desc: "What has FreeBalance been developing since the last FISC in 2019? This session will focus on new functionality including: Medium-Term Financial Frameworks, biometrics, legislative oversight, and drill-down dashboards with demonstrations.", briefing: "FreeBalance's first major product showcase since 2019. Aldo Sagastume walks through the additions to the Accountability Suite — Medium-Term Fiscal Framework modules, biometric integration for civil-registry alignment, legislative oversight dashboards, and drill-down treasury analytics that replace what used to be three CSV exports and an Excel pivot. Each capability is demonstrated live against a sample country dataset, with code-paths and integration points exposed for the architects in the room. Bring your laptop — the post-session repo includes the sample data and Postman collection.", takeaways: ["Live demos of MTFF, biometrics, oversight, and drill-down dashboards", "The integration architecture connecting each capability to the existing COA", "What migrates automatically vs what requires customer-side data prep", "Sample API responses and CLI tooling for technical evaluators"], references: [{ label: "FreeBalance Suite Functionality", to: "/materials" }, { label: "FreeBalance Advisory Services", to: "/materials" }, { label: "About Aldo Sagastume", to: "/speakers/aldo-sagastume" }], speakers: [S.aldo] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 1:00 PM", title: "Workshop: Implementing Public Financial Management for National Strategies", tag: "Workshop", materials: ["FreeBalance Chart of Goals", "Balanced Scorecard", "Objectives and Key Results"], desc: "How can government performance management theory become reality? This workshop demonstrates how to align public accounting with performance management through integration of a Chart of Accounts with a Chart of Goals.", briefing: "A hands-on extension of Monday's keynote. Delegates work in pairs with a printed worksheet to map their country's current Chart of Accounts against a draft Chart of Goals derived from their published NDP. Aldo and the FreeBalance PFM team circulate to coach. By the end of the two hours, each pair holds a one-page first-cut crosswalk — not production-ready, but a credible starting document for the budget directorate back home.", takeaways: ["A first-cut COA-to-Chart-of-Goals crosswalk for your own country", "Hands-on coaching from FreeBalance PFM specialists", "Templates for the Balanced Scorecard and OKR layers above the COA", "Patterns for getting cross-ministry sign-off on a new program classification"], references: [{ label: "Balanced Scorecard", to: "/materials" }, { label: "Objectives and Key Results", to: "/materials" }, { label: "About Aldo Sagastume", to: "/speakers/aldo-sagastume" }], speakers: [S.aldo] },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:30 PM", title: "Workshop on Government Public Finance Practices and Aspirations", tag: "Workshop", desc: "How can governments leverage FISC lessons? Subjects include Government Resource Planning (GRP), progressive activation, project management, organisational change management, and capacity building.", briefing: "The forward-looking counterpart to Monday's experience workshop. Working groups translate the lessons captured 24 hours earlier into concrete next-12-month commitments — what each delegation will pilot, what they'll need from the FreeBalance services team, and where the secretariat can broker cross-country support. Each group leaves with a written aspiration brief, jointly held, that the secretariat will follow up on quarterly.", takeaways: ["A written 12-month aspiration brief for your country", "Cross-country pairings for joint pilots where the problem is shared", "A direct ask line into FreeBalance services for the next phase", "Quarterly secretariat follow-up to keep momentum past the conference"], references: [{ label: "FreeBalance Advisory Services", to: "/materials" }, { label: "Public Investment Management (PIMA)", to: "/materials" }], speakers: [S.fbStaff] },
      { time: "3:30 PM – 4:30 PM", title: "What's New: FreeBalance Accountability Platform", tag: "Presentation", desc: "How can an open platform protect your public finance investment? This session describes our open system mandate with deployment portability.", briefing: "The platform-architecture deep-dive for the technical members of each delegation. Pedro Jorge presents FreeBalance's open-system mandate — what it means for data portability, vendor independence, third-party extensions, and the long-term lifetime cost of a PFM deployment. Concrete examples: how customers in Ghana and Guyana extended the platform without forking it, and the API surface published in the 2025 release.", takeaways: ["What 'open platform' specifically means in the FreeBalance context", "Real customer extensions that didn't require a fork", "Public API surface and SDK availability", "How deployment portability protects the 10-year investment horizon"], references: [{ label: "FreeBalance Suite Functionality", to: "/materials" }, { label: "About Pedro Jorge", to: "/speakers/pedro-jorge" }], speakers: [S.pedro] },
      { time: "4:30 PM – 5:30 PM", title: "FreeBalance Product Roadmap", tag: "Presentation", materials: ["FreeBalance Suite Functionality"], desc: "How can you influence FreeBalance product priorities? This session introduces you to new product ideas generated from recent FreeBalance experience in the PFM world, research, conferences, and government tenders.", briefing: "The setup for Thursday's roadmap vote. Doug Hadden walks through the 23 candidate features on this year's customer-priority ballot — what each is, the problem it solves, the customers who requested it, and the rough cost class. Delegates leave with the printed ballot in their pack and the next two days to deliberate with their counterparts before voting closes on Day 4.", takeaways: ["The full 2026 candidate roadmap explained item by item", "Which other countries have asked for what, and why", "The cost-class framework used to weight the vote", "Time to think and deliberate before Thursday's binding ballot"], references: [{ label: "FreeBalance Suite Functionality", to: "/materials" }, { label: "About Doug Hadden", to: "/speakers/doug-hadden" }, { label: "Thursday's roadmap vote", to: "/agenda/day-4/6" }], speakers: [S.doug] },
      { time: "5:30 PM – 6:00 PM", title: "Closing Remarks", desc: "Day 2 wrap-up. Roadmap ballot reminder before Thursday's vote." },
      { time: "6:00 PM – 6:30 PM", title: "Free time" },
      { time: "7:30 PM – 10:00 PM", title: "Dinner at Sky Garden", desc: "Sky Garden rooftop, Hyatt Regency. Cocktails 7:30 PM, seating 8:00 PM." },
    ],
  },
  {
    label: "Day 3",
    date: "Wed · Jul 1, 2026",
    short: "Day 3",
    sessions: [
      { time: "8:45 AM – 9:00 AM", title: "Opening Remarks", desc: "Brief welcome and overview of the day's agenda." },
      { time: "9:00 AM – 10:30 AM", title: "Digital Public Finance Framework", tag: "Presentation", materials: ["Digital Public Finance Framework"], desc: "How can public finance transform digitally? Governments are increasingly looking to technology to improve outcomes and efficiency. This session introduces the FreeBalance Digital Public Finance Framework Template, covering digital readiness, digital scope, digital maturity, public finance reform and digital core.", briefing: "Most digital-PFM conversations conflate four very different questions: are we ready, what should we digitise, how mature do we want to be, and what reform precedes which tooling? Doug introduces the FreeBalance Digital Public Finance Framework as a structured way to answer each separately. The framework has been validated across 14 ministries and four assessment cycles; the session walks through the template, then puts delegates in pairs to self-score their own country against it.", takeaways: ["A four-axis structured scoring of your country's digital-PFM posture", "The distinction between readiness, scope, maturity, reform and core — and why conflating them blocks progress", "Validated patterns from 14 ministry deployments", "A self-score worksheet to bring back to the budget directorate"], references: [{ label: "Digital Public Finance Framework", to: "/materials" }, { label: "About Doug Hadden", to: "/speakers/doug-hadden" }], speakers: [S.doug] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 1:00 PM", title: "Artificial Intelligence in Public Finance", tag: "Demonstration", materials: ["AI Tools to Consider", "Digital Public Finance Framework"], desc: "Should AI automate or augment public service activities? This session builds the case for human-augmented PFM as the more effective and ethical choice. We'll introduce the FreeBalance human augmentation and open system approach, explore prompt engineering examples for research, summarization, and insight.", briefing: "Two hours, two halves. First, the argument: why human-augmented PFM beats fully-automated PFM on both effectiveness and ethics, with concrete examples of where automated systems have failed in production deployments. Second, the toolkit: live demonstrations of prompt patterns the FreeBalance secretariat actually uses today — for legislative summarisation, fiscal-rule research, debt sustainability triage, and procurement-anomaly scoring. The session is recorded and prompts are published with the post-FISC takeaway pack.", takeaways: ["The augmentation-vs-automation framing, with real production examples on both sides", "Four working prompt patterns for legislative summarisation, research, triage and procurement", "What the FreeBalance open-system approach to AI specifically means", "Published prompts and workflow templates in the takeaway pack"], references: [{ label: "AI Tools to Consider", to: "/materials" }, { label: "Digital Public Finance Framework", to: "/materials" }, { label: "About Doug Hadden", to: "/speakers/doug-hadden" }], speakers: [S.doug] },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:00 PM", title: "What's New: FreeBalance Services", tag: "Presentation", desc: "How can public finance project success rates improve? This session describes Key Success Factors and why agile approaches are more successful than legacy waterfall.", briefing: "Gerard Rao opens the FreeBalance services playbook honestly — what went right, what went wrong, and what the team changed across the last two years of deployments. The headline shift: a move from milestone-gated waterfall to agile activation, with progressive go-lives every 8–12 weeks instead of one 18-month launch. The result: time-to-first-value has roughly halved, and customer-reported escalations have dropped by about a third.", takeaways: ["Why agile progressive activation beats waterfall for PFM deployments", "The four Key Success Factors that predict on-time go-live", "Real numbers from the last two years of FreeBalance engagements", "When to push back if your integrator proposes a 'big bang' approach"], references: [{ label: "FreeBalance Advisory Services", to: "/materials" }, { label: "About Gerard Rao", to: "/speakers/gerard-rao" }], speakers: [S.gerard] },
      { time: "3:00 PM – 3:15 PM", title: "Closing Remarks" },
      { time: "3:15 PM – 4:30 PM", title: "Free time" },
      { time: "4:30 PM – 5:30 PM", title: "Travel to Local Market", desc: "Coach to Queen's Park Savannah. ~30 min." },
      { time: "5:30 PM – 6:30 PM", title: "Visit to the National Museum & Cultural Centre", desc: "Guided tour. Frederick Street, Port of Spain." },
      { time: "8:00 PM – 10:00 PM", title: "Dinner at Local Heritage Restaurant", desc: "Old Trinity by the Sea, St. Ann's. Coach returns 10:30 PM." },
    ],
  },
  {
    label: "Day 4",
    date: "Thu · Jul 2, 2026",
    short: "Day 4",
    sessions: [
      { time: "8:45 AM – 9:00 AM", title: "Opening Remarks", desc: "Brief welcome and overview of the day's agenda." },
      { time: "9:00 AM – 10:30 AM", title: "Public Financial Management Resilience", tag: "Presentation", materials: ["Debt Management Performance (DeMPA)", "PEFA Assessments", "Value for Money"], desc: "How can governments achieve financial resilience? This session explores good practices in public finance resilience including: emerging trends, early warning, debt sustainability, disaster response, climate mitigation, and fiscal transparency.", briefing: "Resilience isn't a metric — it's a portfolio of capabilities a treasury draws on when something goes wrong. Carolyn assembles five of those capabilities into a single map: early warning, debt sustainability, disaster response, climate mitigation, and fiscal transparency. For each, the session draws on a published case (Sri Lanka 2022, St. Vincent 2024, Honduras 2023) to show what worked and what didn't. Delegates leave with a self-assessment grid for their own country's resilience posture.", takeaways: ["A five-axis resilience map drawn from real published case studies", "Where early-warning signals come from, and how to wire them to the budget cycle", "The link between fiscal transparency and crisis response capacity", "A self-assessment grid for your country's current posture"], references: [{ label: "Debt Management Performance (DeMPA)", to: "/materials" }, { label: "PEFA Assessments", to: "/materials" }, { label: "About Carolyn Bowick", to: "/speakers/carolyn-bowick" }], speakers: [S.carolyn] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 12:00 PM", title: "GovTech and Public Financial Management", tag: "Demonstration", materials: ["Value for Money", "Digital Public Finance Framework"], desc: "Why did so many governments adopt GovTech tools during the pandemic? This session shows the importance of Government Resource Planning (GRP), like the FreeBalance Accountability Suite, as the digital core for GovTech.", briefing: "The 2020-2022 surge in government technology adoption left most ministries with a patchwork: one tool for permits, another for cash transfers, a third for procurement, and nothing connecting them to the budget. Matthew demonstrates how a Government Resource Planning core fixes that — the Accountability Suite as the integration layer that lets best-of-breed GovTech apps share a single source of fiscal truth. Live demo: linking three independent GovTech tools through the Suite's API.", takeaways: ["Why the GovTech patchwork problem matters for fiscal discipline", "The GRP-as-digital-core integration pattern", "A live demonstration of three GovTech tools sharing one budget source", "How to evaluate GovTech tools for integration-readiness, not just feature parity"], references: [{ label: "Value for Money", to: "/materials" }, { label: "Digital Public Finance Framework", to: "/materials" }, { label: "About Matthew Olivier", to: "/speakers/matthew-olivier" }], speakers: [S.matthew] },
      { time: "12:00 PM – 1:00 PM", title: "Public Financial Management in the Public Cloud", tag: "Presentation", desc: "Why has public cloud adoption in government accelerated? This session describes how government cloud trends and introduces mainstream public cloud concepts. The value of public cloud is rarely total cost; governments benefit from resiliency, elasticity, maintainability, scalability and security.", briefing: "Most government cloud business cases lead with cost savings and don't deliver them. Doug reframes the argument: the real value of public cloud for PFM systems is resiliency, elasticity and security posture, not TCO. The session covers sovereign-cloud options, hybrid patterns, data-residency requirements common to PFM data classes, and the four production cloud deployments FreeBalance has supported across customers in 2024-2025.", takeaways: ["Why TCO is the wrong opening argument for a cloud PFM business case", "Sovereign-cloud and hybrid options compared", "The data-residency lens specific to PFM data classes", "Four real production cloud deployments and what each customer optimised for"], references: [{ label: "Digital Public Finance Framework", to: "/materials" }, { label: "About Doug Hadden", to: "/speakers/doug-hadden" }], speakers: [S.doug] },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:30 PM", title: "Government Public Finances Practices: Lessons Learned", tag: "Panel", materials: ["PEFA Assessments", "MAPS — Methodology for Assessing Procurement Systems", "Public Investment Management (PIMA)", "Tax Administration Diagnostic (TADAT)"], desc: "This workshop follows up from previous ones by creating reform and modernisation action items based on success factors and international assessments like PEFA, MAPS, and PIMA.", briefing: "The conference's most demanding session, by design. Five customer representatives — drawn from Ghana, Mongolia, Honduras, Sierra Leone, and Trinidad & Tobago — present their hardest-won lesson from the last 18 months. After each, the room workshops a translation: how does this lesson apply to other regions, other reform stages, other political contexts. The output is a published Lessons Learned brief co-signed by every panelist and circulated to all delegations within ten days.", takeaways: ["Five honest, hard-won lessons from production reform programs", "Cross-regional translation of each lesson into actionable form", "A co-signed published brief in your post-FISC pack", "The chance to ask reform leads questions you can't ask on a webinar"], references: [{ label: "PEFA Assessments", to: "/materials" }, { label: "MAPS — Procurement Systems", to: "/materials" }, { label: "Public Investment Management (PIMA)", to: "/materials" }, { label: "Tax Administration Diagnostic (TADAT)", to: "/materials" }], speakers: [S.customers] },
      { time: "3:30 PM – 4:30 PM", title: "FreeBalance Product Roadmap Voting", tag: "Panel", materials: ["FreeBalance Suite Functionality"], desc: "How do FreeBalance customers influence the value of implementations over time? Roadmap voting has been the cornerstone for every FISC. This session enables participants to prioritise FreeBalance and government ideas using this customer-centric approach.", briefing: "The single most distinctive thing FreeBalance does as a vendor — and the conference moment that ties the whole week together. Each delegation casts a binding vote across the 23 candidate features introduced on Tuesday. Votes are weighted equally per country, regardless of customer size. The top 10 by total weight enter the FreeBalance build queue with committed delivery windows. Results are announced live before the closing remarks. No vendor on earth gives customers this kind of direct product authority; protect the time.", takeaways: ["A binding country-weighted vote on next year's product priorities", "Live announcement of the top 10 results before the closing reception", "Committed delivery windows from FreeBalance R&D on the winning items", "A printed record of every customer's vote, distributed in the takeaway pack"], references: [{ label: "FreeBalance Suite Functionality", to: "/materials" }, { label: "Tuesday's roadmap introduction", to: "/agenda/day-2/7" }], speakers: [S.fbStaff] },
      { time: "4:30 PM – 4:45 PM", title: "Closing Remarks", desc: "FISC 2026 wrap-up. Roadmap vote results announced." },
      { time: "4:45 PM – 7:00 PM", title: "Free Time" },
      { time: "7:00 PM – 10:00 PM", title: "Closing Reception and dinner at Hyatt Regency", desc: "Roadmap vote results in detail. Cultural performance and live music." },
    ],
  },
];

// Tag tones — now maps each agenda tag to a hue used by chipTone(). The
// previous hex strings + per-call-site #hex+18 alpha math gave inconsistent
// perceptual lightness across hues. OKLCH-locked lightness/chroma normalises
// the visual weight so a chip stack of mixed tags reads as one family.
//
// Call sites consume `chipTone(TAG_HUES[tag])` for {bg, fg} shapes, or
// `chipTone(TAG_HUES[tag]).fg` when only the foreground accent is needed
// (e.g. tinted-text on the day-at-a-glance strip).
export const TAG_HUES: Record<string, number> = {
  Presentation: 30,     // brand orange
  Workshop: 145,        // green
  Demonstration: 215,   // blue
  Panel: 285,           // purple
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
  { icon: Globe, label: "Delegate Community", desc: "The ministers, secretaries and reformers shaping PFM across 10+ countries.", to: "/attendees", gated: true },
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
  /** One-line editorial caption shown below the name on the homepage Host
   *  cards (and any future card surface that wants it). Keep it short —
   *  one fact or angle that adds context beyond the role + country. */
  subtitle?: string;
};

export const attendees: AttendeeEntry[] = [
  { name: "Davendranath Tancoo", role: "Minister of Finance", org: "Government of Trinidad & Tobago", country: "Trinidad & Tobago", img: davendranathTancoo, linkedin: "https://www.linkedin.com/in/davendranath-tancoo", delegationLead: true, subtitle: "Advocate for fiscal transparency since 2010." },
  { name: "Kamla Persad-Bissessar", role: "Prime Minister", org: "Government of Trinidad & Tobago", country: "Trinidad & Tobago", img: kamlaPersadBissessar, delegationLead: true, subtitle: "First woman to lead Trinidad & Tobago." },
  { salutation: "Mr.", name: "Brandon Francis", role: "Senior Systems Analyst", org: "Government of Antigua and Barbuda", country: "Antigua", delegationLead: true },
  { salutation: "Mr.", name: "Brendan J. Toner", role: "Finance Reform Director", org: "Government of Barbados", country: "Barbados" },
  { salutation: "Ms.", name: "Christina Elnei", role: "Director, Budget Modernisation", org: "Ministry of Finance", country: "South Sudan" },
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
  { title: "Welcome to FISC 2026", day: "Welcome", duration: "2:14", thumb: aboutImage, url: "#", description: "Opening cinematic from the gala reception at Hyatt Regency, Port of Spain." },
  { title: "Day 1 Highlights — National Strategies", day: "Day 1", duration: "4:32", thumb: queensRoyalCollege, url: "#", description: "Country-led keynotes and the opening workshop on aligning PFM with national strategies." },
  { title: "Day 2 Highlights — Product Co-Creation", day: "Day 2", duration: "5:08", thumb: eventsImage, url: "#", description: "Workshops on the FreeBalance Suite roadmap and customer-driven feature prioritisation." },
  { title: "Day 3 Highlights — AI in Public Finance", day: "Day 3", duration: "4:55", thumb: scarletIbis, url: "#", description: "From human-augmented PFM to prompt patterns the secretariat actually uses." },
  { title: "Day 4 Highlights — Resilience & Roadmap Voting", day: "Day 4", duration: "6:21", thumb: maracasBeach, url: "#", description: "Closing panels on resilience and the customer-driven product roadmap vote." },
  { title: "Why Trinidad? — A Letter from the Minister", day: "Feature", duration: "3:45", thumb: portOfSpainAerial, url: "#", description: "The Minister of Finance on hosting FISC 2026 in Port of Spain." },
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
  { title: "Trinidad & Tobago to Host FreeBalance International Steering Committee 2026", source: "Trinidad Express", date: "2026-04-18", url: "#", type: "Article", excerpt: "Government of Trinidad and Tobago confirms it will host the 2026 edition of FISC, bringing 20+ public finance delegates to Port of Spain." },
  { title: "FISC 2026: Why Public Financial Management Matters Now", source: "FreeBalance Insights", date: "2026-05-02", url: "#", type: "Article", excerpt: "A deep-dive interview with Doug Hadden on the themes shaping the 2026 programme." },
  { title: "Minister Highlights Digital PFM Ahead of FISC", source: "Newsday TT", date: "2026-05-09", url: "#", type: "Article", excerpt: "Minister of Finance discusses the digital transformation agenda Trinidad will showcase at the event." },
  { title: "FISC 2026 Trailer — Watch on YouTube", source: "FreeBalance · YouTube", date: "2026-05-12", url: "#", type: "Video", excerpt: "Two minutes of Caribbean rhythm and Hyatt Regency previews." },
  { title: "Live from Port of Spain — Day 1 Recap", source: "FreeBalance · LinkedIn", date: "2026-06-29", url: "#", type: "Social", excerpt: "Field updates and photos from the first day of plenary sessions." },
  { title: "Tatoli Sai Uma Sai Nain: Cobertura FISC 2026", source: "Tatoli", date: "2026-07-01", url: "#", type: "Article", excerpt: "Cobertura em português sobre a participação de Timor-Leste no FISC 2026." },
  { title: "Roadmap Voting Drives FreeBalance Product Direction", source: "Public Finance Today", date: "2026-07-03", url: "#", type: "Article", excerpt: "How the customer roadmap vote at FISC has shaped the 2026–2028 product cycle." },
];

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export type GalleryDay = "Day 1" | "Day 2" | "Day 3" | "Day 4";

export type GalleryPhoto = {
  caption: string;
  day: GalleryDay;
  /** Human-readable date, e.g. "Mon, Jun 29". Falls back to the day's date. */
  date: string;
  /** 24-hour HH:MM. Renders formatted by the consumer. */
  time: string;
  location: string;
  /** Optional photographer / source credit. */
  credit?: string;
  span?: "wide" | "tall";
};

export type GalleryDayGroup = {
  day: GalleryDay;
  date: string;
  weekday: string;
  intro: string;
  photos: GalleryPhoto[];
};

// FISC 2026 gallery — placeholder structure shipped before the event.
// Each entry is the photo we INTEND to capture, with full metadata so the
// post-event upload is a straight content swap (caller drops in src URLs
// once the photographer files them). Pre-event the Gallery page renders
// these via PlaceholderTile to keep promise-vs-delivery honest.
export const galleryDays: GalleryDayGroup[] = [
  {
    day: "Day 1",
    date: "Jun 29, 2026",
    weekday: "Monday",
    intro:
      "Opening ceremony and the country-led keynote stream — every delegation introduces its reform agenda before the workshops begin.",
    photos: [
      { caption: "Opening keynote", day: "Day 1", date: "Mon, Jun 29", time: "09:30", location: "Plenary Hall · Hyatt Regency", credit: "Official photographer", span: "wide" },
      { caption: "Delegate arrivals", day: "Day 1", date: "Mon, Jun 29", time: "08:30", location: "Lobby & registration desk" },
      { caption: "Welcome from the Minister", day: "Day 1", date: "Mon, Jun 29", time: "10:15", location: "Plenary Hall" },
      { caption: "Morning coffee circle", day: "Day 1", date: "Mon, Jun 29", time: "11:00", location: "Harbour-view terrace" },
      { caption: "Country breakout sessions", day: "Day 1", date: "Mon, Jun 29", time: "14:00", location: "Workshop rooms A–D", span: "wide" },
      { caption: "Welcome reception", day: "Day 1", date: "Mon, Jun 29", time: "19:30", location: "Rooftop terrace · Hyatt Regency" },
    ],
  },
  {
    day: "Day 2",
    date: "Jun 30, 2026",
    weekday: "Tuesday",
    intro:
      "Product co-creation day — workshops on the FreeBalance Suite roadmap and the open customer-driven feature vote.",
    photos: [
      { caption: "Roadmap voting session", day: "Day 2", date: "Tue, Jun 30", time: "09:00", location: "Plenary Hall", span: "wide" },
      { caption: "Workshop tables in the round", day: "Day 2", date: "Tue, Jun 30", time: "11:00", location: "Workshop rooms A–D" },
      { caption: "Country-pair pairing exercise", day: "Day 2", date: "Tue, Jun 30", time: "13:30", location: "Breakout lounges" },
      { caption: "Audience in the round", day: "Day 2", date: "Tue, Jun 30", time: "15:00", location: "Plenary Hall" },
      { caption: "Steelpan evening preview", day: "Day 2", date: "Tue, Jun 30", time: "18:00", location: "Hyatt Regency · Atrium" },
      { caption: "Cultural performance", day: "Day 2", date: "Tue, Jun 30", time: "20:00", location: "Queen's Park Savannah" },
    ],
  },
  {
    day: "Day 3",
    date: "Jul 1, 2026",
    weekday: "Wednesday",
    intro:
      "AI in public finance — human-augmented PFM, prompt patterns the secretariat uses in practice, and a North Coast excursion.",
    photos: [
      { caption: "AI panel session", day: "Day 3", date: "Wed, Jul 1", time: "09:30", location: "Plenary Hall", span: "wide" },
      { caption: "Prompt patterns workshop", day: "Day 3", date: "Wed, Jul 1", time: "11:30", location: "Workshop room A" },
      { caption: "Off-site at Maracas Bay", day: "Day 3", date: "Wed, Jul 1", time: "13:00", location: "North Coast · 40 min drive" },
      { caption: "Shark-and-bake stop", day: "Day 3", date: "Wed, Jul 1", time: "14:30", location: "Maracas Coast" },
      { caption: "Caroni Swamp at golden hour", day: "Day 3", date: "Wed, Jul 1", time: "17:30", location: "Caroni Swamp · Scarlet Ibis reserve" },
      { caption: "Gala dinner", day: "Day 3", date: "Wed, Jul 1", time: "20:00", location: "Harbour-view restaurant", credit: "Official photographer" },
    ],
  },
  {
    day: "Day 4",
    date: "Jul 2, 2026",
    weekday: "Thursday",
    intro:
      "Resilience and roadmap voting — closing panels, the customer-driven product roadmap vote, and the closing reception.",
    photos: [
      { caption: "Closing keynote", day: "Day 4", date: "Thu, Jul 2", time: "09:30", location: "Plenary Hall", span: "wide" },
      { caption: "Roadmap vote results announced", day: "Day 4", date: "Thu, Jul 2", time: "11:00", location: "Plenary Hall" },
      { caption: "Delegate group portrait", day: "Day 4", date: "Thu, Jul 2", time: "13:00", location: "Hyatt waterfront steps" },
      { caption: "Final workshop wrap-up", day: "Day 4", date: "Thu, Jul 2", time: "14:30", location: "Workshop rooms A–D" },
      { caption: "Plenary applause", day: "Day 4", date: "Thu, Jul 2", time: "16:00", location: "Plenary Hall", span: "wide" },
      { caption: "Closing reception", day: "Day 4", date: "Thu, Jul 2", time: "19:00", location: "Rooftop terrace · Hyatt Regency" },
    ],
  },
];

// Flat list — preserved for surfaces that aren't grouped (counters, hero
// metadata). Derives from galleryDays so the source of truth stays single.
export const galleryPhotos: GalleryPhoto[] = galleryDays.flatMap((d) => d.photos);

// ---------------------------------------------------------------------------
// Delegate Guide (Trinidad & Tobago, 2026 edition)
// ---------------------------------------------------------------------------

export type ChecklistItem = {
  task: string;
  /** 2-3 word version used in the homepage "Next milestone" callout. */
  shortLabel: string;
  detail?: string;
  dueDate: string;
};

/**
 * Render a relative-time label for a checklist item's due date. Used by the
 * homepage action queue (live, ticks with the countdown) and the delegate
 * guide page (one-shot, evaluated on render).
 *
 * Returns both a human label and a tone bucket so the call-site can colour-
 * code without re-implementing the date math.
 */
export type DeadlineTone = "overdue" | "soon" | "future";

export function formatDeadline(
  dueDate: string,
  now: Date = new Date(),
): { label: string; tone: DeadlineTone } {
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 0) {
    const od = Math.abs(days);
    if (od === 1) return { label: "1 day overdue", tone: "overdue" };
    if (od < 14) return { label: `${od} days overdue`, tone: "overdue" };
    if (od < 60) return { label: `${Math.floor(od / 7)} weeks overdue`, tone: "overdue" };
    return { label: `${Math.floor(od / 30)} months overdue`, tone: "overdue" };
  }

  if (days === 0) return { label: "Due today", tone: "soon" };
  if (days === 1) return { label: "Due tomorrow", tone: "soon" };
  if (days < 7) return { label: `Due in ${days} days`, tone: "soon" };
  if (days < 14) return { label: `Due in ${days} days`, tone: "future" };
  if (days < 60) return { label: `Due in ${Math.ceil(days / 7)} weeks`, tone: "future" };
  return { label: `Due in ${Math.ceil(days / 30)} months`, tone: "future" };
}
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
    "Everything you need before you land in Port of Spain — what to pack, how to clear arrivals, and how to settle in fast. The secretariat sends personalised travel details two weeks before arrival.",
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
  // dueDate values target a homepage view at ~T-40 days (mid-May 2026): one
  // item recently overdue, three near-term, three in the upcoming weeks. This
  // matches the urgency a real delegate would feel at this point in the
  // schedule. Adjust dates when the conference moves; the homepage queue and
  // the delegate guide page both compute their labels live from these values.
  checklist: [
    { shortLabel: "Delegation lead", task: "Confirm your delegation lead with the secretariat", dueDate: "2026-05-18" },
    { shortLabel: "Visa letter", task: "Request your visa invitation letter from the secretariat", dueDate: "2026-05-25" },
    { shortLabel: "Book flights", task: "Book your flights into Piarco International (POS)", dueDate: "2026-05-25" },
    { shortLabel: "Hotel booking", task: "Reserve your room at the Hyatt Regency", detail: "Booking code: FISC26 · valid through Jun 1.", dueDate: "2026-06-01" },
    { shortLabel: "Profile upload", task: "Upload your delegate profile and headshot", dueDate: "2026-06-08" },
    { shortLabel: "Photo consent", task: "Sign the photography and recording consent form", dueDate: "2026-06-15" },
    { shortLabel: "Companion app", task: "Install the delegate companion app (works offline)", dueDate: "2026-06-22" },
  ],
  essentials: [
    {
      category: "Passport & Visa",
      items: [
        "Your passport must be valid for at least six months beyond arrival.",
        "Most delegations enter visa-free for up to 90 days.",
        "For visa-required nationalities, the secretariat coordinates official invitation letters.",
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
        "Plenaries: business smart. Workshops: business casual.",
        "Gala dinner: smart cocktail or national dress.",
        "A handshake is the standard greeting. Titles are appreciated on first introduction.",
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
