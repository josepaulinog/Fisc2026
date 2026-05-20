import type { ComponentType, SVGProps } from "react";

// 3:2 aspect SVG flag components. Static imports keep this tree-shakable —
// only the flags actually referenced ship in the bundle. When you reference
// a new country in `data.ts > COUNTRY_ISO`, add the matching import here.
import AF from "country-flag-icons/react/3x2/AF";
import AG from "country-flag-icons/react/3x2/AG";
import BB from "country-flag-icons/react/3x2/BB";
import CA from "country-flag-icons/react/3x2/CA";
import GH from "country-flag-icons/react/3x2/GH";
import GY from "country-flag-icons/react/3x2/GY";
import HN from "country-flag-icons/react/3x2/HN";
import JM from "country-flag-icons/react/3x2/JM";
import LA from "country-flag-icons/react/3x2/LA";
import LC from "country-flag-icons/react/3x2/LC";
import LK from "country-flag-icons/react/3x2/LK";
import LR from "country-flag-icons/react/3x2/LR";
import MN from "country-flag-icons/react/3x2/MN";
import SC from "country-flag-icons/react/3x2/SC";
import SL from "country-flag-icons/react/3x2/SL";
import SR from "country-flag-icons/react/3x2/SR";
import SS from "country-flag-icons/react/3x2/SS";
import TL from "country-flag-icons/react/3x2/TL";
import TT from "country-flag-icons/react/3x2/TT";
import TV from "country-flag-icons/react/3x2/TV";
import XK from "country-flag-icons/react/3x2/XK";

import { COUNTRY_ISO } from "../data";

type FlagComponent = ComponentType<SVGProps<SVGSVGElement> & { title?: string }>;

const FLAG_BY_ISO: Record<string, FlagComponent> = {
  AF, AG, BB, CA, GH, GY, HN, JM, LA, LC, LK, LR, MN, SC, SL, SR, SS, TL, TT, TV, XK,
};

/**
 * Render a country flag by display name (e.g. "Trinidad & Tobago") or
 * raw ISO alpha-2 code (e.g. "TT"). Returns null when the country isn't
 * mapped — callers should pair with a sensible fallback in surrounding
 * markup (an icon, a dot, etc.).
 */
export function CountryFlag({
  country,
  className = "h-3 w-auto rounded-sm",
  title,
}: {
  country: string;
  className?: string;
  title?: string;
}) {
  const iso = COUNTRY_ISO[country] ?? (country.length === 2 ? country.toUpperCase() : undefined);
  if (!iso) return null;
  const Flag = FLAG_BY_ISO[iso];
  if (!Flag) return null;
  return <Flag className={className} title={title ?? country} />;
}

/** Cheap availability check (used by Profile to swap MapPin for the flag). */
export function hasFlagFor(country: string): boolean {
  const iso = COUNTRY_ISO[country];
  return !!iso && !!FLAG_BY_ISO[iso];
}
