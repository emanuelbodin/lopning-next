'use client'
import { useState } from 'react'
import classNames from 'classnames'
import { useRouter, usePathname } from 'next/navigation'

import Logo from './Logo'
import NavbarItem from './NavbarItem'
import MobileMenuButton from './MobileMenuButton'

const navLinks = [
  { href: '/', title: 'Home' },
  { href: '/results/competition', title: 'Results' },
  { href: '/admin', title: 'Admin' },
]

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const navItems = navLinks.map((link) => {
    const isActive = link.href === '/' ? link.href === pathname : pathname.startsWith(link.href)
    return <NavbarItem key={link.title} href={link.href} title={link.title} isActive={isActive} />
  })

  return (
    <nav className="bg-gray-900 w-full">
      <div className="flex justify-between pt-5 px-5 border-b-2 border-indigo-700">
        <Logo onClick={() => router.push('/')} />
        <ul className="lg:flex flex-1 justify-center items-center gap-10 pb-5 hidden">
          {navItems}
        </ul>
        <div className="flex gap-5 items-center">
          {/* <AuthButton /> */}
          <div className="lg:hidden">
            <MobileMenuButton onClick={() => setIsMobileNavOpen((old) => !old)} />
          </div>
        </div>
      </div>
      <ul
        className={classNames('lg:hidden flex-col justify-center items-center gap-20', {
          hidden: !isMobileNavOpen,
        })}>
        {navItems}
      </ul>
    </nav>
  )
}

export default Navbar
