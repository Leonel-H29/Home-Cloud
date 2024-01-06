import { useEffect, useState } from 'react';

export function useSelected() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Selected: ', selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  const handleSelectedClick = (name: string) => {
    const updatedSelected = selected.includes(name)
      ? selected.filter((item) => item !== name)
      : [...selected, name];
    setSelected(updatedSelected);
  };

  return {
    selected,
    setSelected,
    handleSelectedClick,
  };
}
