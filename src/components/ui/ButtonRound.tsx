interface ButtonRoundProps {
  children: React.ReactNode
  onClick: () => void
}

const ButtonRound = ({ children, onClick }: ButtonRoundProps) => {
  return (
    <button
      onClick={() => onClick()}
      className="inline-flex items-center justify-center p-0.5 text-lg font-medium rounded-full group bg-indigo-700 text-white">
      <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-full group-hover:bg-opacity-0">
        {children}
      </span>
    </button>
  )
}

export default ButtonRound
