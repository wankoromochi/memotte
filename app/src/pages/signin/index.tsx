import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { Navigate } from '@src/component/Navigate/Navigate'

export const Page = () => {
  const { push } = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isAlert, setIsAlert] = useState<boolean>(false)

  /** ログインボタン押下処理 */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)

      // 成功した場合リセット
      setEmail('')
      setPassword('')

      push('/')
    } catch (e) {
      setMessage('エラーが発生しました')
      setIsAlert(true)
    }
  }

  return (
    <>
      {isAlert && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => {
              setIsAlert(false)
            }}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      )}

      <div className="w-full max-w-xs mx-auto mt-8">
        <h1 className="text-2xl mb-2">ログイン</h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              メールアドレス
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="******************"
            />
          </div>
          <div className="flex flex-center items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              ログイン
            </button>
          </div>

          <div className="mt-4">
            <p className="text-sm">
              新規アカウント作成は
              <Navigate href={(path) => path.signup.$url()}>
                <p className="inline text-blue-400">こちら</p>
              </Navigate>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Page
