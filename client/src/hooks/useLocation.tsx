import { useEffect, useState } from 'react';

const defaultLocation: string = import.meta.env.VITE_DEFAULT_LOCATION;

export function useLocationServer() {
  const [location, setLocation] = useState(defaultLocation);
  const [locationHistory, setLocationHistory] = useState<string[]>([]);
  useEffect(() => {
    console.log('History: ', locationHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const updateLocationHistory = (newLocation: string) => {
    const lastLocation = locationHistory[locationHistory.length - 1];
    if (lastLocation !== newLocation) {
      const updatedHistory = [...locationHistory, newLocation];
      setLocationHistory(updatedHistory);
      localStorage.setItem('locationHistory', JSON.stringify(updatedHistory));
    }
  };

  const handleLocationChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocation(e.target.value);
  };

  return {
    location,
    setLocation,
    locationHistory,
    setLocationHistory,
    updateLocationHistory,
    handleLocationChange,
    defaultLocation,
  };
}
