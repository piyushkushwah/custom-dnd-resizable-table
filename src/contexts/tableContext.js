import React,{useState,useCallback,useEffect} from 'react';

export const TableContext = React.createContext();

let initialHorizontalCoordinate = 0;
let initialWidth = 0;

export default function TableContextProvider({children}) {

    const [activeIndex,setActiveIndex] = useState(null);
    const [cols, setCols] = useState([]);
    const [rows,setRows] = useState([]);
    const [dragOver, setDragOver] = useState('');
    const [draggedColumnIndex,setDraggedColumnIndex] = useState('');
    const [columnRefs,setColumnRefs]= useState([]);
    const [tableHeight,setTableHeight] = useState(null); 

    const handleDragStart = event => setDraggedColumnIndex(cols.indexOf(event.target.id));

    const handleDragOver = event => event.preventDefault();

    const handleDragEnter = event =>setDragOver(event.target.id);

    const handleOnDrop = event => {
        const { id } = event.target;
        if(id === "") return;
        const droppedColumnIndex = cols.indexOf(id);
        const temprary_columns = [...cols];

        temprary_columns[draggedColumnIndex] = cols[droppedColumnIndex];
        temprary_columns[droppedColumnIndex] = cols[draggedColumnIndex];
        setCols(temprary_columns);
        setDragOver('');
    };

    const handleMouseDown = (event,index) => {
        setActiveIndex(index);
        initialHorizontalCoordinate = event.clientX;
        initialWidth = columnRefs[index].offsetWidth;
    }

    const mouseMoveHandler = useCallback((event) => {
        const currentHorizontalCoordinate = event.clientX ;
        const totalMoseMove = currentHorizontalCoordinate - initialHorizontalCoordinate;
        columnRefs[activeIndex].width = `${initialWidth + totalMoseMove}px`;
    },[activeIndex, columnRefs]);

    const removeListeners = useCallback(() => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", removeListeners);
    },[mouseMoveHandler]);

    const mouseUpHandler = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    },[removeListeners]);

    useEffect(() => {
        if(activeIndex !== null){
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        }
        return () => {
            removeListeners();
        }
    }, [activeIndex, mouseMoveHandler, mouseUpHandler, removeListeners])


    return (
        <TableContext.Provider value={{  
                cols,rows,dragOver,tableHeight,
                setCols,setRows,handleMouseDown,
                handleDragStart,handleOnDrop,
                handleDragOver,handleDragEnter,
                setColumnRefs,setTableHeight}}>
            {children}
        </TableContext.Provider>
    )
}
