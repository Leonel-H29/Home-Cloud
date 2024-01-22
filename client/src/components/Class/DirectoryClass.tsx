import axios from 'axios';
import { ServerClass } from './ServerClass';

export class DirectoryClass extends ServerClass {
  UrlAPI = import.meta.env.VITE_BACKEND_URL + 'dirs';

  constructor() {
    super();
  }

  CreateDirectory = async (query: string = '') => {
    return await axios.post(this.UrlAPI + `/create/${query}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });
  };

  // UploadDirectory = async (location: string = '', formData: FormData) => {
  //   return await axios.post(
  //     `${this.UrlAPI}/upload?location=${location}`,
  //     formData
  //   );
  // };

  RenameOrMoveDirectory = async (
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

  DeleteDirectory = async (query: string = '') => {
    return await axios.delete(this.UrlAPI + `/delete/${query}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });
  };

  DownloadDirectory = async (dir_name: string, location: string) => {
    const queryString = `${dir_name}?location=${location}`;
    const response = await axios.get(this.UrlAPI + `/download/${queryString}`, {
      headers: {
        responseType: 'blob',
      },
    });
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', `${dir_name}.zip`);
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    return response;
  };
}
