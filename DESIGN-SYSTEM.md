# 🎨 Design System Documentation

## Overview

This document details every design decision, component, and pattern used in Student Life Hub V2.

---

## 🎯 Design Principles

### 1. Mobile-First
Every component is designed for mobile screens first, then enhanced for larger screens.

**Breakpoints:**
- Mobile: 0-639px (default)
- Tablet: 640px-1023px
- Desktop: 1024px+

### 2. Accessibility First
WCAG AAA compliance is non-negotiable. Every user, regardless of ability, must be able to use this app.

### 3. Performance First
- No external dependencies
- System fonts (fast loading)
- Minimal JavaScript
- Offline-first with localStorage

### 4. Icon-First Communication
Reduce cognitive load with visual icons before text.

### 5. Progressive Disclosure
Show simple options first, reveal complexity only when needed.

---

## 🎨 Color System

### Tab Colors (Section Identity)

Each major section has a unique color based on color psychology:
```css
/* Study - Blue: Focus, intelligence, calm */
--color-study: #3B82F6;
--color-study-dark: #2563EB;
--color-study-light: #DBEAFE;

/* Meals - Orange: Appetite, warmth, energy */
--color-meals: #F97316;
--color-meals-dark: #EA580C;
--color-meals-light: #FFEDD5;

/* Cleaning - Green: Freshness, cleanliness, nature */
--color-cleaning: #10B981;
--color-cleaning-dark: #059669;
--color-cleaning-light: #D1FAE5;

/* Budget - Purple: Wealth, value, sophistication */
--color-budget: #8B5CF6;
--color-budget-dark: #7C3AED;
--color-budget-light: #EDE9FE;

/* DIY - Yellow: Caution, tools, practical */
--color-diy: #F59E0B;
--color-diy-dark: #D97706;
--color-diy-light: #FEF3C7;

/* Support - Teal: Wellbeing, healthcare, safety */
--color-support: #14B8A6;
--color-support-dark: #0F766E;
--color-support-light: #CCFBF1;

/* Legal - Dark Blue: Trust, authority, professional */
--color-legal: #1E40AF;
--color-legal-dark: #1E3A8A;
--color-legal-light: #DBEAFE;

/* Uni Essentials - Pink: Youthful, friendly, exciting */
--color-uni: #EC4899;
--color-uni-dark: #DB2777;
--color-uni-light: #FCE7F3;
```

### Neutral Palette
```css
/* Backgrounds */
--color-background: #ffffff;
--color-surface: #f9fafb;
--color-surface-dark: #f3f4f6;

/* Borders */
--color-border: #e5e7eb;
--color-border-dark: #d1d5db;

/* Text */
--color-text-primary: #111827;    /* Main text */
--color-text-secondary: #6b7280;  /* Secondary text */
--color-text-tertiary: #9ca3af;   /* Subtle text */
--color-text-inverse: #ffffff;    /* White text on dark */
```

### Status Colors
```css
--color-success: #10b981;  /* Green */
--color-warning: #f59e0b;  /* Orange */
--color-error: #ef4444;    /* Red */
--color-info: #3b82f6;     /* Blue */
```

### Gamification Colors
```css
--color-points: #fbbf24;   /* Gold */
--color-streak: #f97316;   /* Fire orange */
--color-level: #8b5cf6;    /* Purple */
--color-achievement: #10b981; /* Green */
--color-locked: #9ca3af;   /* Gray */
```

---

## 📏 Spacing System

Based on 4px base unit (0.25rem):
```css
--space-xs: 0.25rem;   /* 4px  - Tiny gaps */
--space-sm: 0.5rem;    /* 8px  - Small padding */
--space-md: 1rem;      /* 16px - Default spacing */
--space-lg: 1.5rem;    /* 24px - Section spacing */
--space-xl: 2rem;      /* 32px - Large gaps */
--space-2xl: 3rem;     /* 48px - Major sections */
--space-3xl: 4rem;     /* 64px - Page sections */
```

**Usage:**
- Between elements: `space-md` (16px)
- Section padding: `space-lg` (24px)
- Page padding: `space-xl` (32px)

---

## 🔤 Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
```

**Why?** Uses each device's native font for:
- Faster loading (no downloads)
- Familiar to users
- Optimized for each OS

### Font Sizes (Mobile-First)
```css
--text-xs: 0.75rem;    /* 12px - Tiny labels */
--text-sm: 0.875rem;   /* 14px - Small text */
--text-md: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Emphasized */
--text-xl: 1.25rem;    /* 20px - Subheadings */
--text-2xl: 1.5rem;    /* 24px - Headings */
--text-3xl: 2rem;      /* 32px - Page titles */
--text-4xl: 2.5rem;    /* 40px - Hero text */
```

### Font Weights
```css
--font-normal: 400;    /* Regular text */
--font-medium: 500;    /* Slightly bold */
--font-semibold: 600;  /* Labels, buttons */
--font-bold: 700;      /* Headings, emphasis */
```

---

## 🃏 Card System

### Card Types

All cards follow the same structure but styled differently:

1. **Meal Cards** - Orange header, recipe details
2. **Task Cards** - Green/Yellow header, instructions
3. **Study Cards** - Blue header, learning content
4. **Legal Cards** - Dark blue header, information
5. **Support Cards** - Teal header, contact info

### Card Anatomy
```
┌─────────────────────────────┐
│ TYPE • CATEGORY             │ ← Colored header
├─────────────────────────────┤
│ 🎯 Card Title               │ ← Icon + Title
│                             │
│ ⏱️ 15m  🔥 450cal  ££      │ ← Meta info
│                             │
│ Tags: [Vegan] [Easy]       │ ← Tags
│                             │
│ [View Details] [Add Plan]  │ ← Actions
└─────────────────────────────┘
```

### Card States

1. **Default** - Soft shadow, white background
2. **Hover** - Lift up 2px, stronger shadow
3. **Flipped** - Rotate 180° (shows back content)
4. **Premium Locked** - Dark overlay, unlock button

### Card Flip Animation

**Trigger:** Click anywhere on card  
**Duration:** 500ms  
**Effect:** 3D Y-axis rotation  
**Accessibility:** Disabled if user prefers reduced motion

---

## 🔘 Button System

### Button Variants
```css
.btn           /* Primary - Brand color */
.btn-secondary /* Outlined - Transparent with border */
.btn-tertiary  /* Ghost - No border, subtle */
.btn-success   /* Green - Positive actions */
.btn-warning   /* Orange - Caution */
.btn-error     /* Red - Destructive actions */
```

### Button Sizes
```css
.btn-sm   /* 36px height - Compact */
.btn      /* 44px height - Default (accessible) */
.btn-lg   /* 52px height - Prominent */
```

### Button States

1. **Default** - Solid color, shadow
2. **Hover** - Darker color, lift up
3. **Active** - Pressed down
4. **Disabled** - 50% opacity, no interaction
5. **Loading** - Spinning icon, pointer-events disabled

---

## 📝 Form System

### Input Types

All inputs share base styling:
- 44px minimum height (touch-friendly)
- 2px border
- Focus: Primary color border + glow
- Error: Red border + error message
- Success: Green border + success message

### Validation States
```css
.input-error    /* Red border, error icon */
.input-success  /* Green border, check icon */
.input-warning  /* Orange border, warning icon */
```

### Custom Checkboxes & Radios

Native inputs are hidden, custom styling applied:
- Larger touch targets (44px)
- Animated check/fill
- Keyboard accessible
- Screen reader compatible

---

## 🎮 Gamification UI

### Points Display
```
┌──────────────┐
│ ⭐ 1,250 pts │ ← Gold gradient background
└──────────────┘
```

**Animation:** Scale up when points earned

### Streak Display
```
┌──────────────┐
│ 🔥 15 days   │ ← Fire orange gradient
└──────────────┘
```

**Animation:** Flicker effect on fire emoji

### Level Progress
```
Level 5 - Master Student
[████████░░] 80% to Level 6
```

**Colors:** Purple gradient, gold progress bar

### Badges
```
┌─────┐
│ 🏆  │ ← Large icon
│     │
│Badge│ ← Name
│Name │
└─────┘
```

**States:**
- Unlocked: Full color, animated entrance
- Locked: Grayscale, 40% opacity, lock icon

---

## 📱 Responsive Behavior

### Mobile (0-639px)

- Single column layouts
- Full-width buttons
- Bottom navigation bar (sticky)
- Hamburger menu
- Touch-optimized (44px targets)
- Larger text

### Tablet (640px-1023px)

- 2-column grids
- Side-by-side buttons
- Top navigation bar
- More information density

### Desktop (1024px+)

- 3-4 column grids
- Sidebar navigation
- Hover effects
- Keyboard shortcuts
- Maximum width: 1200px

---

## ♿ Accessibility Patterns

### Focus Indicators

All interactive elements have:
- 3px solid outline
- 2px offset
- Primary color
- Box shadow glow

### Skip Links

Hidden by default, appear on Tab:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### ARIA Labels

All dynamic content has:
- `aria-label` for context
- `aria-live` for updates
- `aria-expanded` for toggles
- `role` attributes

### Color Contrast

All text meets WCAG AAA:
- Normal text: 7:1 contrast ratio
- Large text: 4.5:1 contrast ratio
- Interactive elements: Tested in high contrast mode

---

## 🎬 Animation Patterns

### Page Transitions
```css
.fade-in-up     /* Fade in from bottom */
.fade-in-down   /* Fade in from top */
.slide-in-right /* Slide from right */
.slide-in-left  /* Slide from left */
```

**Duration:** 300ms  
**Easing:** ease-out

### Interaction Feedback
```css
.hover-lift  /* Lift up 4px on hover */
.hover-glow  /* Add glow effect */
.hover-scale /* Scale up 1.05x */
```

### Loading States
```css
.spinner        /* Rotating circle */
.pulse          /* Opacity pulse */
.skeleton       /* Shimmer placeholder */
.loading-dots   /* Bouncing dots */
```

### Celebrations
```css
.confetti       /* Confetti particles falling */
.badge-unlocked /* Badge spin + pop in */
.level-up       /* Scale + glow pulse */
.points-earned  /* Pop animation */
```

---

## 📐 Grid System

### Basic Grid
```css
.grid           /* 1 column (mobile) */
.grid-2         /* 2 columns (tablet+) */
.grid-3         /* 3 columns (desktop+) */
.grid-4         /* 4 columns (desktop+) */
```

### Auto-Responsive Grid
```css
.grid-auto      /* Automatically wraps at 280px */
```

**Usage:** Card grids that adapt without media queries

---

## 🔧 Utility Classes

### Display
```css
.hide-mobile    /* Hide on mobile, show on tablet+ */
.show-mobile    /* Show only on mobile */
.hide-desktop   /* Hide on desktop */
```

### Text
```css
.text-center    /* Center align */
.text-left      /* Left align */
.text-right     /* Right align */
.text-bold      /* Bold weight */
.truncate       /* Cut off with ... */
```

### Spacing
```css
.mt-lg          /* Margin top large */
.mb-md          /* Margin bottom medium */
.p-xl           /* Padding all sides XL */
```

---

## 📚 Component Library

Every component is documented with:
1. **Purpose** - What it does
2. **Variants** - Different styles
3. **States** - Different conditions
4. **Usage** - Code examples
5. **Accessibility** - ARIA requirements

See individual CSS files for detailed comments.

---

## 🎯 Best Practices

### When Adding New Components

1. **Start with mobile** - Design for small screens first
2. **Use variables** - Never hardcode colors or spacing
3. **Consider accessibility** - Keyboard, screen reader, contrast
4. **Test states** - Default, hover, focus, active, disabled
5. **Document** - Add comments explaining complex CSS

### When Adding Colors

1. **Check contrast** - Use WebAIM contrast checker
2. **Add to variables** - Define in `variables.css`
3. **Create variants** - Normal, dark, light versions
4. **Test dark mode** - Ensure readability

### When Adding Animations

1. **Respect motion preferences** - Check `prefers-reduced-motion`
2. **Keep it subtle** - Don't distract from content
3. **Use easing** - ease-out for entries, ease-in for exits
4. **Reasonable duration** - 150-500ms for most animations

---

**Last Updated:** November 2025  
**Design System Version:** 2.0  
**Maintained By:** Graeme Wright (Founder & Lead Developer)  
**Copyright:** © 2025-2026 Graeme Wright - All Rights Reserved