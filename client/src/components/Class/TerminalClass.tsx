import axios from 'axios';

export class TerminalClass {
  location: string;
  UrlAPI = import.meta.env.VITE_BACKEND_URL + 'shell';

  constructor() {
    this.location = import.meta.env.VITE_DEFAULT_LOCATION;
  }

  setLocation(loc: string) {
    this.location = loc;
  }

  GetLocation() {
    return this.location;
  }

  Command = async (command: string = '') => {
    const response = await axios.post(`${this.UrlAPI}?command=${command}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });

    return await response.data.output;
  };
}
