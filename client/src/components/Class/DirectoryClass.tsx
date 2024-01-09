import axios from 'axios';
import { ServerClass } from './ServerClass';

export class DirectoryClass extends ServerClass {
  UrlAPI = import.meta.env.VITE_BACKEND_URL + 'dirs';

  constructor() {
    super();
  }

  CreateDirectory = async (query: string = '') => {
    return await axios.post(this.UrlAPI + `/create${query}`, {
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

  RenameOrMoveDirectory = async (query: string = '') => {
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
}
