import {ReactNode, createContext, useEffect, useMemo, useReducer} from 'react';

import {AuthAction, AuthState} from './types';
import { storageService } from '../services';

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

  useEffect(() => {
    let loggedIn;

    try {
      loggedIn = storageService.getBoolean('IS_LOGIN');
      console.log('AM I LOGGED IN', loggedIn)
      if(loggedIn) {
        dispatch({type: 'LOGIN'})
      } else {
        // dispatch({type: 'LOGOUT'})
      }
    } catch (error) {
      // dispatch({type: 'LOGOUT'})
    }
  }, [])

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
