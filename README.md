# FISC 2026 — Website Redesign

Front-end code bundle for the redesign of the **FISC (FreeBalance International Steering Committee)** conference website — the annual gathering where public financial management leaders from governments worldwide meet to shape the FreeBalance product roadmap.

**Live site:** https://fisc-2026.freebalance.com/

---

## About

The redesign replaces a dated, hard-to-update event site with a component-driven front end that the marketing team can extend for each annual edition. It covers the full delegate journey: what the summit is, who is speaking, what happens when, and how to register.

## Features

- **Agenda and sessions** — multi-day schedule with tracks, session detail, and speaker cross-links
- **Speaker profiles** — bios, organizations, and session affiliations
- **Registration flow** — delegate sign-up wired to the event and CRM workflows
- **Sponsor and partner modules** — tiered placement blocks reusable across editions
- **Responsive and accessible** — mobile-first layouts, WCAG-conscious contrast, keyboard-navigable components
- **Year-over-year reuse** — content and configuration separated from layout so the next edition forks cleanly

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React |
| Build tool | Vite |
| Styling | Utility-first CSS |
| Design handoff | Figma |
| Hosting | Cloud static hosting via CI/CD |

## Running the code

```bash
npm i        # install dependencies
npm run dev  # start the development server
```

Then open the local URL printed in the terminal.

```bash
npm run build    # production build
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  components/   Reusable UI (nav, cards, section blocks)
  sections/     Page-level composed sections
  data/         Agenda, speakers, sponsors content
  styles/       Global styles and tokens
  assets/       Images, icons, fonts
```

## Deployment

Pushes to the default branch build and deploy through the project's CI/CD pipeline. Preview builds run on pull requests before merge.

## Roadmap

- [ ] Multi-language delegate content
- [ ] Session filtering by track and audience
- [ ] Calendar export for individual sessions
- [ ] Post-event archive mode for previous editions

## Author

**José Manuel Paulino Germán** — design and front-end development
[josepaulino.com](https://www.josepaulino.com) · [LinkedIn](https://www.linkedin.com/in/josepaulinog/) · [GitHub](https://github.com/josepaulinog)
