'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

interface NavbarItemProps {
  href: string
  title: string
}

const NavbarItem = ({ href, title }: NavbarItemProps) => {
  const pathname = usePathname()
  const isActive = href === '/' ? href === pathname : pathname.startsWith(href)

  return (
    <li className="text-center">
      <Link
        className={classNames(
          'pb-1 no-underline hover:text-gray-100 border-b-2 border-gray-900  hover:border-pink-400',
          { 'border-pink-400': isActive, 'text-gray-100': isActive, 'text-gray-500': !isActive }
        )}
        href={href}>
        {title}
      </Link>
    </li>
  )
}

export default NavbarItem
