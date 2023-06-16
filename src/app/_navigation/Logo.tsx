import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex gap-1 cursor-pointer">
      <a
        className="text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold"
        href="/">
        Run
      </a>
      <Image width={40} height={40} src="/running.svg" alt="running-logo" />
    </div>
  )
}
