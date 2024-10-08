import React from "react";
import { AuthProvider } from "./contexts/auth";
import RoutesApp from "./routes";
import GlobalStyle from "./styles/global";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </>
  );
};

export default App;
