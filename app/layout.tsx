import type { Metadata, Viewport } from 'next'
import { DM_Sans, Fira_Code } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-fira',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F59E0B',
}

export const metadata: Metadata = {
  title: 'Aadithya A R — ML Engineer & GenAI Builder',
  description:
    'Portfolio of Aadithya A R — B.Tech CSE (AI & ML) student at Global Academy of Technology, Bengaluru. Building production-grade RAG systems, autonomous AI agents, and medical AI. Targeting FAANG/MAANG ML Engineer roles.',
  keywords: [
    'Aadithya A R',
    'ML Engineer',
    'GenAI',
    'RAG Systems',
    'LangChain',
    'PyTorch',
    'AI Portfolio',
    'Machine Learning',
    'Full Stack Developer',
    'Bengaluru',
    'FAANG',
  ],
  authors: [{ name: 'Aadithya A R', url: 'https://github.com/Aadithyaar22' }],
  creator: 'Aadithya A R',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aadithyaar.dev',
    title: 'Aadithya A R — ML Engineer & GenAI Builder',
    description: 'Production-grade AI systems engineer. RAG pipelines, agentic systems, medical AI. Targeting FAANG ML roles.',
    siteName: 'Aadithya A R Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Aadithya A R Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadithya A R — ML Engineer & GenAI Builder',
    description: 'Production-grade AI systems engineer. RAG pipelines, agentic systems, medical AI.',
    creator: '@AadithyaAR1',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Aadithya A R',
              url: 'https://aadithyaar.dev',
              sameAs: [
                'https://github.com/Aadithyaar22',
                'https://www.linkedin.com/in/aadithya-a-r/',
              ],
              jobTitle: 'ML Engineer',
              alumniOf: { '@type': 'CollegeOrUniversity', name: 'Global Academy of Technology' },
            }),
          }}
        />
      </head>
      <body className="bg-void text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
