import React, { useEffect } from "react";
import { Provider as StateProvider } from "react-redux";
import { getTokenMessaging, onMessageListener } from "./firebase";
import Undraw from "react-undraw";
import store from "./store";
import { AppRouter } from "./AppRouter";

export const App = () => {
  Undraw.defaultProps.primaryColor = "#0D1D47";

  useEffect(() => {
    getTokenMessaging()
      .then((currentToken) => {
        console.log(currentToken);
      })
      .catch((err) => {
        console.log("failed: ", err);
      });

    onMessageListener()
      .then((payload) => {
        console.log(payload);
      })
      .catch((err) => {
        console.log("failed: ", err);
      });
  }, []);

  return (
    <StateProvider store={store}>
      <AppRouter />
    </StateProvider>
  );
};
