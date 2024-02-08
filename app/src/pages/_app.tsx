import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '@src/lib/firebase/firebase'
import '../globals.css'

import { AuthProvider } from '@src/feature/auth/provider/AuthProvider'
import { Header } from '@src/component/Header/Header'
import { Footer } from '@src/component/Footer/Footer'

initializeFirebaseApp()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  )
}
