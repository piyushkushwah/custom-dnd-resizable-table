import React, { useContext } from "react";
import { TableContext } from "../../../contexts/tableContext";

export const TableHeader = React.forwardRef((props, ref) => {
  
 const {
    dragOver,
    handleDragStart,
    handleDragOver,
    handleOnDrop,
    handleDragEnter,
    tableHeight,
    handleMouseDown,
    activeIndex,
  } = useContext(TableContext);

  const columnName = (col) => {
    if(!col.includes('_')) return col.toUpperCase();
    return col.split('_')[0].toUpperCase()+' '+col.split('_')[1].toUpperCase();
  }

  return (
    <React.Fragment>
      <th
        id={props.col}
        ref={ref}
        style={{ background: dragOver === props.col ? "#ffc947" : "" }}>

        <div
          className="data-table-column"
          id={props.col}
          key={props.col}
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
          onDragEnter={handleDragEnter}>
          {columnName(props.col)}
        </div>

        <div
          style={{ height: tableHeight }}
          className={`resizer ${activeIndex === props.index ? "active" : ""}`}
          onMouseDown={(event) => handleMouseDown(event, props.index)}>
          <div className="resizer-inner"></div>
        </div>

      </th>
    </React.Fragment>
  );
});
