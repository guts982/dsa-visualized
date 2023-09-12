import Provider from '@/lib/Provider'
import './globals.scss'
import type { Metadata } from 'next'
import { Inter , Maven_Pro} from 'next/font/google'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })
const mavenPro = Maven_Pro({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DSA',
  description: 'DSA Visualizer/Solver',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mavenPro.className}>
        <Provider>
          <Navbar />
        {children}
        </Provider>
      </body>
    </html>
  )
}
