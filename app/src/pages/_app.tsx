import type { AppProps } from 'next/app'
import { initializeFirebaseApp } from '@src/lib/firebase/firebase'
import { getApp } from 'firebase/app'
import '../globals.css'

initializeFirebaseApp()

export default function App({ Component, pageProps }: AppProps) {
  console.log(getApp())
  return <Component {...pageProps} />
}
