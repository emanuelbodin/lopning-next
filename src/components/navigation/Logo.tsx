import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      className="flex items-center gap-1 cursor-pointer text-gray-100 text-base no-underline hover:no-underline font-bold text-center"
      href="/">
      Run
      <Image
        width={30}
        height={30}
        style={{ width: '30px', height: 'auto', objectFit: 'contain' }}
        src="/running.svg"
        alt="running-logo"
      />
    </Link>
  )
}
