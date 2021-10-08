import React from 'react'
import _ from 'lodash';

export default function TableBody(props) {
    const {data,columns,Id} = props;

    const renderCell = (item,column)=>{
     return column.content? column.content(item):_.get(item,column.path); 

    };
    const createKey=(item,column)=>{
        return item[Id] + (column.path || column.key);
    }


    return (
        <tbody>
         {data.map(item => (
          <tr key={item[Id]}>
            {columns.map(column=>
            <td key={createKey(item,column)}>{renderCell(item,column)}</td>
            )}
           
            
          </tr>
         )
        )}
            
        </tbody>
    );
}
TableBody.defaultProps = {
    Id:'_id',
}