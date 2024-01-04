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
    try {
      const response = await axios.post(`${this.UrlAPI}?command=${command}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false,
      });

      const Location = response.data.location;

      if (Location) {
        this.setLocation(Location);
      }

      return response.data;
    } catch (error) {
      return { error: 'Error executing command' };
    }
  };
}
