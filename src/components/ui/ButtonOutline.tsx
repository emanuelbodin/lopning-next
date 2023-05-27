import classnames from 'classnames'

interface ButtonOutlineProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'default' | 'danger' | 'success'
}

const ButtonOutline = ({ type, children, onClick = () => undefined }: ButtonOutlineProps) => {
  return (
    <button
      onClick={() => onClick()}
      className={classnames(
        'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group text-white',
        {
          'bg-indigo-700': type === 'default' || !type,
          'bg-red-700': type === 'danger',
          'bg-green-700': type === 'success',
        }
      )}>
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {children}
      </span>
    </button>
  )
}

export default ButtonOutline
