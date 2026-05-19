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

export const FB_LOGO = logoUrl;
export const HERO_IMG =
  "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=2000&q=85";
export const ABOUT_IMG =
  "https://freebalance.com/wp-content/uploads/2021/06/FISC-2019_Day-02_A013.jpg";
export const VENUE_IMG_1 =
  "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&q=80";
export const VENUE_IMG_2 =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";
export const VENUE_IMG_3 =
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80";

export const HERO_ABOUT =
  "https://freebalance.com/wp-content/uploads/2021/06/FISC-2019_Day-02_A013.jpg";
export const HERO_AGENDA =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=2000&q=85";
export const HERO_SPEAKERS =
  "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=2000&q=85";
export const HERO_VENUE =
  "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=2000&q=85";
export const HERO_RESOURCES =
  "https://images.unsplash.com/photo-1568667256549-094345857637?w=2000&q=85";

export const VENUE_HOTEL =
  "https://images.unsplash.com/photo-1455587734955-081b22074882?w=2000&q=85";
export const VENUE_STREET =
  "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1600&q=80";
export const VENUE_FOOD =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80";
export const VENUE_STEELPAN =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80";
export const VENUE_NATURE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80";

export const BRAND = "#fd6b18";
export const BRAND_SOFT = "#ffb27a";
export const INK = "#0a0a0a";

export const navItems = [
  { label: "About", to: "/about" },
  { label: "Agenda", to: "/agenda" },
  { label: "Speakers", to: "/speakers" },
  { label: "Venue", to: "/venue" },
  { label: "Resources", to: "/resources" },
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
};

export type AgendaDay = {
  label: string;
  date: string;
  short: string;
  sessions: Session[];
};

export const S = {
  matthew: { name: "Matthew Olivier", role: "VP, Revenue Marketing", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/matthew-oliver-150x150.png" },
  carolyn: { name: "Carolyn Bowick", role: "Director of Marketing Communication", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/carolyn2-150x150.jpeg" },
  manuel: { name: "Manuel Schiappa Pietra", role: "President and CEO", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/manuel-pietra-150x150.jpg" },
  santina: { name: "Santina Viegas Cardoso", role: "Minister of Finance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/02/Santina-150x150.webp" },
  xanana: { name: "HE Kay Rala Xanana Gusmão", role: "Prime Minister", img: "https://fisc.freebalance.com/wp-content/uploads/2025/04/prime1-150x150.jpg" },
  aldo: { name: "Aldo Sagastume", role: "VP, Public Financial Management", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/aldo-bustamante-150x150.png" },
  pedro: { name: "Pedro Jorge", role: "VP, Research and Development", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/pedro-jorge-150x150.png" },
  doug: { name: "Doug Hadden", role: "EVP, Strategy and Innovation", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/doug-hadden-150x150.jpg" },
  gerard: { name: "Gerard Rao", role: "VP, Services", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/gerard-rao-150x150.jpg" },
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
      { time: "9:30 AM – 10:00 AM", title: "Opening Remarks", desc: "Official conference opening by the Minister of Finance and the CEO of FreeBalance.", speakers: [S.manuel, S.santina] },
      { time: "10:00 AM – 11:00 AM", title: "Implement Public Financial Management for National Strategies", tag: "Presentation", desc: "What should be the North Star for government performance in your country? This session builds the case for aligning public finance classifications and programs directly with national development strategies and other strategic objectives.", speakers: [S.manuel] },
      { time: "11:00 AM – 11:30 AM", title: "Break" },
      { time: "11:30 AM – 12:00 PM", title: "Address from Prime Minister", tag: "Presentation", desc: "Address from the Prime Minister of Trinidad and Tobago.", speakers: [S.xanana] },
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
      { time: "9:00 AM – 10:30 AM", title: "What's New: FreeBalance Accountability Suite Product", tag: "Demonstration", desc: "What has FreeBalance been developing since the last FISC in 2019? This session will focus on new functionality including: Medium-Term Financial Frameworks, biometrics, legislative oversight, and drill-down dashboards with demonstrations.", speakers: [S.aldo] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 1:00 PM", title: "Workshop: Implementing Public Financial Management for National Strategies", tag: "Workshop", desc: "How can government performance management theory become reality? This workshop demonstrates how to align public accounting with performance management through integration of a Chart of Accounts with a Chart of Goals.", speakers: [S.aldo] },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:30 PM", title: "Workshop: Government Public Finances Practices Aspirations", tag: "Workshop", desc: "How can governments leverage FISC lessons? Subjects include Government Resource Planning (GRP), progressive activation, project management, organizational change management, and capacity building.", speakers: [S.fbStaff] },
      { time: "3:30 PM – 4:30 PM", title: "What's New: FreeBalance Accountability Platform", tag: "Presentation", desc: "How can an open platform protect your public finance investment? This session describes our open system mandate with deployment portability.", speakers: [S.pedro] },
      { time: "4:30 PM – 5:30 PM", title: "FreeBalance Product Roadmap Introduction", tag: "Presentation", desc: "How can you influence FreeBalance product priorities? This session introduces you to new product ideas generated from recent FreeBalance experience in the PFM world, research, conferences, and government tenders.", speakers: [S.doug] },
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
      { time: "9:00 AM – 10:30 AM", title: "Digital Public Finance Framework", tag: "Presentation", desc: "How can public finance transform digitally? Governments are increasingly looking to technology to improve outcomes and efficiency. This session introduces the FreeBalance Digital Public Finance Framework Template, covering digital readiness, digital scope, digital maturity, public finance reform and digital core.", speakers: [S.doug] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 1:00 PM", title: "Artificial Intelligence in Public Finance", tag: "Demonstration", desc: "Should AI automate or augment public service activities? This session builds the case for human-augmented PFM as the more effective and ethical choice. We'll introduce the FreeBalance human augmentation and open system approach, explore prompt engineering examples for research, summarization, and insight.", speakers: [S.doug] },
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
      { time: "9:00 AM – 10:30 AM", title: "Public Financial Management Resilience", tag: "Presentation", desc: "How can governments achieve financial resilience? This session explores good practices in public finance resilience including: emerging trends, early warning, debt sustainability, disaster response, climate mitigation, and fiscal transparency.", speakers: [S.carolyn] },
      { time: "10:30 AM – 11:00 AM", title: "Break" },
      { time: "11:00 AM – 12:00 PM", title: "GovTech and Public Financial Management", tag: "Demonstration", desc: "Why did so many governments adopt GovTech tools during the pandemic? This session shows the importance of Government Resource Planning (GRP), like the FreeBalance Accountability Suite, as the digital core for GovTech.", speakers: [S.matthew] },
      { time: "12:00 PM – 1:00 PM", title: "Public Financial Management in the Public Cloud", tag: "Presentation", desc: "Why has public cloud adoption in government accelerated? This session describes how government cloud trends and introduces mainstream public cloud concepts. The value of public cloud is rarely total cost; governments benefit from resiliency, elasticity, maintainability, scalability and security.", speakers: [S.doug] },
      { time: "1:00 PM – 2:00 PM", title: "Lunch" },
      { time: "2:00 PM – 3:30 PM", title: "Government Public Finances Practices: Lessons Learned", tag: "Panel", desc: "This workshop follows up from previous ones by creating reform and modernization action items based on success factors and international assessments like PEFA, MAPS, and PIMA.", speakers: [S.customers] },
      { time: "3:30 PM – 4:30 PM", title: "FreeBalance Product Roadmap Voting", tag: "Panel", desc: "How do FreeBalance customers influence the value of implementations over time? Roadmap voting has been the cornerstone for every FISC. This session enables participants to prioritize FreeBalance and government ideas using this customer-centric approach.", speakers: [S.fbStaff] },
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

export const speakers = [
  { name: "Manuel Schiappa Pietra", role: "President and CEO", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/manuel-pietra-150x150.jpg", linkedin: "https://www.linkedin.com/in/manuel-schiappa-pietra/", twitter: "https://twitter.com/PietraCEO" },
  { name: "Santina Viegas Cardoso", role: "Minister of Finance", org: "Government of Timor Leste", img: "https://fisc.freebalance.com/wp-content/uploads/2025/02/Santina-150x150.webp", email: "mailto:info@mof.gov.tl", linkedin: "https://www.linkedin.com/company/ministry-of-finance-timor-leste/" },
  { name: "HE Kay Rala Xanana Gusmão", role: "Prime Minister", org: "Government of Timor Leste", img: "https://fisc.freebalance.com/wp-content/uploads/2025/04/prime1-150x150.jpg", linkedin: "#", twitter: "#" },
  { name: "Doug Hadden", role: "EVP, Strategy and Innovation", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/doug-hadden-150x150.jpg", email: "mailto:dhadden@freebalance.com", linkedin: "https://www.linkedin.com/in/haddencatalyst/", twitter: "https://twitter.com/dalytics" },
  { name: "Aldo Sagastume", role: "VP, Public Financial Management", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/aldo-bustamante-150x150.png", email: "mailto:asagastume@freebalance.com", linkedin: "https://www.linkedin.com/in/aldo-sagastume-b2b7319/" },
  { name: "Carolyn Bowick", role: "Director of Marketing Communication", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/carolyn2-150x150.jpeg", email: "mailto:carolyn.bowick@freebalance.com", linkedin: "https://www.linkedin.com/in/carolynbowick" },
  { name: "Gerard Rao", role: "VP, Services", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/gerard-rao-150x150.jpg", email: "mailto:grao@freebalance.com", linkedin: "https://www.linkedin.com/in/gerard-s-rao-9bb8611/", twitter: "https://x.com/freebalance" },
  { name: "Matthew Olivier", role: "VP, Revenue Marketing", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/matthew-oliver-150x150.png", email: "mailto:molivier@freebalance.com", linkedin: "https://www.linkedin.com/in/matthewolivier/", twitter: "https://x.com/oliviermktg" },
  { name: "Pedro Jorge", role: "VP, Research and Development", org: "FreeBalance", img: "https://fisc.freebalance.com/wp-content/uploads/2025/03/pedro-jorge-150x150.png", email: "mailto:pjorge@freebalance.com", linkedin: "https://www.linkedin.com/in/pedro-jorge-81a177b/" },
];

export const resources = [
  { icon: FileText, label: "Delegate Guide" },
  { icon: Play, label: "Recorded Sessions" },
  { icon: Download, label: "Presentations" },
  { icon: ImageIcon, label: "Photo Gallery" },
  { icon: Mic, label: "Blog & Media" },
  { icon: Globe, label: "Country Stories" },
];

export const countries = [
  "Trinidad & Tobago", "Timor-Leste", "Ghana", "Sierra Leone", "Liberia",
  "Guyana", "Honduras", "Mongolia", "Kosovo", "Afghanistan", "Suriname",
  "St. Lucia", "Barbados", "Jamaica", "Antigua", "South Sudan",
];
