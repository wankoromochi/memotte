import type { NextPage } from 'next'
import { AuthGuard } from '@src/component/AuthGuard/AuthGuard'

const Page: NextPage = () => {
  return (
    <AuthGuard>
      <div>Home</div>
    </AuthGuard>
  )
}

export default Page
