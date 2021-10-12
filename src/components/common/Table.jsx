import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export default function Table({columns, sortColumn, data,}) {

    
    return (
        <table className="table">
        <TableHeader
          columns={columns}
          
          sortColumn={sortColumn}
        />
  
        <TableBody
          data={data}
          
          columns={columns}
        />
      </table>
    )
}
