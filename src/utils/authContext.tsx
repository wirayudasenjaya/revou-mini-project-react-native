import {ReactNode, createContext, useEffect, useMemo, useReducer} from 'react';

import {AuthAction, AuthState} from './types';
import { storageService } from '../services';

type AuthContextProps = {
  state: AuthState;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as any);

const AuthReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        token: null
      };
    default:
      return state;
  }
};

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isLoggedIn: false,
    token: null,
  });

  useEffect(() => {
    let loggedIn;
    let accessToken;

    try {
      loggedIn = storageService.isLoggedIn();
      accessToken = storageService.getToken();
      if(loggedIn && accessToken) {
        dispatch({type: 'LOGIN', payload: accessToken})
      } else {
        // dispatch({type: 'LOGOUT'})
      }
    } catch (error) {
      // dispatch({type: 'LOGOUT'})
    }
  }, [])

  const authContext = useMemo(
    () => ({
      login: async (token: string) => dispatch({type: 'LOGIN', payload: token}),
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
