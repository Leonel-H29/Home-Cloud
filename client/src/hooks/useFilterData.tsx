import { useState } from 'react';

export function useFilterData() {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return {
    filter,
    setFilter,
    handleFilterChange,
  };
}
