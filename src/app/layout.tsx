import { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/providers/providers'
import { Roboto } from 'next/font/google'
import Navbar from '../components/navigation/Navbar'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'Run',
  description: 'Run',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
  create,
}: {
  children: React.ReactNode
  create: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <div className="bg-stone-900 text-white w-screen min-h-screen flex flex-col">
            <Navbar />
            <main className="w-full mb-10">
              {children}
              {create}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
