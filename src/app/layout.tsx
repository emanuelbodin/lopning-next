import { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import Navbar from './navigation/Navbar'
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'Run',
  description: 'Run',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="bg-stone-900 text-white w-screen min-h-screen flex flex-col">
          <Navbar />
          <main className="w-full mb-10">{children}</main>
        </div>
      </body>
    </html>
  )
}
