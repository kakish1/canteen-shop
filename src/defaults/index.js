import React, { Dispatch } from 'react';
export const Context = React.createContext({
  role: null,
  basket: null,
  token: null,
  setToken: Dispatch,
});
