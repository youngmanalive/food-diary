import { useState } from 'react';

export const useActiveIndex = () => {
  const [active, set] = useState(null);

  const setActive = (e, { index }) => {
    set(prev => (prev === index ? null : index));
  };

  return [active, setActive];
};
