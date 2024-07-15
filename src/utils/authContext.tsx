import {ReactNode, createContext, useMemo, useReducer} from 'react';

import {AuthAction, AuthState} from './types';

type AuthContextProps = {
  state: AuthState;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as any);

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isLoggedIn: false,
  });

  const authContext = useMemo(
    () => ({
      login: async () => dispatch({type: 'LOGIN'}),
      logout: () => dispatch({type: 'LOGOUT'}),
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{...authContext, state}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
