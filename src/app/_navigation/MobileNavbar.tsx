'use client'
import classNames from 'classnames'
import { useUiContext } from '../_providers/UiProvider'

type MobileNavbarProps = {
  children: React.ReactNode
}
export default function MobileNavbar({ children }: MobileNavbarProps) {
  const { isMobileNavOpen } = useUiContext()
  return (
    <ul
      className={classNames('lg:hidden flex-col justify-center items-center gap-20', {
        hidden: !isMobileNavOpen,
      })}>
      {children}
    </ul>
  )
}
