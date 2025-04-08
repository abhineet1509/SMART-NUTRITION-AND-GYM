import { createContext, useState } from "react";

export const AppContext = createContext(); // ✅ Correct export

const AppContextProvider = ({ children }) => {  // ✅ Ensure this is named correctly
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const backendUrl = 'http://localhost:4000'
  return (
    <AppContext.Provider value={{ backendUrl, isLoggedIn, setIsLoggedin }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider; // ✅ Ensure correct export
