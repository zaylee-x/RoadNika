// src/app/layout.js
import './globals.css'

export const metadata = {
  title: 'RoadNika',
  description: 'Ukur skill & petakan jalur karier perempuan di teknologi.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
