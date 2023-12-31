import axios from 'axios';

export class ServerClass {
  UrlAPI = import.meta.env.VITE_BACKEND_URL + 'list';

  constructor() {}

  ListFilesAndDirectories = async (location: string = '') => {
    // const response = await axios.get(`${this.UrlAPI}?location=${location}`, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   withCredentials: false,
    // });

    // return await response.data.contents;
    return await axios.get(`${this.UrlAPI}?location=${location}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });
  };
}
