import { createContext, useState } from "react";

export const AppContext = createContext(); 

const AppContextProvider = ({ children }) => { 
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  const backendUrl = 'http://localhost:4000'
  return (
    <AppContext.Provider value={{ backendUrl, isLoggedIn, setIsLoggedin,userName, setUserName }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider; 
