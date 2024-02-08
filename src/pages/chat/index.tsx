import { FormEvent, useState, useEffect, useRef } from 'react'

import { getDatabase, onChildAdded, push, ref } from '@firebase/database'
import { FirebaseError } from '@firebase/util'

import { AuthGuard } from '@src/component/AuthGuard/AuthGuard'

type MessageProps = {
  message: string
}

const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex ml-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6 min-w-12"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>

      <p className="bg-gray-200 px-2 py-1 mb-2 rounded-md">{message}</p>
    </div>
  )
}

export const Page = () => {
  const messagesElementRef = useRef<HTMLDivElement | null>(null)

  const [message, setMessage] = useState<string>('')
  const [chats, setChats] = useState<{ message: string }[]>([])

  /** 送信ボタン押下時の処理 */
  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const db = getDatabase()
      console.log(db)
      const dbRef = ref(db, 'chat')
      console.log(dbRef)

      // firebaseDBに書き込み
      await push(dbRef, {
        message,
      })
      setMessage('')
    } catch (e) {
      console.log(e)
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  /* DBのデータを取得 */
  useEffect(() => {
    try {
      const db = getDatabase()
      const dbRef = ref(db, 'chat')

      //　DBのデータを取得
      return onChildAdded(dbRef, (snapshot) => {
        const message = String(snapshot.val()['message'] ?? '')

        // 取得したデータをセット
        setChats((prev) => [...prev, { message }])
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e)
      }
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* スクロール処理 */
  useEffect(() => {
    messagesElementRef.current?.scrollTo({
      top: messagesElementRef.current.scrollHeight,
    })
  }, [chats])

  return (
    <>
      <AuthGuard>
        <div className="w-full max-w-xl mx-auto mt-8">
          <h1>チャット</h1>
          <div
            className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-80 overflow-y-auto"
            ref={messagesElementRef}
          >
            {chats.map((chat, index) => (
              <Message message={chat.message} key={`ChatMessage_${index}`} />
            ))}
          </div>

          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSendMessage}
          >
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="chat"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="チャット"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </AuthGuard>
    </>
  )
}

export default Page
