import React, {ReactNode, createContext, useState} from 'react';

type UserContextProps = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextProps>({
  user: '',
  setUser: () => {},
});

const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<string>('');

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};
