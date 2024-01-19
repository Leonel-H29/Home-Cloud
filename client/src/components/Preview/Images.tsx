import React, { useEffect, useState } from 'react';
import { FileClass } from '../Class/FileClass';
import { Button, Card, Container, Modal } from 'react-bootstrap';
import { Loading } from '../Loading/Loading';
import { ModalShowContentsProps } from '../Interfaces/IModal';

export function isImageFile(item: string) {
  // Regular expression with extensions for image files
  const regex = /\.(jpg|jpeg|png|gif|bmp|tiff)$/i;

  // Test the string against the regular expression
  const hasExtension = regex.test(item);

  // Return true if the string has the specified extension, false otherwise
  return hasExtension;
}

const Images: React.FC<ModalShowContentsProps> = ({
  selected,
  location,
  handleClose,
}) => {
  const [fileURL, setFileURL] = useState<string | null>(null);
  const var_env = import.meta.env.VITE_BACKEND_URL;
  const URL_Media = var_env.substring(0, var_env.lastIndexOf('/api'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selected || !location) {
          console.error('Missing data');
          return;
        }
        const IFile = new FileClass();
        // const directory = url.substring(0, url.lastIndexOf('/'));
        // const fileName = url.substring(url.lastIndexOf('/') + 1);

        const response = await IFile.GetFile(location, selected);

        setFileURL(response.data.file_url);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchData();
  }, [location, selected]);

  return (
    <div>
      <Modal.Body>
        {fileURL ? (
          <Container>
            <Card style={{ width: '100%' }}>
              <Card.Title>{selected}</Card.Title>
              <Card.Img
                variant="top"
                src={`${URL_Media}${fileURL}`}
                className="mx-auto d-block"
              />
            </Card>
          </Container>
        ) : (
          <Loading />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default Images;
