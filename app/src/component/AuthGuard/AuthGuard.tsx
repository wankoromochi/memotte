import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import type { ReactNode } from 'react'
import { useRouter } from '@src/hooks/useRouter/useRouter'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext()
  const { push } = useRouter()

  if (typeof user === 'undefined') {
    return <div>読み込み中...</div>
  }

  if (user === null) {
    push((path) => path.signin.$url())
    return null
  }

  return <>{children}</>
}
