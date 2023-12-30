import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FileListComponent from './components/Lists/List';
import TerminalComponent from './components/Terminal/Terminal';
import NavBarComponent from './components/NavBar/NavBar';
import { Card, Nav } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <NavBarComponent />
      <br />
      <h1>File Home Server</h1>
      <br />
      <br />
      <Card>
        <Card.Header>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link
                href="/interface"
                className={
                  location.pathname === '/interface'
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                Interface
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/shell"
                className={
                  location.pathname === '/shell'
                    ? 'nav-link active'
                    : 'nav-link'
                }
              >
                Terminal
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/interface" element={<FileListComponent />} />
            <Route path="/shell" element={<TerminalComponent />} />
          </Routes>
        </Card.Body>
      </Card>
    </BrowserRouter>
  );
}

export default App;
