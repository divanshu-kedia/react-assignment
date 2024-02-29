import { useState, createContext } from "react";
export const UsersContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  return (
    <UsersContext.Provider value={{ userData, setUserData }}>
      {children}
    </UsersContext.Provider>
  );
};
