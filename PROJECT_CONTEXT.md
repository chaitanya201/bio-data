# Project Context — Arjun Deshmukh Marriage Biodata Website

> **For new agents:** This document is the single source of truth for the current state of this project. Read it fully before making any changes.

---

## Overview

A **premium interactive marriage biodata website** built with React + TypeScript + Vite, replacing a traditional PDF biodata. The subject is **Arjun Rajesh Deshmukh** — a Maharashtrian groom, Staff DevOps Engineer at Razorpay, Pune (originally from Nagpur).

**Dev server:** `npm run dev` → runs on `http://localhost:5175/` (ports 5173 and 5174 are in use)  
**Build:** `npm run build` → clean build, no errors  
**TypeScript:** `npx tsc --noEmit` → 0 blocking errors (some pre-existing Tailwind v4 deprecation warnings and a Framer Motion easing type warning in Hero.tsx — both are cosmetic/non-blocking)

---

## Tech Stack

| Package | Version | Notes |
|---|---|---|
| React | 19 | Strict mode |
| TypeScript | ~6.0 | `noUnusedLocals: true`, `noUnusedParameters: true` |
| Vite | 8 | With `@tailwindcss/vite` plugin |
| Tailwind CSS | v4 | Configured via Vite plugin, NOT `tailwind.config.js`. Uses `@theme` directive |
| Framer Motion | latest | `whileInView`, `AnimatePresence`, page transitions |
| React Three Fiber | latest | 3D crystal scene |
| @react-three/drei | latest | `OrbitControls`, `MeshDistortMaterial`, `Float`, `Stars` |
| Lenis | latest | Smooth scroll. Import: `import Lenis from 'lenis'` (default export) |
| qrcode.react | latest | **Named export only:** `import { QRCodeSVG } from 'qrcode.react'` — NO default export |
| Lucide React | latest | LinkedIn icon does NOT exist — use `Link` icon instead |
| jsPDF | latest | In-browser PDF generation |
| html2canvas | latest | DOM-to-canvas for bilingual PDF rendering |
| @fontsource/playfair-display | — | Loaded in `index.css` |
| @fontsource/inter | — | Loaded in `index.css` |

---

## Project Structure

```
first-proj/
├── index.html                        # Has Noto Sans Devanagari Google Font link
├── src/
│   ├── App.tsx                       # Root: wraps with LanguageProvider, renders all sections
│   ├── index.css                     # Global styles, Tailwind v4, fonts, Marathi theme overrides
│   ├── main.tsx
│   ├── data/
│   │   └── biodata.ts                # ALL biodata content (single source of truth)
│   ├── locales/
│   │   ├── en.ts                     # English translations + Translations type + Lang type
│   │   └── mr.ts                     # Marathi translations (satisfies Translations type)
│   ├── context/
│   │   └── LanguageContext.tsx       # LanguageProvider + useLanguage() hook
│   ├── hooks/
│   │   ├── useLenis.ts               # Lenis smooth scroll setup
│   │   ├── useMousePosition.ts       # Mouse tracking + useTilt()
│   │   └── useCounterAnimation.ts    # Animated counter with IntersectionObserver
│   └── components/
│       ├── layout/
│       │   ├── Navigation.tsx
│       │   ├── ScrollProgress.tsx
│       │   ├── WelcomeSplash.tsx     # Has language picker on first visit
│       │   └── Footer.tsx
│       ├── ui/
│       │   ├── ParticleBackground.tsx
│       │   ├── MouseGlow.tsx
│       │   ├── MusicPlayer.tsx       # Web Audio API ambient drone (no external file)
│       │   └── LanguageToggle.tsx    # Floating EN | मराठी toggle (bottom-left, z-50)
│       └── sections/
│           ├── Hero.tsx
│           ├── ThreeDIntro.tsx
│           ├── PersonalInfo.tsx      # Completely rewritten as mobile-first dashboard
│           ├── FamilyBackground.tsx
│           ├── FamilyTree.tsx
│           ├── EducationJourney.tsx
│           ├── CareerJourney.tsx
│           ├── Skills.tsx
│           ├── Personality.tsx
│           ├── PhotoGallery.tsx
│           ├── Achievements.tsx
│           ├── LifeTimeline.tsx
│           ├── MaharashtraMap.tsx
│           ├── DayInLife.tsx
│           ├── HoroscopeCard.tsx
│           ├── LifePartner.tsx
│           ├── Contact.tsx
│           ├── QRCodeSection.tsx
│           └── PDFDownload.tsx
```

---

## Section Order in App.tsx

```
Hero → ThreeDIntro → PersonalInfo → FamilyBackground → FamilyTree →
EducationJourney → CareerJourney → Skills → Personality → PhotoGallery →
Achievements → LifeTimeline → MaharashtraMap → DayInLife → HoroscopeCard →
LifePartner → Contact → QRCodeSection → PDFDownload
```

Global overlays (rendered when `splashDone`): `ParticleBackground`, `MouseGlow`, `ScrollProgress`, `Navigation`, `MusicPlayer`, `LanguageToggle`

---

## App.tsx Architecture

```tsx
export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

function AppInner() {
  const [splashDone, setSplashDone] = useState(false);
  useLenis();
  // renders WelcomeSplash, then all sections
}
```

---

## i18n System (Multi-Language: English ↔ Marathi)

### Architecture

- `src/locales/en.ts` — English strings, exports `en` object, `Lang` type, `Translations` type (`typeof en`)
- `src/locales/mr.ts` — Marathi strings, satisfies `Translations` type
- `src/context/LanguageContext.tsx` — `LanguageProvider`, `useLanguage()` hook
- `src/components/ui/LanguageToggle.tsx` — Floating button, bottom-left, z-50

### useLanguage() hook

```tsx
import { useLanguage } from '../../context/LanguageContext';

export default function SomeComponent() {
  const { t, lang, isMarathi, toggleLang, setLang } = useLanguage();
  // t.hero.badge, t.nav.home, etc.
}
```

`t` is the full `Translations` object for the active language.

### localStorage key

`'biodata-lang'` — stores `'en'` or `'mr'`

### First Visit Behaviour

`WelcomeSplash` detects `!localStorage.getItem('biodata-lang')` → shows language picker (🇬🇧 English / 🇮🇳 मराठी buttons) before the main splash animation. Once picked, the normal splash plays and `onDone()` fires.

### Marathi Theme

When `lang === 'mr'`, `document.documentElement` gets:
- Class `lang-mr`
- `lang="mr"` attribute

CSS in `index.css` overrides under `html.lang-mr`:
- Font: `'Noto Sans Devanagari', sans-serif` (loaded from Google Fonts in `index.html`)
- Saffron accent `#FF6B35` replaces gold `#F59E0B` in gradient classes
- `glass-gold` background becomes saffron-tinted
- Scrollbar thumb becomes `#FF6B35`

### Translation Key Structure (abbreviated)

```
t.nav.{ home, about, family, education, career, skills, gallery, contact }
t.splash.{ welcome, title, subtitle, selectLang, selectPrompt, btnEnglish, btnMarathi }
t.hero.{ badge, greeting, tagline, cta1, cta2, statAge, statCity, statCareer, labelAge, labelCity, labelCareer }
t.intro3d.{ badge, title, titleAccent, hint }
t.personal.{ badge, title, titleAccent, profession, quickFacts, aboutMe, interests, horoscopeSnap, viewHoroscope,
              facts.{ height, weight, weightSub, blood, bloodSub, gotra, native, nativeSub, current, currentSub, rashi, rashiSub, nakshatra, nakshatraSub },
              story[].{ emoji, title, body },
              interestPills[] }
t.family.{ badge, title, titleAccent, paternal, maternal,
           members[].{ name, relation, occupation },
           paternalGrandfather, paternalGrandmother, maternalGrandfather, maternalGrandmother }
t.familyTree.{ badge, title, titleAccent, grandparents, parents, groomSiblings,
              roles.{ paternalGrandfather, paternalGrandmother, maternalGrandfather, maternalGrandmother, father, mother, groom, sister } }
t.education.{ badge, title, titleAccent }
t.career.{ badge, title, titleAccent, counters[], typeInternship, typeFulltime }
t.skills.{ badge, title, titleAccent, categories.{ Frontend, Backend, DevOps, Observability } }
t.personality.{ badge, title, titleAccent, lifestyle, values[], hobbies[].{ icon, title, description } }
t.gallery.{ badge, title, titleAccent, all,
           categories.{ 'Professional Life', 'Travel', 'Family', 'College Days', 'Fitness' } }
t.achievements.{ badge, title, titleAccent, tapHint, tapReveal }
t.timeline.{ badge, title, titleAccent, events[].{ year, title, description, icon } }
t.map.{ badge, title, titleAccent, nativeBadge, nativeCity, nativeDesc, currentBadge, currentCity, currentDesc, distance, distanceLabel }
t.dayInLife.{ badge, title, titleAccent, items[].{ time, title, description, icon, color } }
t.horoscope.{ badge, title, titleAccent, clickHint, birthDetails, rashiLabel, nakshatraLabel, gotraLabel, manglikLabel, tobLabel, pobLabel, backTitle, tapReveal }
t.partner.{ badge, title, titleAccent, intro, expectations[].{ icon, title, description } }
t.contact.{ badge, title, titleAccent, thankYou, labels.{ phone, email, linkedin, address }, lookingForward, closingPara, callNow, sendEmail }
t.qr.{ badge, title, titleAccent, scanHint, copyLink, copied, whatsapp }
t.pdf.{ badge, title, titleAccent, cardTitle, cardDesc, btnDownload, btnDownloaded, privacy,
       sections.{ personalInfo, familyDetails, education, career, contact, marriageBiodata, footer,
                  fullName, dateOfBirth, heightWeight, bloodGroup, nativePlace, currentCity,
                  religion, gotra, rashiNakshatra, manglik, father, mother, phone, email, linkedin, address } }
t.footer.{ tagline, credit }
```

---

## biodata.ts — Data Structure

All content lives in `src/data/biodata.ts`. Key exports:

```ts
personalInfo        // name, photo, tagline, dob, height, weight, etc.
familyInfo          // father, mother, siblings, paternal, maternal grandparents
educationData       // array of { year, institution, degree, icon, color }
careerData          // array of { year, company, role, type, duration, location, description }
counters            // array of { label, value, suffix } — 4 stat counters in CareerJourney
skillsData          // array of { category, color, skills[{ name, level }] }
personalityData     // { lifestyle, hobbies, values }
achievementsData    // array of { title, fullTitle, issuer, year, icon, color }
lifeTimelineData    // array of { year, title, description, icon }
dayInLifeData       // array of { time, title, description, icon, color }
lifePartnerExpectations  // { intro, expectations[{ icon, title, description }] }
horoscopeData       // { rashi, nakshatra, gotra, manglik, dob, tob, pob, summary }
```

**Note:** `counters[].label` in biodata.ts is English only. In CareerJourney, it uses `t.career.counters[idx]` for the translated label, falling back to `c.label`.

**Note:** `familyInfo.father/mother/siblings` names, relations, and occupations in biodata.ts are **not used** for display in FamilyBackground anymore — `FamilyBackground.tsx` uses `t.family.members[]` for those fields, and `t.family.paternalGrandfather/Grandmother/maternalGrandfather/Grandmother` for grandparent names. Photos still come from `familyInfo.*`.photo (proper nouns/URLs — unchanged).

**Note:** `personalityData.hobbies`, `personalityData.values`, and `personalityData.lifestyle` in biodata.ts are **not used** for display anymore — `Personality.tsx` now uses `t.personality.hobbies`, `t.personality.values`, `t.personality.lifestyle` from the locale files.

**Note:** `lifePartnerExpectations.expectations` and `.intro` in biodata.ts are **not used** for display — `LifePartner.tsx` uses `t.partner.expectations` and `t.partner.intro`.

**Note:** `lifeTimelineData` in biodata.ts is **not used** for display — `LifeTimeline.tsx` uses `t.timeline.events`.

**Note:** `dayInLifeData` in biodata.ts is **not used** for display — `DayInLife.tsx` uses `t.dayInLife.items`.

---

## Key Component Notes

### PersonalInfo.tsx
- **Completely rewritten** as a 5-part mobile-first dashboard:
  1. Hero Profile Card (glassmorphism, floating, gold glow)
  2. Quick Facts Grid (2-col mobile / 4-col desktop, tap-to-glow chips)
  3. Story Card Slider (swipeable on mobile, 2×2 grid on desktop)
  4. Interest Pills (stagger animation)
  5. Horoscope Preview (compact with scroll-to button)
- `storyAccents` array is defined at module level: `['#3B82F6', '#F59E0B', '#EC4899', '#10B981']`
- Story cards come from `t.personal.story` (array of `{ emoji, title, body }`) + accents merged in

### DayInLife.tsx
- Apple-style horizontal scroll story — sticky section with JS-driven translate
- Uses `t.dayInLife.items` for the cards (replaces `dayInLifeData` from biodata.ts)
- Section height: `${items.length * 120 + 100}vh`

### FamilyBackground.tsx
- `memberPhotos` and `memberColors` arrays at module level; `allMembers` built inside component using `t.family.members`
- Names, relations, and occupations all come from `t.family.members[i]`
- Grandparent names use `t.family.paternalGrandfather/Grandmother/maternalGrandfather/Grandmother`

### PhotoGallery.tsx
- `uniqueCategories` const at module level (English keys from `galleryImages`)
- Active filter state uses English key internally (`'All'` / `'Professional Life'` etc.) so filtering is language-agnostic
- Display labels resolved via `catLabel(key)` helper: `'All'` → `t.gallery.all`; others → `t.gallery.categories[key]`
- Category label in lightbox overlay also uses `t.gallery.categories[img.category]`

### HoroscopeCard.tsx
- 3D flip card. `frontItems` array is built inside the component using `useLanguage()`
- **Was** a module-level const — now moved inside the component to access `t`
- Back side chips and summary use `t.horoscope.rashiChip`, `t.horoscope.manglikChip`, `t.horoscope.summary`

### Contact.tsx
- `contacts` array is built inside the component (moved from module-level) to access `t`
- Uses `Link` icon (NOT `Linkedin` — doesn't exist in lucide-react)

### QRCodeSection.tsx
- `import { QRCodeSVG } from 'qrcode.react'` — named import, NOT default

### Navigation.tsx
- `sectionIds` const at module level for IntersectionObserver
- `sections` array with translated labels built inside component from `useLanguage()`

---

## CSS / Styling Notes

### Global (`src/index.css`)

```css
html, body, #root { overflow-x: hidden; }    /* prevents horizontal scroll */
html.lenis, html.lenis body { height: auto; } /* Lenis compat */

.glass { backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
.glass-gold { ... amber tint ... }
.text-gradient-gold { amber gradient text }
.text-gradient-hero { white → amber gradient }

/* Marathi theme */
html.lang-mr { font-family: 'Noto Sans Devanagari', sans-serif; }
html.lang-mr .text-gradient-gold { saffron #FF6B35 gradient }
html.lang-mr .glass-gold { saffron tint }
html.lang-mr ::-webkit-scrollbar-thumb { #FF6B35 }

/* Gallery */
.gallery-grid { columns: 2; }
@media (min-width:768px) { .gallery-grid { columns: 3; } }

/* Animations */
.animate-float, .animate-float-slow, .animate-pulse-glow, .animate-spin-slow
```

### Tailwind v4 Notes
- Config is via `@import "tailwindcss"` in `index.css` + `@tailwindcss/vite` plugin
- Custom tokens use `@theme` directive in CSS
- Background is `#0B1120` (deep navy)
- Gold accent: `amber-400` = `#FBBF24`
- Blue accent: `blue-600` = `#2563EB`
- Section padding uses `.section-padding` utility class

---

## Horizontal Scroll — Fixed

All these were added to prevent any horizontal overflow:
- `html`, `body`, `#root`: `overflow-x: hidden; max-width: 100%`
- App wrapper div: `overflow-x-hidden w-full`
- All 19 section components: `overflow-hidden` on the `<section>` tag
- Hero photo wrapper: `style={{ padding: '56px' }}` to contain the `inset-[-48px]` rotating rings

---

## Known Pre-existing Warnings (Non-blocking)

1. **Hero.tsx** — Framer Motion `ease: number[]` type mismatch (`[0.25, 0.46, 0.45, 0.94]`). The array easing works at runtime but TypeScript flags it. Fix: cast to `as any` or use a named easing string like `'easeOut'`.
2. **Hero.tsx, PersonalInfo.tsx** — Tailwind v4 deprecation warnings: `flex-shrink-0` → `shrink-0`, `bg-gradient-to-r` → `bg-linear-to-r`, `inset-[-24px]` → `-inset-6`. These are lint-level only.

---

## Bugs Fixed During Development

| Bug | Fix |
|---|---|
| `Linkedin` icon missing from lucide-react | Changed to `Link` icon in Contact.tsx |
| `qrcode.react` has no default export | Changed to named `{ QRCodeSVG }` import |
| Horizontal scroll everywhere | `overflow-x: hidden` on html/body/#root, `overflow-hidden` on all sections, padding on Hero photo |
| Hooks-in-map error in LifePartner | Extracted `PartnerCard` as a named component |
| Old code leftover after string replacement in PersonalInfo | Truncated file at correct line |
| `ChevronDown` unused import in PersonalInfo | Removed |
| `useRef`/`useEffect` unused in Hero | Removed |
| `trackRef` unused in PersonalInfo StoryCardSlider | Removed |
| JSX syntax error `>{t.contact.callNow}` in Contact | Removed stray `>` |
| `mr.ts` type errors (literal string mismatch) | Removed `as const` from `en.ts` |
| `useRef` was unused in QRCodeSection | Removed |

---

## WelcomeSplash Phases

```
Phase 0 (first visit only): Language picker — 🇬🇧 English / 🇮🇳 मराठी buttons
                             → user clicks → setLang() → phase = 1

Phase 1: Main splash text animates in (badge "Welcome to" + title "My Story" + name)
         → after 2200ms → phase = 2

Phase 2: Exit animation (opacity 0, scale 1.05)
         → after 3200ms → onDone() fires → app renders
```

Returning visitors (lang already in localStorage) skip phase 0 and start at phase 1.

---

## PDF Generation (PDFDownload.tsx)

- **Fully bilingual** — switches between English and Marathi based on active language
- **Approach:** builds a styled HTML string off-screen → renders via `html2canvas` (captures browser fonts including Noto Sans Devanagari) → encodes as PNG → inserts into jsPDF A4 page
- No server call. `document.fonts.ready` is awaited before snapshot so Devanagari glyphs render correctly
- All section titles and field labels come from `t.pdf.sections.*`
- Family member names/relations/occupations come from `t.family.members[]`
- Multi-page support: if content exceeds one A4 page, additional pages are added automatically
- Dark navy background (`#0B1120`), blue gradient header (`#1E3A8A → #2563EB`)
- Sections: Personal Information, Family Details, Education, Career, Contact
- File saved as `{shortName}_Deshmukh_Biodata.pdf`
- Button text comes from `t.pdf.btnDownload` / `t.pdf.btnDownloaded`

---

## Biodata Subject

**Arjun Rajesh Deshmukh**
- Age: 27
- Native: Nagpur, Maharashtra (Deshmukh family)
- Current: Pune, Maharashtra
- Profession: Staff DevOps Engineer at Razorpay
- Education: B.Tech from VNIT Nagpur
- Career path: Infosys (intern) → ThoughtWorks (Senior) → Razorpay (Staff)
- Certifications: CKA, CKAD
- Religion/Caste: Hindu, Brahmin
- Gotra: Kashyap
- Rashi: Vrishabha (Taurus), Nakshatra: Rohini, Non-Manglik
- Blood Group: O+

---

## What Has NOT Been Done (Future Work)

1. **Real photos** — Gallery and profile photos use Unsplash placeholder URLs
2. **Real website URL** — QR code uses `personalInfo.websiteUrl` (placeholder value in biodata.ts)
3. **Deployment** — No hosting setup yet
4. **Tailwind v4 deprecation warnings** — `flex-shrink-0`, `bg-gradient-to-r`, negative inset classes not updated
5. **Hero.tsx Framer Motion ease warning** — `ease: [0.25, 0.46, 0.45, 0.94]` type not cast
6. **Education institution/degree names** — `educationData` uses English institution names and degree titles; these are proper nouns so likely acceptable as-is
