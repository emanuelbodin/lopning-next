interface TableHeadingProps {
  headings: string[];
}
const TableHeading = ({ headings }: TableHeadingProps) => {
  return (
    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
      <tr>
        {headings.map((heading, index) => (
          <th
            scope="col"
            className="sm:py-3 sm:px-6 text-center"
            key={heading + index}
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeading;
