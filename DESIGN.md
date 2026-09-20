---
name: Modern Nihon Academy
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#5b403d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#906f6c'
  outline-variant: '#e4beb9'
  surface-tint: '#bb171c'
  primary: '#b7131a'
  on-primary: '#ffffff'
  primary-container: '#db322f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4ac'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-cjk-char:
    fontFamily: Noto Sans
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  body-cjk-char-mobile:
    fontFamily: Noto Sans
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  furigana:
    fontFamily: Noto Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.05em
  label-prominent:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system expresses a vibrant, culturally anchored, and motivating pedagogical experience for Japanese language learners. Blending contemporary digital product architecture with traditional Japanese visual motifs (vermilion shrines, aizome indigo, and sakura blossoms), the visual language feels welcoming, disciplined, yet deeply joyful.

### Tone & Personality
- **Inspiring & Focused:** The aesthetic avoids childish distractions while remaining bright, gameful, and approachable. Every milestone feels prestigious and earned.
- **Democratic & Open:** The design communicates an absolute commitment to accessible education—no paywall ribbons, locked badges, or predatory upgrade banners exist within this visual framework.
- **Culturally Tactile:** Micro-interactions and layout structures borrow clarity from modern Tokyo subway cartography, minimalist stationery, and ink stamps (*hanko*).

### Style Philosophy
A synthesis of **Modern Crisp Minimalist** and **Subtle Tactile Gamification**. Surfaces leverage clean paper whites, calm slate tiers, and deliberate crimson accents that draw the eye toward essential actions (flashcard flips, voice recording, kana stroke completions).

## Colors

The palette balances traditional Japanese ceremonial pigments with ergonomic, contrast-accessible UI tones compliant with WCAG AAA for legibility.

### Core Roles
- **Primary (`#E53935` - Vermilion / Torii Red):** Represents energy, passion, and cultural resonance. Reserved for primary interactive triggers (Start Lesson, Check Answer), active streak flames, and key progress indicators.
- **Secondary (`#1E293B` - Deep Aizome Indigo):** Anchors typographic hierarchy, navigation bars, and structurally dense lesson headers. Communicates institutional authority, focus, and stability.
- **Tertiary (`#10B981` - Jade Emerald / Ryokucha):** Signifies correct mastery, streak protection, review triumphs, and active audio states.
- **Neutral (`#64748B` - Slate Ink):** Used for metadata, furigana subtitles, unselected tab items, and secondary copy.

### Functional Surfaces & Washes
- **Canvas Base:** `#FFFFFF` on core screens; `#F8FAFC` on module hubs.
- **Sakura Washes:** `#FFF1F2` and `#FEE2E2` are deployed exclusively for card backgrounds in memorization flows, error states, and high-energy reward callouts.
- **Card Substrates:** `#FFFFFF` floating over `#F8FAFC` neutral canvas, bordered with faint hairpins (`#E2E8F0`).

## Typography

Typographic selection addresses dual-script harmony between Latin alphanumeric elements and complex East Asian glyphs (Kanji, Hiragana, Katakana).

- **Primary Latin Family:** Plus Jakarta Sans provides clean geometry, generous counter-forms, and a contemporary, optimistic tone.
- **CJK Family (System Level):** Noto Sans JP paired natively to maintain uniform stroke weights alongside Latin text across all viewport scales.
- **Ruby Text / Furigana:** Positioned directly over parent Kanji with locked vertical alignments to prevent line-height jumping in bilingual reading passages.
- **Kanji Display:** Individual character inspection cards use elevated font sizing with dedicated tracking to make stroke order diagrams immediately decipherable.

## Layout & Spacing

The interface uses an 8-point base spatial cadence tailored to touch-first mobile experiences, expanding into fluid dual-column modules for tablet viewports.

### Spatial Hierarchy
- **Mobile Handheld (360px - 599px):** Employs single-column layouts with `1rem` outer canvas padding. Drills, interactive Kana grids, and multi-choice quizzes use full-width cards pinned above the native thumb zone.
- **Large Handheld & Tablet (600px+):** Adapts to an asymmetric split screen: lesson content and CJK stroke animations occupy the left pane, while interactive inputs and grammar notes dock on the right.
- **Vertical Flow:** Tight groupings (e.g., character + furigana + romaji) maintain `space-xs` (4px) to `space-sm` (8px). Context transitions between modules utilize `space-xl` (36px).

## Elevation & Depth

This system avoids heavy drop shadows and murky skeuomorphism in favor of clear, daylight-inspired depth that mimics smooth, matte Japanese stationery cardstock.

### Depth Tiers
- **Tier 0 (Flat Canvas):** Used for base backdrops (`#FFFFFF` or `#F8FAFC`). No shadow; separation occurs purely via alternating tint blocks.
- **Tier 1 (Surface Cards & Chips):** Soft daylight elevation: `0 1px 3px 0 rgba(30, 41, 59, 0.05), 0 1px 2px -1px rgba(30, 41, 59, 0.05)`. Encased within a crisp 1px neutral hairline stroke (`#F1F5F9`).
- **Tier 2 (Interactive Floating Elements & Answers):** `0 4px 6px -1px rgba(30, 41, 59, 0.07), 0 2px 4px -2px rgba(30, 41, 59, 0.04)`. When in unselected state, interactive tiles incorporate a bottom tactile bevel (solid 2px `#E2E8F0` border offset) which depresses upon press.
- **Tier 3 (Modals, Kanji Sheets & Lesson Trays):** `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)` coupled with a 20% `#0F172A` diffused scrim backdrop.

## Shapes

The interface embraces organic, friendly curvature (`level 2` - 8px base, escalating to 16px and 24px for macro containers).

- **Standard Interactive Elements (Buttons, Inputs):** 8px border radius ensures clear touch target recognition without looking overly playful.
- **Lesson Tiles & Progress Cards:** 16px (`rounded-lg`) curvature provides a gentle, modern card silhouette.
- **Pill Badges (JLPT Levels, Streak Flame Counters, Free Tags):** Fully rounded pill geometry (`9999px`) creates rapid visual differentiation from rectangular content cards.

## Components

### Buttons & Actions
- **Primary CTA ("Check", "Continue"):** Solid vermilion (`#E53935`) background with crisp white typography, 48px minimum touch height, subtle 2px bottom bevel (`#C62828`). On tap, the element shifts 2px downward to convey physical tactility.
- **Secondary Action ("Skip", "Hint"):** Indigo outline (`#1E293B`) or transparent background with deep indigo text.
- **Success/Audio Button:** Tinted emerald (`#ECFDF5`) container with `#10B981` icon and text.

### Japanese Character Cards (Kana / Kanji)
- High-contrast white tiles featuring stroke order traces. Centered character rendered in `body-cjk-char`, with top-mounted `furigana` in neutral slate.
- Correct selection shifts the perimeter instantly to `#10B981` with an inner wash of `#ECFDF5`. Error choices snap to `#E53935` with subtle horizontal haptic vibration.

### Gamified Streak Flame & Free Badges
- **Streak Pill:** Sakura-tinted badge (`#FFF1F2`) containing an illuminated vermilion flame icon, bold quantitative day count, and a glowing micro-border.
- **"100% Free" Seal:** Subtle, premium stamp-inspired badge rendered in deep indigo outline with an emerald dot accent, reinforcing the open-access educational philosophy.

### Lists & Navigation
- **Curriculum Tree:** Continuous vertical path using dot-nodes connected by 2px slate tracks (`#E2E8F0`). Completed modules turn vermilion; current modules feature an emerald pulse animation; unlocked future modules remain soft neutral.
- **Bottom Navigation:** Solid white floating bar with Tier 2 elevation, accommodating home, syllabary chart, audio drills, and profile metrics.