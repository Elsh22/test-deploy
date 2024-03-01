import { createContext, useContext, useState } from 'react';

const FormProgressContext = createContext();

export const useFormProgress = () => useContext(FormProgressContext);

export const FormProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <FormProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </FormProgressContext.Provider>
  );
};
