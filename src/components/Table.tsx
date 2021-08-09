import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const TableContainer = styled.div`
  table {
    ${tw`w-full bg-white border-gray-200 border table-fixed border-collapse mt-8 mb-16`}
  }
  thead {
    ${tw`bg-gray-800 text-white`}
  }
  th {
    ${tw`uppercase font-semibold text-sm`}
  }
  th,
  td {
    ${tw`py-3 px-4`}
    &.left {
      ${tw`text-left`}
    }
    &.centered {
      ${tw`text-center`}
    }
    &.right {
      ${tw`text-right`}
    }
  }
`;

interface Props {
  data: {
    headings: string[];
    rows: string[][];
    alignment: ('left' | 'center' | 'right')[];
  };
}

const Table: React.FC<Props> = ({ data: { headings, rows, alignment } }) => {
  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={`heading-${index}`} className={alignment[index]}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`row-${index}`}>
              {row.map((cell, col) => (
                <td key={`cell-${index}-${col}`} className={alignment[col]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default Table;
