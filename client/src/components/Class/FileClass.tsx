//import { Component } from 'react';
import axios from 'axios';
import { ServerClass } from './ServerClass';

export class FileClass extends ServerClass {
  UrlAPI = import.meta.env.VITE_BACKEND_URL + 'file';

  constructor() {
    super();
  }

  CreateFile = async (location: string, name: string, extension: string) => {
    const query = `?location=${location}&name=${name}&extension=${extension}`;
    return await axios.post(this.UrlAPI + `/create${query}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });
  };

  UploadFile = async (location: string = '', formData: FormData) => {
    return await axios.post(
      `${this.UrlAPI}/upload?location=${location}`,
      formData
    );
  };

  RenameOrMoveFile = async (
    name: string,
    newName: string = '',
    cLocation: string,
    nLocation: string = ''
  ) => {
    const query = `${name}?new_name=${newName}&current_location=${cLocation}&new_location=${nLocation}`;
    return await axios.put(this.UrlAPI + `/edit/${query}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });
  };

  DeleteFile = async (query: string = '') => {
    return await axios.delete(this.UrlAPI + `/delete/${query}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });
  };
}
