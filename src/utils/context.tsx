import React, { createContext, useState } from 'react';

type ContextProps = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<ContextProps | undefined>(undefined);

const UserProvider = ({ children }) => {
  const [state, setState] = useState<string>('');

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
