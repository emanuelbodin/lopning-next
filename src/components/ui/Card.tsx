interface CardProps {
  children: React.ReactElement
  title: string
}

const Card = ({ children, title }: CardProps) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded shadow p-5">
      <div className="border-b border-gray-800 p-3">
        <h5 className="font-bold uppercase text-gray-600">{title}</h5>
      </div>
      {children}
    </div>
  )
}

export default Card
