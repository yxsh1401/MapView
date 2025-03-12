import React, { createContext, useState, useEffect } from "react";

// Create Context
const ProgressContext = createContext();

// Provider Component
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) return; // Stop at 100%

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 100)); // Increment every 2s
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [progress]);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom Hook for easy access
export const useProgress = () => React.useContext(ProgressContext);
