import React, { useCallback } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import { ModalProps } from '../Interfaces/IModal';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

const FileUpload: React.FC<ModalProps> = ({
  show,
  handleClose,
  location,
  updateList,
}) => {
  const onDrop = useCallback((acceptedFiles: unknown) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const IFile = new FileClass();

  const handleFileUpload = async () => {
    if (!location && acceptedFiles.length == 0 && !show) {
      console.error('Missing data');
      return;
    }
    acceptedFiles.forEach(async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      toast.promise(IFile.UploadFile(location, formData), {
        success: `The file '${file.name}' uploaded successfully!`,
        error: `Error uploading '${file.name}' file`,
        finally: () => {
          handleClose(false);
          updateList(location);
        },
        loading: 'Saving changes ...',
      });
    });
  };

  return (
    <div>
      <Modal.Body>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Alert variant={'light'} className="text-center">
                <i
                  className="bi bi-file-earmark-arrow-up-fill"
                  style={{ fontSize: '4em' }}
                ></i>
                <br />
                Drop the files here ...
              </Alert>
            ) : (
              <Alert variant={'dark'} className="text-center">
                <i
                  className="bi bi-file-earmark-arrow-up-fill"
                  style={{ fontSize: '4em' }}
                ></i>
                <br />
                Drag 'n' drop some files here, or click to select files
              </Alert>
            )}
          </div>
        </Form.Group>

        <div
          hidden={acceptedFiles.length == 0}
          style={{ alignContent: 'center' }}
        >
          <p>Has been selected {acceptedFiles.length} files</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleClose(false)}
          title="Cancel"
        >
          Cancel
        </Button>
        <Button variant="success" onClick={handleFileUpload} title="Save">
          Save
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default FileUpload;
