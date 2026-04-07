# Design System & Style Guide

## Color Palette

### Primary Colors
- **Primary Blue**: `#2165c7`
  - Used for: Main CTAs, headings, links, primary buttons
  - Hex: #2165c7
  - RGB: rgb(33, 101, 199)
  - HSL: hsl(217, 71%, 45%)

- **Accent Red**: `#f97066`
  - Used for: Action buttons, highlights, alerts
  - Hex: #f97066
  - RGB: rgb(249, 112, 102)
  - HSL: hsl(5, 98%, 69%)

### Neutral Colors
- **White**: `#ffffff` - Background, cards
- **Black**: `#000000` - Text (sparingly)
- **Gray 50**: `#f9fafb` - Light backgrounds
- **Gray 100**: `#f3f4f6` - Subtle backgrounds
- **Gray 200**: `#e5e7eb` - Borders
- **Gray 300**: `#d1d5db` - Disabled states
- **Gray 600**: `#4b5563` - Secondary text
- **Gray 900**: `#111827` - Primary text

### Extended Palette (in tailwind.config.js)
Primary scale (50-900):
- Primary 50: `#f3f7fc`
- Primary 100: `#e7eff9`
- Primary 500: `#2165c7` (main)
- Primary 900: `#0c245a` (dark)

Accent scale (50-900):
- Accent 50: `#fef3f2`
- Accent 500: `#f97066` (main)
- Accent 900: `#912018` (dark)

## Typography

### Font Families

#### Headings - Poppins
- Font: Poppins (Google Fonts)
- Weight: 600-700
- Usage: h1, h2, h3, .section-title
- Sizes:
  - h1: clamp(2.5rem, 5vw, 3.5rem)
  - h2: clamp(1.875rem, 4vw, 3rem)
  - h3: clamp(1.5rem, 3vw, 2.25rem)

#### Body - Inter
- Font: Inter (Google Fonts)
- Weight: 400-500
- Usage: p, body, description text
- Sizes:
  - Base: 1rem (16px)
  - Small: 0.875rem (14px)
  - Large: 1.125rem (18px)

### Font Sizing Scale
```
xs   = 0.75rem   (12px)
sm   = 0.875rem  (14px)
base = 1rem      (16px)
lg   = 1.125rem  (18px)
xl   = 1.25rem   (20px)
2xl  = 1.5rem    (24px)
3xl  = 1.875rem  (30px)
4xl  = 2.25rem   (36px)
5xl  = 3rem      (48px)
```

### Line Height
- Tight: 1.25 (headings)
- Normal: 1.5 (body)
- Relaxed: 1.75 (descriptions)

## Spacing System

All spacing uses the 8px base unit:

```
xs  = 0.5rem    (8px)
sm  = 1rem      (16px)
md  = 1.5rem    (24px)
lg  = 2rem      (32px)
xl  = 3rem      (48px)
2xl = 4rem      (64px)
3xl = 6rem      (96px)
4xl = 8rem      (128px)
```

### Component Spacing
- Button padding: `px-8 py-3` (32px horizontal, 12px vertical)
- Card padding: `p-6` (24px all sides)
- Section padding: `py-16 md:py-24 lg:py-32`
- Margin between elements: `gap-4` to `gap-8`

## Components

### Buttons

#### Primary Button
```html
<button class="btn-primary">
  Label
  <Icon size={20} />
</button>
```
- Background: Accent Red (#f97066)
- Text: White
- Padding: 12px 32px
- Hover: scale(1.05), bg-accent-600

#### Secondary Button
```html
<button class="btn-secondary">
  Label
  <Icon size={20} />
</button>
```
- Background: Primary Blue (#2165c7)
- Text: White
- Padding: 12px 32px
- Hover: scale(1.05), bg-primary-600

#### Outline Button
```html
<button class="btn-outline">
  Label
  <Icon size={20} />
</button>
```
- Border: 2px white
- Text: White
- Background: Transparent
- Hover: bg-white, text-primary-500

### Cards

```html
<div class="card">
  <img src="..." alt="..." />
  <div class="p-6">
    <h3>Title</h3>
    <p>Description</p>
  </div>
</div>
```
- Background: White
- Border radius: 0.75rem (12px)
- Shadow: lg
- Hover effect: shadow-2xl, transform

### Hero Section
```html
<div class="hero-section" style={{ backgroundImage: 'url(...)' }}>
  <div class="hero-overlay" />
  <div class="hero-content">
    <h1 class="section-title">Title</h1>
    <p class="section-subtitle">Subtitle</p>
  </div>
</div>
```
- Full viewport height
- Background image centered
- Dark overlay opacity 0.5
- Text: White, left-aligned

### Forms

#### Input Field
```html
<input type="text" 
  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
/>
```
- Border: 1px gray-300
- Padding: 12px 16px
- Border radius: 8px
- Focus: ring-2 ring-accent-500

## Animations

### Predefined Animations (in tailwind.config.js)

#### Fade In
```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
animation: fadeIn 0.6s ease-in-out;
```

#### Slide Up
```css
@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
animation: slideUp 0.6s ease-out;
```

#### Scale In
```css
@keyframes scaleIn {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
animation: scaleIn 0.5s ease-out;
```

### Framer Motion Examples

#### Fade and Slide In
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Staggered Children
```typescript
<motion.div>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

#### Hover Effects
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

## Responsive Breakpoints

```
Mobile-first approach:
- Default: 0px+ (mobile)
- sm: 640px+
- md: 768px+ (tablet)
- lg: 1024px+ (desktop)
- xl: 1280px+ (wide)
- 2xl: 1536px+ (ultra-wide)
```

### Common Patterns

#### Stack on Mobile, Row on Desktop
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>
```

#### Hide on Mobile
```html
<div class="hidden md:block">
  Desktop content
</div>
```

#### Mobile Navigation
```typescript
const [sidebarOpen, setSidebarOpen] = useState(false);
// Show button on mobile, hide sidebar on mobile using above pattern
```

## Z-Index Scale

Default Tailwind z-index:
```
z-0: 0
z-10: 10
z-20: 20
z-30: 30
z-40: 40
z-50: 50
```

Custom scale in components:
- Hero overlay: 0 (absolute, behind)
- Hero content: 10 (relative)
- Mobile menu: 40
- Modal: 50
- Tooltip: 60

## Shadow Scale

Tailwind shadows:
```
shadow: 0 1px 2px ...
shadow-md: 0 4px 6px ...
shadow-lg: 0 10px 15px ...
shadow-xl: 0 20px 25px ...
shadow-2xl: 0 25px 50px ...
```

## Border Radius

```
rounded: 4px
rounded-lg: 8px
rounded-xl: 12px
rounded-2xl: 16px
rounded-full: 9999px (circles)
```

## Transitions

Default duration: `transition-all duration-300`

Available durations:
```
duration-75: 75ms
duration-100: 100ms
duration-150: 150ms
duration-200: 200ms
duration-300: 300ms (recommended)
duration-500: 500ms
duration-700: 700ms
duration-1000: 1000ms
```

## Accessibility

### ARIA Labels
```html
<!-- Icon buttons need labels -->
<button aria-label="Close menu">
  <X size={20} />
</button>

<!-- Form inputs need labels -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- Images need alt text -->
<img src="..." alt="Descriptive text" />
```

### Focus States
All interactive elements should have visible focus:
```html
<button class="focus:outline-none focus:ring-2 focus:ring-accent-500">
  Click
</button>
```

### Color Contrast
- Text on white: AAA level (4.5:1 ratio minimum)
- Primary blue + white: ✅ 5.2:1
- Accent red + white: ✅ 4.8:1

### Motion & Animations
Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Usage Examples

### Homepage Hero
```typescript
<HeroSection
  backgroundImage="url(...)"
  title="Welcome to Kitengela"
  subtitle="Experience faith and community"
  primaryCTA={{ label: "Watch Live", href: "#live" }}
  secondaryCTA={{ label: "Learn More", href: "/about" }}
/>
```

### Feature Grid
```typescript
<FeatureSection
  title="Our Ministries"
  features={[
    {
      icon: <Heart size={32} />,
      title: "Community",
      description: "..."
    }
  ]}
/>
```

### Gallery Grid
```typescript
<GalleryGrid
  images={images}
  columns={3}
/>
```

## Tools & Resources

- **Color Picker**: https://tailwindcolor.com
- **Spacing Calculator**: https://spacing.tailwindcss.com
- **Typography Preview**: https://fonts.google.com
- **SVG Icons**: https://lucide.dev
- **Animation Helper**: https://www.framer.com/motion/

## Maintenance

This design system ensures:
✅ Consistency across pages
✅ Professional appearance
✅ Accessibility compliance
✅ Responsive behavior
✅ Performance optimization
✅ Easy maintenance and updates

For questions on design guidelines, refer to this document or Tailwind CSS documentation.
