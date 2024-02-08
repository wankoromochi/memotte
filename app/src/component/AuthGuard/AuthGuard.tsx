import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  console.log(children)
  const { user } = useAuthContext()
  const { push } = useRouter()

  if (typeof user === 'undefined') {
    return <div>読み込み中...</div>
  }

  if (user === null) {
    push('/signin')
    return null
  }

  return <>{children}</>
}
