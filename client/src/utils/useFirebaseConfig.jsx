import { useEffect, useState } from 'react';

const useFirebaseConfig = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/config')
      .then((response) => response.json())
      .then((data) => {
        setConfig(data);
      })
      .catch((error) => {
        console.error('Error fetching Firebase config:', error);
      });
  }, []);

  return config;
};

export default useFirebaseConfig;
