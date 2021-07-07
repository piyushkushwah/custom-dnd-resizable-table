import './App.css';
import DataTable from './components/data-table/data-table';
import MockupData from './assets/MOCK_DATA.json'

const column = MockupData.map(data=> Object.entries(data).map(([k,v])=> k))[0];

function App() {
  return (
    <div className="App">
        <DataTable tableColumn={column} tableRows={MockupData} />
    </div>
  );
}

export default App;
