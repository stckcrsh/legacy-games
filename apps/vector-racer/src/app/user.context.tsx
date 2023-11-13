import { createContext, PropsWithChildren, useContext } from 'react';

export const userContext = createContext({});

export const UserProvider = ({user, children }: PropsWithChildren<{ user: any }>) => {
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export const useUser = () => {
  const user = useContext(userContext);
  if(!user) {
    throw new Error('User not found');
  }
  return user;
}
