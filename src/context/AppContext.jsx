import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userId: null,
    name: null,
  });

  return (
    <AppContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
