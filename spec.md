# EduPortal Pro

## Current State
The app uses a blue color scheme throughout:
- Sidebar: dark navy blue gradient (#0F2743 → #183B63)
- Header: white with blue accents
- Primary color: blue-600 (#2563EB)
- Landing page: blue gradient hero section
- Login page: dark blue gradient background
- All buttons, icons, progress bars, stat cards: blue variants
- No images currently used

## Requested Changes (Diff)

### Add
- Hero banner image on Landing page (`/assets/generated/hero-banner.dim_1200x500.jpg`)
- Student dashboard illustration (`/assets/generated/student-dashboard-illustration.dim_400x400.png`) as a welcome visual in StudentDashboard
- Library banner image (`/assets/generated/library-banner.dim_800x300.jpg`) at top of Library page
- Purple color theme throughout (vibrant medium purple: #7C3AED as primary)

### Modify
- `index.css`: Change OKLCH color tokens from blue hue (258) to purple hue (~300-310). Sidebar background from dark navy to deep purple. Primary from blue to purple.
- `Landing.tsx`: Replace blue gradient hero with purple gradient, add hero banner image, swap all blue color classes to purple
- `Login.tsx`: Swap dark blue gradient background for dark purple gradient, change active tabs and buttons from blue to purple
- `Sidebar.tsx`: Change gradient from dark navy to deep purple (#1E0A3C → #3B0764 or similar), active nav item from blue to purple
- `Header.tsx`: Avatar bg from blue-600 to purple-600, notification badge stays red
- `StudentDashboard.tsx`: Add student illustration image in welcome section, change blue accents to purple
- `Layout.tsx`: Change bg-slate-100 to a subtle purple-tinted background

### Remove
- All blue-600/blue-700/blue-500 hardcoded Tailwind classes (replace with purple equivalents)

## Implementation Plan
1. Update `index.css` OKLCH tokens: shift primary hue from 258 (blue) to 307 (purple), sidebar from navy to deep purple
2. Update `Landing.tsx`: purple gradient hero, add hero banner image, all button/accent colors to purple
3. Update `Login.tsx`: dark purple gradient bg, purple tabs/buttons
4. Update `Sidebar.tsx`: deep purple gradient bg, purple active state
5. Update `Header.tsx`: purple avatar, purple ring on hover
6. Update `StudentDashboard.tsx`: add illustration image in welcome card, purple accents
7. Update `Layout.tsx`: subtle purple-tinted bg
8. Keep all functional logic, routing, data display, and existing features exactly as-is -- design only
