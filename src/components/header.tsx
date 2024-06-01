import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className='p-4 w-screen'>
      <div className='container mx-auto flex items-center justify-center'>
        <nav className='flex'>
          <Link href="/" className='mx-8 text-white'> {/* Apply text-white class here */}
            Home
          </Link>
          <Link href="/profile" className='mx-8 text-white'> {/* Apply text-white class here */}
            Profile
          </Link>
          <Link href="/posts" className='mx-8 text-white'> {/* Apply text-white class here */}
            Posts
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
