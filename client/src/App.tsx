import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileListComponent from './components/Lists/List';
import TerminalComponent from './components/Terminal/Terminal';
import NavBarComponent from './components/NavBar/NavBar';
import { Card } from 'react-bootstrap';
import MainHeaderComponent, { WelcomeComponent } from './components/Main/Main';
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <NavBarComponent />
      <br />
      <h1>File Home Server</h1>
      <br />
      <br />
      <Card>
        <Card.Header hidden={location.pathname === '/'}>
          <MainHeaderComponent />
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/" element={<WelcomeComponent />} />
            <Route path="/interface" element={<FileListComponent />} />
            <Route path="/shell" element={<TerminalComponent />} />
          </Routes>
        </Card.Body>
      </Card>
      <Toaster
        richColors
        position="top-right"
        duration={3000}
        closeButton
        visibleToasts={9}
        expand
      />
    </BrowserRouter>
  );
}

export default App;
