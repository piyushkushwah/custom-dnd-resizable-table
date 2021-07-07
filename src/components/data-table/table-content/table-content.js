import React ,{useContext}from 'react';
import { TableContext } from '../../../contexts/tableContext';

export default function TableContent() {

    const {rows,cols,
            handleDragOver,
            handleOnDrop,
            handleDragEnter} = useContext(TableContext)

    return (
        <React.Fragment>
            {
                rows.map(row => (
                    <tr key={row.id}>
                        {
                            Object.entries(row).map(([key, value], index) => (
                                <td  
                                    onDragOver={handleDragOver}
                                    onDrop={handleOnDrop}
                                    onDragEnter={handleDragEnter} 
                                    id={cols[index]}
                                    key={value+index} >
                                    {row[cols[index]]}
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </React.Fragment>
    )
}
