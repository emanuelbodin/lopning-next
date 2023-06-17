'use client'
import { useUiContext } from '@/app/_providers/UiProvider'

export default function MobileMenuButton() {
  const { toggleNavbar } = useUiContext()
  return (
    <button
      onClick={toggleNavbar}
      className="flex items-center px-4 py-3 border rounded text-gray-100 border-gray-600 hover:text-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </button>
  )
}
