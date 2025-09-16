"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { loadUserFromStorage } from "../Slices/AuthSlice/authSlice";

const ReduxProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    store.dispatch(loadUserFromStorage());
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviderWrapper;
