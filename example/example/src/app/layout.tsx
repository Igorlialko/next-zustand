import './_styles/globals.scss'
import { Inter } from 'next/font/google'
import StoreProvider from '@/store/StoreProvider'
import SliceStoreProvider from '@/store/SliceStoreProvider'

const inter = Inter({ subsets: ['latin'], variable: '--fontFamily' })

export const metadata = {
  title: 'Next-Zustand',
  description: 'Example app'
}

export default async function RootLayout({
                                           children
                                         }: {
  children: React.ReactNode
}) {
  const getInitialCount = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(5)
    }, 1000)
  })
  const getInitialPost = () => fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(response => {
      if (response.id) {
        return {
          id: response.id,
          name: `UserId-${response.userId}`,
          description: {
            title: response.title,
            subtitle: response.body
          }
        }
      }
    })

  return (
    <html lang='en'>
    <body style={{ fontFamily: 'var(--fontFamily)' }} className={inter.variable}>
    <StoreProvider initialState={{
      count: await getInitialCount(),
      post: await getInitialPost()
    }}>
      <SliceStoreProvider initialCountSlice={{
        count: 100000
      }}>
        {children}
      </SliceStoreProvider>
    </StoreProvider>
    </body>
    </html>
  )
}
