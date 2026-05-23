import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, MapPin, Search, X } from "lucide-react";
import { Chevron } from "./Chevron";
import { CountryFlag, hasFlagFor } from "../CountryFlag";

/**
 * CountryDropdown — searchable popover with flag-prefixed country rows.
 *
 * Replaces the previous <datalist>-backed input, which rendered a plain
 * native-OS autocomplete that didn't show flags and ignored the design system.
 * This version is a true combobox: clicking opens a glass panel, the search
 * input filters the list live, ↑/↓/Enter navigate by keyboard, Esc closes,
 * outside-click closes.
 *
 * Props:
 *   - `value`: current selected country name (or "" / unknown string)
 *   - `onChange(name)`: called when the user picks an option
 *   - `options`: full country list to render (names; flag lookup is automatic)
 *   - `error`: optional error class trigger
 *   - `fieldBorder(hasError)`: shared border/focus class helper from the form
 */
export function CountryDropdown({
  value,
  onChange,
  options,
  error,
  fieldBorder,
  placeholder = "Select country",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  fieldBorder: (hasError: boolean) => string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((c) => c.toLowerCase().includes(q));
  }, [query, options]);

  // Reset highlight when query / open changes.
  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  // Focus search input when opening.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => searchRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [open]);

  // Outside click + Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Scroll active row into view as user arrows through.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const row = listRef.current.querySelector<HTMLElement>(`[data-row-index="${activeIndex}"]`);
    row?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const commit = (country: string) => {
    onChange(country);
    setOpen(false);
    setQuery("");
  };

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = filtered[activeIndex];
      if (pick) commit(pick);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const showFlag = hasFlagFor(value);
  const hasValue = !!value.trim();

  return (
    <label className="block">
      <span className="text-sm text-neutral-700" style={{ fontWeight: 500 }}>Country</span>
      <div ref={containerRef} className="relative mt-2">
        {/* Trigger button — looks exactly like a text field so it inherits
            the form's visual rhythm. Acts as the combobox per WAI-ARIA. */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={() => setOpen((v) => !v)}
          className={`w-full flex items-center bg-neutral-50 rounded-sm px-4 py-3 text-left transition-fluid focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 active:scale-[0.98] ${fieldBorder(!!error)}`}
        >
          <span className="shrink-0 flex items-center justify-center w-5 h-4">
            {showFlag ? (
              <CountryFlag country={value} className="h-3.5 w-auto rounded-[1px] ring-1 ring-black/10" />
            ) : (
              <MapPin size={16} strokeWidth={1.5} className="text-neutral-400" />
            )}
          </span>
          <span
            className={`flex-1 min-w-0 px-3 truncate ${hasValue ? "text-neutral-900" : "text-neutral-400"}`}
          >
            {hasValue ? value : placeholder}
          </span>
          <Chevron
            size={13}
            strokeWidth={1.5}
            className={`text-neutral-400 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.99 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.99, transition: { duration: 0.14 } }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="absolute z-30 top-full left-0 right-0 mt-1.5 origin-top"
            >
              <div
                className="bg-white/95 backdrop-blur-xl ring-1 ring-black/[0.06] rounded-md overflow-hidden"
                style={{ boxShadow: "0 24px 60px -24px rgba(0,0,0,0.22), 0 4px 12px -6px rgba(0,0,0,0.08)" }}
              >
                {/* Search row */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-black/[0.05] bg-neutral-50/60">
                  <Search size={14} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onSearchKey}
                    placeholder="Search countries"
                    className="flex-1 min-w-0 bg-transparent py-1.5 text-[0.9375rem] outline-none placeholder:text-neutral-400 text-neutral-900"
                    aria-autocomplete="list"
                    aria-controls={listboxId}
                    role="combobox"
                    aria-expanded
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        searchRef.current?.focus();
                      }}
                      aria-label="Clear search"
                      className="w-6 h-6 rounded-sm text-neutral-400 hover:bg-black/[0.05] hover:text-neutral-700 flex items-center justify-center transition-fluid"
                    >
                      <X size={12} strokeWidth={1.5} />
                    </button>
                  )}
                </div>

                {/* Option list */}
                <div
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  aria-label="Countries"
                  className="max-h-64 overflow-y-auto py-1"
                >
                  {filtered.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-neutral-500">
                      No countries match "{query}".
                    </div>
                  ) : (
                    filtered.map((country, i) => {
                      const isSelected = country === value;
                      const isActive = i === activeIndex;
                      const hasFlag = hasFlagFor(country);
                      return (
                        <button
                          key={country}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          data-row-index={i}
                          onMouseEnter={() => setActiveIndex(i)}
                          onClick={() => commit(country)}
                          className={`group w-full flex items-center gap-3 px-3 py-2 text-left transition-fluid ${
                            isActive ? "bg-black/[0.04]" : "hover:bg-black/[0.03]"
                          } ${isSelected ? "text-neutral-950" : "text-neutral-700"}`}
                        >
                          <span className="shrink-0 flex items-center justify-center w-5 h-4">
                            {hasFlag ? (
                              <CountryFlag country={country} className="h-3.5 w-auto rounded-[1px] ring-1 ring-black/10" />
                            ) : (
                              <span className="w-3.5 h-2.5 rounded-[1px] bg-neutral-200" aria-hidden />
                            )}
                          </span>
                          <span
                            className="flex-1 min-w-0 truncate text-[0.9375rem]"
                            style={{ fontWeight: isSelected ? 500 : 400 }}
                          >
                            {country}
                          </span>
                          {isSelected && (
                            <Check size={14} strokeWidth={1.75} className="text-neutral-950 shrink-0" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <div className="mt-1.5 text-sm text-red-600 inline-flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-red-600" /> {error}
        </div>
      )}
    </label>
  );
}
