import Logo from './Logo'
import NavbarItem from './NavbarItem'
import AuthButton from '@/app/auth/AuthButton'
import MobileNavbar from './MobileNavbar'
import MobileMenuButton from './MobileMenuButton'

export default function Navbar() {
  const navLinks = [
    { href: '/', title: 'Home' },
    { href: '/results/competitor', title: 'Competitors' },
    { href: '/results/competition', title: 'Competition' },
    { href: '/create', title: 'Create' },
  ]
  const navItems = navLinks.map((link) => (
    <NavbarItem key={link.title} href={link.href} title={link.title} />
  ))

  return (
    <nav className="bg-gray-900">
      <div className="flex justify-between pt-5 pb-1 px-5 border-b-2 border-indigo-700">
        <Logo />
        <ul className="lg:flex flex-1 justify-center items-center gap-10 pb-5 hidden">
          {navItems}
        </ul>
        <div className="hidden lg:block">
          <AuthButton />
        </div>
        <div className="lg:hidden">
          <MobileMenuButton />
        </div>
      </div>
      <MobileNavbar>{navItems}</MobileNavbar>
    </nav>
  )
}
