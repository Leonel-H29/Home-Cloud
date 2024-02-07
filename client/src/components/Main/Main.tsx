import { Button, Card, Nav } from 'react-bootstrap';

export const WelcomeComponent = () => {
  return (
    <>
      <Card.Body>
        <h2>Introduction</h2>
        <p>
          The Web File Server project aims to provide a simple yet efficient
          solution for hosting and serving files over the web. It utilizes
          FastAPI for the backend and React with Vite for the frontend to create
          a modern and responsive user interface.
        </p>

        <Button href="/interface" size="lg" title="Get started">
          <i className="bi bi-arrow-right-square-fill"></i> Get started
        </Button>
      </Card.Body>
    </>
  );
};

export const MainHeaderComponent = () => {
  return (
    <>
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
              location.pathname === '/shell' ? 'nav-link active' : 'nav-link'
            }
          >
            Terminal
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default MainHeaderComponent;
