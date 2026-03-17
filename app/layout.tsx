import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: 'Jean-Charles DECOURTHEIX | Développeur Full Stack Senior',
  description: 'Portfolio de Jean-Charles DECOURTHEIX - Développeur Full Stack Senior spécialisé en PHP, Symfony, Vue.js et DevOps avec plus de 8 ans d\'expérience.',
  keywords: ['développeur', 'full stack', 'PHP', 'Symfony', 'Vue.js', 'DevOps', 'freelance', 'France'],
  authors: [{ name: 'Jean-Charles DECOURTHEIX' }],
  creator: 'Jean-Charles DECOURTHEIX',
  icons: {
    icon: '/jean_charles.png', 
    apple: '/jean_charles.png', 
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#dce8f0' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}