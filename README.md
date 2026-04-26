# 🚀 Aadithya A R — Portfolio

> **Quantum Plasma** aesthetic — amber/gold + coral + plasma violet on deep obsidian.  
> Completely unique from generic AI portfolios. Built to impress FAANG recruiters.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)](https://framer.com/motion)

---

## ✨ What Makes This Different

| Feature | This Portfolio | Generic Templates |
|---------|---------------|-------------------|
| **Color Palette** | Amber + Coral + Plasma Violet | Boring cyan/purple |
| **Hero** | Mesh gradient + floating code + particle network | Static gradient |
| **Cursor** | Spring-physics custom cursor with burst | Default or basic dot |
| **Load Screen** | Letter assembly + neural net SVG draw + progress | Spinner |
| **Skills** | Category tabs + animated fill bars + chip cloud | Circles or plain bars |
| **Projects** | Filter + animated border trace + impact badges | Card grid |
| **Timeline** | Scroll-drawn glowing spine + alternating cards | Static list |
| **Typography** | Clash Display + Fira Code + DM Sans | Inter |
| **Animations** | 50+ Framer Motion effects | CSS transitions |

---

## 📁 Folder Structure

```
aadithya-portfolio/
├── app/
│   ├── layout.tsx          # Root layout + SEO + fonts
│   ├── page.tsx            # Main page + loader
│   └── globals.css         # CSS variables, utilities, animations
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky blur navbar + mobile menu
│   │   ├── Footer.tsx      # Footer + back-to-top
│   │   └── CustomCursor.tsx # Spring-physics cursor with burst
│   ├── sections/
│   │   ├── Hero.tsx        # Mesh canvas + code ticker + stats
│   │   ├── About.tsx       # Code identity card + bio + traits
│   │   ├── Skills.tsx      # Category tabs + animated fill bars
│   │   ├── Projects.tsx    # Filter + animated border cards
│   │   ├── Timeline.tsx    # Scroll-drawn spine + alternating cards
│   │   ├── Achievements.tsx # Cards + certifications marquee
│   │   └── Contact.tsx     # EmailJS form + social links
│   └── shared/
│       ├── SectionHeader.tsx
│       └── AnimatedCounter.tsx
├── lib/
│   ├── data.ts             # All portfolio content
│   └── utils.ts            # cn() utility
├── public/
│   └── resume.pdf          # ← Add your resume here
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 🛠 Installation

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### 1. Install dependencies

```bash
cd aadithya-portfolio
npm install
# or
yarn install
# or
pnpm install
```

### 2. Add your resume

Place your resume PDF at:
```
public/resume.pdf
```

### 3. Set up EmailJS (for contact form)

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Create a service (Gmail recommended)
3. Create an email template with variables: `from_name`, `from_email`, `subject`, `message`, `to_name`
4. Create a `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for production

```bash
npm run build
npm run start
```

---

## 🚀 Deploy to Vercel (Recommended)

### Option A — One-click deploy

1. Push to GitHub:
```bash
git init
git add .
git commit -m "feat: portfolio launch 🚀"
git remote add origin https://github.com/Aadithyaar22/portfolio.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub

3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

4. Deploy! ✅

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts, add env vars when asked
```

### Custom domain (optional)

In Vercel dashboard → Domains → Add `aadithyaar.dev` or similar.

---

## 🎨 Customization

### Update content
Edit `lib/data.ts` — all portfolio content is centralized here:
- `personalInfo` — name, bio, social links
- `skills` — all skill categories and levels
- `projects` — project cards
- `timeline` — career milestones
- `achievements` — achievement cards
- `certifications` — marquee items

### Update colors
Edit `app/globals.css` CSS variables:
```css
:root {
  --amber: #F59E0B;     /* Primary accent — change this */
  --coral: #FF6B6B;     /* Secondary accent */
  --plasma: #7C3AED;    /* Tertiary accent */
}
```

### EmailJS template variables
Make sure your EmailJS template uses:
```
{{from_name}} — sender name
{{from_email}} — sender email
{{subject}} — message subject
{{message}} — message body
{{to_name}} — your name (Aadithya)
```

---

## 📊 Performance

- Lazy-loaded sections with `next/dynamic`
- Font optimization with `next/font`
- Images via `next/image`
- CSS animations (GPU-accelerated) preferred over JS where possible
- Framer Motion deferred with `useInView`

---

## 🔧 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| Icons | Lucide React + React Icons |
| Fonts | DM Sans + Fira Code (Google) |
| Contact | EmailJS |
| Type animation | react-type-animation |
| Intersection | react-intersection-observer |
| Hosting | Vercel |

---

## 📝 License

MIT — free to use, modify, and deploy for personal portfolios.

---

Built with 🔥 for Aadithya A R — ML Engineer & GenAI Builder
