import React, { useRef, useEffect, useContext } from "react";
import "./data-table.css";
import TableContent from "./table-content/table-content";
import { TableContext } from "../../contexts/tableContext";
import { TableHeader } from "./table-header/table-header";

const columnRefs = [];

export default function DataTable({ tableColumn, tableRows }) {
  const tableRef = useRef();
  const { setCols, cols, rows, setRows, setColumnRefs, setTableHeight } =
    useContext(TableContext);

  useEffect(() => {
    setColumnRefs(columnRefs);
  }, [cols, setColumnRefs]);

  useEffect(() => {
    if (cols.length !== 0 && rows.length !== 0) {
      setTableHeight(tableRef.current.offsetHeight + "px");
    }
  }, [cols, rows, setTableHeight]);

  useEffect(() => {
    setRows(tableRows);
    setCols(tableColumn);
  }, [setCols, setRows, tableColumn, tableRows]);

  return (
    <div className="data-table">
      <table ref={tableRef}>

        <thead>
          <tr>
            {
                cols.map((col, index) => {
                    return (
                        <TableHeader
                        key={col}
                        ref={(coloumnref) => (columnRefs[index] = coloumnref)}
                        col={col}
                        index={index}
                        />
                    );
                })
            }
          </tr>
        </thead>

        <tbody>
          <TableContent />
        </tbody>
      </table>
    </div>
  );
}
