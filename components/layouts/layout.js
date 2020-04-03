import Head from 'next/head'
import TopNav from '../menu/topNav'

function Layout({ user, loading = false, children }) {
  return (
    <div>
      <Head>
        <title>Next.js with Auth0</title>
      </Head>

      <TopNav user={user} loading={loading} />

      <main>
        <div className="container">{children}</div>
      </main>
    </div>
  )
}

export default Layout