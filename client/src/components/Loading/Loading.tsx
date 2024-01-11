import { Spinner } from 'react-bootstrap';

export const Loading = () => (
  <div className="display-flex">
    <Spinner animation="border" role="status" />
    &nbsp;
    <span className="sr-only">Loading...</span>
    <br />
    <br />
    Wait a seconds
  </div>
);
