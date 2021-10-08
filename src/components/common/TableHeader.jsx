import React,{ useContext } from 'react';
import { MoviesContext } from '../Movies';

export default function TableHeader(props) {
  const { columns, sortColumn } = props;
  const {handleSort} = useContext(MoviesContext);
  const sortPath = (path) => {
    const sortColumnCopy = { ...sortColumn };
    if (sortColumnCopy.path === path) {
      sortColumnCopy.order = sortColumnCopy.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = 'asc';
    }
    handleSort(sortColumnCopy);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    else {
      return <i className="fa fa-sort-desc"></i>;
    }
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            style={{ cursor: 'pointer' }}
            onClick={() => sortPath(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}
