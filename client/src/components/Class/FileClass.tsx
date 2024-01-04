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

  DownloadFile = async (file: string, location: string) => {
    const queryString = `${file}?location=${location}`;
    const response = await axios.get(this.UrlAPI + `/download/${queryString}`, {
      headers: {
        responseType: 'blob',
        withCredentials: false,
      },
      withCredentials: false,
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
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
