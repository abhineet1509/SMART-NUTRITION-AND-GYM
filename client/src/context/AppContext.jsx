import { createContext, useState } from "react";

export const AppContext = createContext(); 

const AppContextProvider = ({ children }) => { 
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
<<<<<<< HEAD
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}`
=======
  const backendUrl = '${import.meta.env.VITE_BACKEND_URL}'
>>>>>>> 785319e4 (Update backend URL to deployed endpoint and use env variable)
  return (
    <AppContext.Provider value={{ backendUrl, isLoggedIn, setIsLoggedin,userName, setUserName }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider; 
