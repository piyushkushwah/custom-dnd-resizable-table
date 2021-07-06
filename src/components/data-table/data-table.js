import React,{useRef,useEffect,useState,useCallback} from 'react';
import  './data-table.css';
import MockDataJson from '../../assets/MOCK_DATA.json';

let x = 0;
let w = 0;
const tableHeadRefs = [];
// const tableHeader = ['S.No.','Name','Email'];

export default function DataTable() {
    const tableRef = useRef();
    const [activeIndex,setActiveIndex] = useState(null);
    const [tableHeight,setTableHeight] = useState(null);
    const [cols, setCols] = useState(['id','first_name','last_name','email','gender','ip_address']);
    const [rows, setRows] = useState(MockDataJson);
    const [dragOver, setDragOver] = useState('');

  const handleDragStart = e => {
    const { id } = e.target;
    console.log({handleDragStart:{id}})
    const idx = cols.indexOf(id);
    console.log('handleDragStart',idx);
    e.dataTransfer.setData('colIdx', idx);
  };

  const handleDragOver = e => e.preventDefault();
  const handleDragEnter = e => {
    const { id } = e.target;
    setDragOver(id);
  };

  const handleOnDrop = e => {
    const { id } = e.target;
    if(id === "") return;

    const droppedColIdx = cols.indexOf(id);
    const draggedColIdx = parseInt(e.dataTransfer.getData('colIdx'));
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    // console.dir(document.getElementById('Email').width);
    setCols(tempCols);
    setDragOver('');
  };

    useEffect(() => {
        setTableHeight(tableRef.current.offsetHeight+'px')
    }, [])

    const handleMouseDown = (e,index) => {
        setActiveIndex(index);
        x = e.clientX;
        const styles = window.getComputedStyle(tableHeadRefs[index]);
        w = parseInt(styles.width, 10);
    }

    const mouseMoveHandler = useCallback((e) => {
        const dx = e.clientX - x;
        tableHeadRefs[activeIndex].width = `${w + dx}px`;
    },[activeIndex]);

    const removeListeners = useCallback(() => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", removeListeners);
      }, [mouseMoveHandler]);

    const mouseUpHandler = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    },[setActiveIndex,removeListeners]);

    useEffect(() => {
        if(activeIndex !== null){
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        }
        return () => {
            removeListeners();
        }
    }, [activeIndex, mouseMoveHandler, removeListeners,mouseUpHandler])

    return (
        <div className="data-table">
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {
                            cols.map((col,index) => {
                                return(
                                    <th
                                        id={col}
                                        key={col}
                                        ref={(tableHead)=> tableHeadRefs[index] = tableHead}>
                                        <div
                                            style={{padding:'15px'}}  
                                            id={col}
                                            key={col}  draggable
                                            onDragStart={handleDragStart}
                                            onDragOver={handleDragOver}
                                            onDrop={handleOnDrop}
                                            onDragEnter={handleDragEnter}>
                                          {col}
                                        </div>
                                        <div 
                                            style={{height:tableHeight}}
                                            className={`resizer ${activeIndex === index ? 'active':''}`} 
                                            onMouseDown={(event)=>handleMouseDown(event,index)} >
                                                <div className="resizer-inner"></div>
                                        </div>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {rows.map((row,index) => (
                    <tr key={row.id}>
                    {Object.entries(row).map(([k, v], idx) => (
                        <td key={v+idx} >
                        {row[cols[idx]]}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
