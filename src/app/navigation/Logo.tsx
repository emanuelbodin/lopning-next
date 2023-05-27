import Image from 'next/image'

interface LogoProps {
  onClick: () => void
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <div onClick={() => onClick()} className="flex gap-1 cursor-pointer">
      <a
        className="text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold"
        href="/">
        Run
      </a>
      <Image className="h-10" src="/running.svg" alt="running-logo" />
    </div>
  )
}
export default Logo
