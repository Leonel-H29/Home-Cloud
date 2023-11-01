import './App.css';

//import FileMain from './components/Files/FileMain';
import FileListComponent from './components/Lists/List';
import NavBarComponent from './components/NavBar/NavBar';
//import DirectoryUpload from './components/Directories/DirectoryUpload';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <NavBarComponent />
      <br />
      <h1>File Home Server</h1>
      <br />
      <br />
      <div className="card">
        <FileListComponent />
      </div>
      {/* <div className="card">
        <FileMain />
      </div>
      <div className="card">
        <DirectoryUpload />
      </div> */}
    </>
  );
}

export default App;
